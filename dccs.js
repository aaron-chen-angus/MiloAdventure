/* ============================================================
   Milo Adventure — DCCS (Dimensional Change Card Sort) Engine
   ============================================================ */

const DCCS = {
    colours: ["red", "yellow", "green", "blue"],
    shapes: ["circle", "triangle", "square", "star"],
    pieces: [],
    shelves: [[], [], [], []],
    phase: "colour", // "colour" or "shape"
    selectedPiece: null,
    metrics: {
        preSwitchStartTime: null,
        preSwitchCompletionTime: null,
        preSwitchTotalMoves: 0,
        preSwitchCorrectMoves: 0,
        preSwitchIncorrectMoves: 0,
        preSwitchAccuracy: 0,
        postSwitchStartTime: null,
        postSwitchCompletionTime: null,
        postSwitchTotalMoves: 0,
        postSwitchCorrectMoves: 0,
        postSwitchIncorrectMoves: 0,
        postSwitchAccuracy: 0,
        firstPostSwitchCorrect: null,
        perseverativeErrors: 0,
        accuracySwitchCost: 0,
        timeSwitchCost: 0
    },

    /**
     * Generate all 16 game pieces
     */
    generatePieces() {
        this.pieces = [];
        let id = 0;
        this.colours.forEach(colour => {
            this.shapes.forEach(shape => {
                this.pieces.push({
                    id: id++,
                    colour: colour,
                    shape: shape,
                    shelfIndex: null
                });
            });
        });
        this.shufflePieces();
    },

    /**
     * Shuffle pieces array
     */
    shufflePieces() {
        for (let i = this.pieces.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.pieces[i], this.pieces[j]] = [this.pieces[j], this.pieces[i]];
        }
    },

    /**
     * Reset shelves
     */
    resetShelves() {
        this.shelves = [[], [], [], []];
        this.pieces.forEach(p => p.shelfIndex = null);
    },

    /**
     * Start colour phase
     */
    startColourPhase() {
        this.phase = "colour";
        this.generatePieces();
        this.resetShelves();
        this.selectedPiece = null;
        this.metrics.preSwitchStartTime = Date.now();
    },

    /**
     * Start shape phase (after colour is complete)
     */
    startShapePhase() {
        this.phase = "shape";
        this.resetShelves();
        this.shufflePieces();
        this.selectedPiece = null;
        this.metrics.postSwitchStartTime = Date.now();
    },

    /**
     * Select a piece (tap step 1)
     */
    selectPiece(pieceId) {
        const piece = this.pieces.find(p => p.id === pieceId);
        if (piece) {
            this.selectedPiece = piece;
        }
        return piece;
    },

    /**
     * Place selected piece on a shelf (tap step 2)
     */
    placePieceOnShelf(shelfIndex) {
        if (!this.selectedPiece) return null;

        const piece = this.selectedPiece;

        // If piece was already on a shelf, remove it
        if (piece.shelfIndex !== null) {
            const oldShelf = this.shelves[piece.shelfIndex];
            const idx = oldShelf.indexOf(piece);
            if (idx > -1) oldShelf.splice(idx, 1);
        }

        // Place on new shelf
        this.shelves[shelfIndex].push(piece);
        piece.shelfIndex = shelfIndex;

        // Evaluate placement
        const evaluation = this.evaluatePlacement(piece, shelfIndex);

        // Update metrics
        if (this.phase === "colour") {
            this.metrics.preSwitchTotalMoves++;
            if (evaluation.correct) {
                this.metrics.preSwitchCorrectMoves++;
            } else {
                this.metrics.preSwitchIncorrectMoves++;
            }
        } else {
            this.metrics.postSwitchTotalMoves++;
            if (evaluation.correct) {
                this.metrics.postSwitchCorrectMoves++;
            } else {
                this.metrics.postSwitchIncorrectMoves++;
            }

            // Track first post-switch response
            if (this.metrics.firstPostSwitchCorrect === null) {
                this.metrics.firstPostSwitchCorrect = evaluation.correct;
            }

            // Track perseverative errors
            if (evaluation.perseverative) {
                this.metrics.perseverativeErrors++;
            }
        }

        this.selectedPiece = null;
        return evaluation;
    },

    /**
     * Evaluate a placement
     */
    evaluatePlacement(piece, shelfIndex) {
        const shelf = this.shelves[shelfIndex];
        const otherPieces = shelf.filter(p => p.id !== piece.id);

        let correct = true;
        let perseverative = false;

        if (otherPieces.length > 0) {
            if (this.phase === "colour") {
                // Check if all pieces on this shelf share the same colour
                const shelfColour = otherPieces[0].colour;
                correct = piece.colour === shelfColour;
            } else {
                // Shape phase — check if all pieces share the same shape
                const shelfShape = otherPieces[0].shape;
                correct = piece.shape === shelfShape;

                // Check for perseverative error (following old colour rule)
                if (!correct) {
                    const shelfColour = otherPieces[0].colour;
                    if (piece.colour === shelfColour) {
                        perseverative = true;
                    }
                }
            }
        }
        // First item on shelf is always "correct" provisionally

        return { correct, perseverative };
    },

    /**
     * Check if colour phase is correctly solved
     */
    isColourPhaseSolved() {
        return this.isPhaseComplete("colour");
    },

    /**
     * Check if shape phase is correctly solved
     */
    isShapePhaseSolved() {
        return this.isPhaseComplete("shape");
    },

    /**
     * Generic phase completion check
     */
    isPhaseComplete(ruleType) {
        // All pieces must be on shelves
        const allPlaced = this.pieces.every(p => p.shelfIndex !== null);
        if (!allPlaced) return false;

        // Each shelf must have exactly 4 items
        const correctCount = this.shelves.every(shelf => shelf.length === 4);
        if (!correctCount) return false;

        // Validate grouping
        for (const shelf of this.shelves) {
            if (shelf.length !== 4) return false;
            if (ruleType === "colour") {
                const colour = shelf[0].colour;
                if (!shelf.every(p => p.colour === colour)) return false;
            } else {
                const shape = shelf[0].shape;
                if (!shelf.every(p => p.shape === shape)) return false;
            }
        }

        return true;
    },

    /**
     * Complete colour phase and record metrics
     */
    completeColourPhase() {
        this.metrics.preSwitchCompletionTime = Date.now();
        const elapsed = this.metrics.preSwitchCompletionTime - this.metrics.preSwitchStartTime;
        const totalMoves = this.metrics.preSwitchTotalMoves;
        this.metrics.preSwitchAccuracy = totalMoves > 0
            ? Math.round((this.metrics.preSwitchCorrectMoves / totalMoves) * 100)
            : 0;
        return elapsed;
    },

    /**
     * Complete shape phase and record metrics
     */
    completeShapePhase() {
        this.metrics.postSwitchCompletionTime = Date.now();
        const elapsed = this.metrics.postSwitchCompletionTime - this.metrics.postSwitchStartTime;
        const totalMoves = this.metrics.postSwitchTotalMoves;
        this.metrics.postSwitchAccuracy = totalMoves > 0
            ? Math.round((this.metrics.postSwitchCorrectMoves / totalMoves) * 100)
            : 0;

        // Calculate switch costs
        this.metrics.accuracySwitchCost = this.metrics.preSwitchAccuracy - this.metrics.postSwitchAccuracy;
        const preTime = this.metrics.preSwitchCompletionTime - this.metrics.preSwitchStartTime;
        const postTime = elapsed;
        this.metrics.timeSwitchCost = postTime - preTime;

        return elapsed;
    },

    /**
     * Get formatted results for storage
     */
    getResults() {
        const preTime = this.metrics.preSwitchCompletionTime && this.metrics.preSwitchStartTime
            ? (this.metrics.preSwitchCompletionTime - this.metrics.preSwitchStartTime) / 1000
            : 0;
        const postTime = this.metrics.postSwitchCompletionTime && this.metrics.postSwitchStartTime
            ? (this.metrics.postSwitchCompletionTime - this.metrics.postSwitchStartTime) / 1000
            : 0;

        return {
            preSwitchAccuracy: this.metrics.preSwitchAccuracy,
            preSwitchTime: Math.round(preTime * 10) / 10,
            preSwitchMoves: this.metrics.preSwitchTotalMoves,
            preSwitchErrors: this.metrics.preSwitchIncorrectMoves,
            postSwitchAccuracy: this.metrics.postSwitchAccuracy,
            postSwitchTime: Math.round(postTime * 10) / 10,
            postSwitchMoves: this.metrics.postSwitchTotalMoves,
            postSwitchErrors: this.metrics.postSwitchIncorrectMoves,
            firstPostSwitchCorrect: this.metrics.firstPostSwitchCorrect,
            perseverativeErrors: this.metrics.perseverativeErrors,
            accuracySwitchCost: this.metrics.accuracySwitchCost,
            timeSwitchCost: Math.round((this.metrics.timeSwitchCost / 1000) * 10) / 10
        };
    },

    /**
     * Reset all DCCS state
     */
    reset() {
        this.pieces = [];
        this.shelves = [[], [], [], []];
        this.phase = "colour";
        this.selectedPiece = null;
        this.metrics = {
            preSwitchStartTime: null,
            preSwitchCompletionTime: null,
            preSwitchTotalMoves: 0,
            preSwitchCorrectMoves: 0,
            preSwitchIncorrectMoves: 0,
            preSwitchAccuracy: 0,
            postSwitchStartTime: null,
            postSwitchCompletionTime: null,
            postSwitchTotalMoves: 0,
            postSwitchCorrectMoves: 0,
            postSwitchIncorrectMoves: 0,
            postSwitchAccuracy: 0,
            firstPostSwitchCorrect: null,
            perseverativeErrors: 0,
            accuracySwitchCost: 0,
            timeSwitchCost: 0
        };
    }
};

/* ============================================================
   DCCS Shape SVG Generator
   ============================================================ */

const DCCS_SVG = {
    getShapeSVG(shape, colour, size = 60) {
        const colourMap = {
            red: "#FF4444",
            yellow: "#FFD83D",
            green: "#4CAF50",
            blue: "#4DB8FF"
        };
        const fill = colourMap[colour] || "#999";
        const stroke = "#333";

        switch (shape) {
            case "circle":
                return `<svg width="${size}" height="${size}" viewBox="0 0 60 60">
                    <defs><radialGradient id="grad-${colour}-circle"><stop offset="30%" stop-color="${fill}" stop-opacity="0.9"/><stop offset="100%" stop-color="${fill}"/></radialGradient></defs>
                    <circle cx="30" cy="30" r="26" fill="url(#grad-${colour}-circle)" stroke="${stroke}" stroke-width="2"/>
                    <circle cx="22" cy="22" r="6" fill="white" opacity="0.3"/>
                </svg>`;

            case "triangle":
                return `<svg width="${size}" height="${size}" viewBox="0 0 60 60">
                    <defs><linearGradient id="grad-${colour}-tri" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${fill}" stop-opacity="0.85"/><stop offset="100%" stop-color="${fill}"/></linearGradient></defs>
                    <polygon points="30,6 56,52 4,52" fill="url(#grad-${colour}-tri)" stroke="${stroke}" stroke-width="2" stroke-linejoin="round"/>
                    <polygon points="24,18 18,32 30,32" fill="white" opacity="0.2"/>
                </svg>`;

            case "square":
                return `<svg width="${size}" height="${size}" viewBox="0 0 60 60">
                    <defs><linearGradient id="grad-${colour}-sq" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${fill}" stop-opacity="0.85"/><stop offset="100%" stop-color="${fill}"/></linearGradient></defs>
                    <rect x="8" y="8" width="44" height="44" rx="6" fill="url(#grad-${colour}-sq)" stroke="${stroke}" stroke-width="2"/>
                    <rect x="14" y="14" width="12" height="12" rx="2" fill="white" opacity="0.2"/>
                </svg>`;

            case "star":
                return `<svg width="${size}" height="${size}" viewBox="0 0 60 60">
                    <defs><radialGradient id="grad-${colour}-star"><stop offset="20%" stop-color="${fill}" stop-opacity="0.9"/><stop offset="100%" stop-color="${fill}"/></radialGradient></defs>
                    <polygon points="30,4 37,22 56,22 41,34 47,52 30,42 13,52 19,34 4,22 23,22" fill="url(#grad-${colour}-star)" stroke="${stroke}" stroke-width="2" stroke-linejoin="round"/>
                    <polygon points="26,14 30,22 22,22" fill="white" opacity="0.2"/>
                </svg>`;

            default:
                return "";
        }
    }
};
