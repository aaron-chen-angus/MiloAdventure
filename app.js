/* ============================================================
   Milo Adventure — Main Application Controller
   ============================================================ */

const APP = {
    state: "LANDING",
    participant: { nickname: "", age: "", gender: "" },
    responses: {},
    dccsResults: null,
    sessionData: null,

    /**
     * Initialise the application
     */
    init() {
        // Check for session recovery
        const saved = STORAGE.loadProgress();
        if (saved && saved.state && saved.state !== "LANDING") {
            this.showRecoveryPrompt(saved);
        } else {
            this.renderLanding();
        }
    },

    /**
     * Show session recovery prompt
     */
    showRecoveryPrompt(saved) {
        const app = document.getElementById("app");
        app.innerHTML = `
            <div class="recovery-screen">
                <div class="recovery-card">
                    <h2>Continue Milo\u2019s Adventure?</h2>
                    <p>It looks like you were in the middle of an adventure.</p>
                    <div class="recovery-buttons">
                        <button class="btn btn-primary" onclick="APP.recoverSession()">CONTINUE</button>
                        <button class="btn btn-secondary" onclick="APP.startFresh()">START AGAIN</button>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Recover previous session
     */
    recoverSession() {
        const saved = STORAGE.loadProgress();
        if (saved) {
            this.state = saved.state;
            this.participant = saved.participant || { nickname: "", age: "", gender: "" };
            this.responses = saved.responses || {};
            this.navigateToState(this.state);
        } else {
            this.renderLanding();
        }
    },

    /**
     * Start fresh session
     */
    startFresh() {
        STORAGE.clearProgress();
        this.state = "LANDING";
        this.participant = { nickname: "", age: "", gender: "" };
        this.responses = {};
        this.dccsResults = null;
        this.sessionData = null;
        this.renderLanding();
    },

    /**
     * Save current progress
     */
    saveProgress() {
        STORAGE.saveProgress({
            state: this.state,
            participant: this.participant,
            responses: this.responses
        });
    },

    /**
     * Navigate to a state
     */
    navigateToState(state) {
        this.state = state;
        this.saveProgress();

        switch (state) {
            case "LANDING": this.renderLanding(); break;
            case "PARTICIPANT": this.renderParticipant(); break;
            case "SCENE_1": this.renderScene("scene1"); break;
            case "SCENE_2": this.renderScene("scene2"); break;
            case "SCENE_3": this.renderScene("scene3"); break;
            case "SCENE_4": this.renderScene("scene4"); break;
            case "SCENE_5A": this.renderScene("scene5a"); break;
            case "SCENE_5B": this.renderScene("scene5b"); break;
            case "SCENE_6": this.renderScene("scene6"); break;
            case "SCENE_7": this.renderScene("scene7"); break;
            case "SCENE_8": this.renderScene("scene8"); break;
            case "SCENE_9": this.renderScene("scene9"); break;
            case "SCENE_10": this.renderScene("scene10"); break;
            case "DCCS_COLOUR": this.renderDCCS("colour"); break;
            case "DCCS_TRANSITION": this.renderDCCSTransition(); break;
            case "DCCS_SHAPE": this.renderDCCS("shape"); break;
            case "COMPLETE": this.renderComplete(); break;
            case "PARENT_GATE": this.renderParentGate(); break;
            case "RESULTS": this.renderResults(); break;
            default: this.renderLanding();
        }
    },

    /* ===========================================================
       LANDING SCREEN — Full-bleed cover
       =========================================================== */
    renderLanding() {
        this.state = "LANDING";
        const app = document.getElementById("app");
        app.innerHTML = `
            <div class="landing-screen">
                <div class="landing-hero">
                    <img src="assets/Cover.png" alt="Milo\u2019s Big School Adventure" class="cover-image" />
                </div>
                <div class="landing-content">
                    <button class="btn btn-start" onclick="APP.startAdventure()">START ADVENTURE</button>
                </div>
            </div>
        `;
    },

    /**
     * Start adventure — go to participant details or scene 1
     */
    startAdventure() {
        if (CONFIG.requireParticipant) {
            this.navigateToState("PARTICIPANT");
        } else {
            this.navigateToState("SCENE_1");
        }
    },

    /* ===========================================================
       PARTICIPANT DETAILS
       =========================================================== */
    renderParticipant() {
        this.state = "PARTICIPANT";
        const app = document.getElementById("app");
        app.innerHTML = `
            <div class="participant-screen">
                <div class="participant-card">
                    <h2>Who\u2019s Playing?</h2>
                    <div class="form-group">
                        <label for="nickname">Name or Nickname</label>
                        <input type="text" id="nickname" placeholder="e.g. Milo" maxlength="30" autocomplete="off" />
                    </div>
                    <div class="form-group">
                        <label>Age</label>
                        <div class="age-buttons">
                            <button class="age-btn" data-age="6">6</button>
                            <button class="age-btn" data-age="7">7</button>
                            <button class="age-btn" data-age="8">8</button>
                            <button class="age-btn" data-age="9">9</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Gender <span class="optional">(optional)</span></label>
                        <div class="gender-buttons">
                            <button class="gender-btn" data-gender="Boy">Boy</button>
                            <button class="gender-btn" data-gender="Girl">Girl</button>
                            <button class="gender-btn" data-gender="Others">Others</button>
                            <button class="gender-btn" data-gender="Prefer not to say">Prefer not to say</button>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-go" id="goBtn" disabled onclick="APP.submitParticipant()">LET\u2019S GO!</button>
                </div>
            </div>
        `;

        // Age button handlers
        document.querySelectorAll(".age-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                document.querySelectorAll(".age-btn").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
                this.participant.age = btn.dataset.age;
                this.checkParticipantReady();
            });
        });

        // Gender button handlers
        document.querySelectorAll(".gender-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                document.querySelectorAll(".gender-btn").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
                this.participant.gender = btn.dataset.gender;
            });
        });

        // Nickname input
        document.getElementById("nickname").addEventListener("input", (e) => {
            this.participant.nickname = e.target.value.trim();
            this.checkParticipantReady();
        });
    },

    checkParticipantReady() {
        const ready = this.participant.nickname.length > 0 && this.participant.age;
        document.getElementById("goBtn").disabled = !ready;
    },

    submitParticipant() {
        if (this.participant.nickname && this.participant.age) {
            this.navigateToState("SCENE_1");
        }
    },

    /* ===========================================================
       SCENE RENDERER
       =========================================================== */
    renderScene(sceneId) {
        const scenario = SCENARIOS[sceneId];
        if (!scenario) return;

        const app = document.getElementById("app");
        const isPortrait = scenario.imageRatio === "9:16";
        const chapterInfo = this.getChapterInfo(sceneId);

        let html = `
            <div class="scene-screen ${isPortrait ? 'scene-portrait' : 'scene-square'}">
                ${this.renderProgressHeader(sceneId)}
                
                <div class="scene-image-container ${isPortrait ? 'portrait' : 'square'}">
                    <img src="${scenario.image}" alt="${scenario.title}" class="scene-image" />
                </div>

                <div class="scene-content">
                    <h2 class="scene-title">${scenario.title}</h2>
                    <div class="scene-story">
                        ${scenario.story.map(line => `<p>${line}</p>`).join("")}
                    </div>
        `;

        if (scenario.choices) {
            html += `
                    <p class="scene-question">${scenario.question}</p>
                    <div class="choices-container ${scenario.isEmotionRecognition ? 'emotion-choices' : ''}">
                        ${scenario.choices.map(choice => `
                            <button class="choice-btn" data-choice-id="${choice.id}" onclick="APP.selectChoice('${sceneId}', '${choice.id}')">
                                ${scenario.isEmotionRecognition ? `<span class="emotion-emoji">${choice.emoji}</span>` : ""}
                                <span class="choice-text">${choice.text}</span>
                            </button>
                        `).join("")}
                    </div>
                    <button class="btn btn-next hidden" id="nextBtn" onclick="APP.nextScene('${sceneId}')">NEXT \u2192</button>
            `;
        } else if (scenario.buttonText) {
            html += `
                    <button class="btn btn-accent btn-action" onclick="APP.nextScene('${sceneId}')">${scenario.buttonText}</button>
            `;
        }

        html += `
                </div>
            </div>
        `;

        // Debug panel
        if (CONFIG.debugMode) {
            html += this.renderDebugPanel();
        }

        app.innerHTML = html;

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'instant' });
    },

    /**
     * Render progress header
     */
    renderProgressHeader(sceneId) {
        const scenario = SCENARIOS[sceneId];
        const totalScenes = SCENE_ORDER.length;
        const currentIndex = SCENE_ORDER.indexOf(sceneId);
        const progress = currentIndex >= 0 ? currentIndex : 0;

        return `
            <div class="progress-header">
                <span class="chapter-label">${scenario.chapter || "Milo\u2019s Adventure"}</span>
                <div class="progress-dots">
                    ${SCENE_ORDER.map((s, i) => `<span class="dot ${i <= progress ? 'filled' : ''}"></span>`).join("")}
                </div>
            </div>
        `;
    },

    /**
     * Get chapter info for a scene
     */
    getChapterInfo(sceneId) {
        const chapter = CHAPTERS.find(ch => ch.scenes.includes(sceneId));
        return chapter || { number: 0, title: "" };
    },

    /**
     * Handle choice selection
     */
    selectChoice(sceneId, choiceId) {
        const scenario = SCENARIOS[sceneId];
        const choice = scenario.choices.find(c => c.id === choiceId);
        if (!choice) return;

        // Store response
        this.responses[sceneId] = {
            choiceId: choice.id,
            choiceText: choice.text,
            score: choice.score,
            strategyTag: choice.strategyTag,
            domain: scenario.domain
        };

        // Visual feedback
        document.querySelectorAll(".choice-btn").forEach(btn => {
            btn.classList.remove("selected");
            btn.disabled = true;
        });
        const selectedBtn = document.querySelector(`[data-choice-id="${choiceId}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add("selected");
            selectedBtn.innerHTML += '<span class="choice-tick">\u2713</span>';
        }

        // Show next button
        const nextBtn = document.getElementById("nextBtn");
        if (nextBtn) {
            nextBtn.classList.remove("hidden");
            setTimeout(() => nextBtn.classList.add("visible"), 50);
        }

        this.saveProgress();
    },

    /**
     * Navigate to next scene
     */
    nextScene(currentSceneId) {
        const stateMap = {
            "scene1": "SCENE_2",
            "scene2": "SCENE_3",
            "scene3": "SCENE_4",
            "scene4": "SCENE_5A",
            "scene5a": "SCENE_5B",
            "scene5b": "SCENE_6",
            "scene6": "SCENE_7",
            "scene7": "SCENE_8",
            "scene8": "SCENE_9",
            "scene9": "SCENE_10",
            "scene10": "DCCS_COLOUR"
        };

        const nextState = stateMap[currentSceneId];
        if (nextState) {
            this.navigateToState(nextState);
        }
    },

    /* ===========================================================
       DCCS GAME
       =========================================================== */
    renderDCCS(phase) {
        if (phase === "colour") {
            DCCS.reset();
            DCCS.startColourPhase();
        }

        const app = document.getElementById("app");
        const instruction = phase === "colour"
            ? "Put shapes of the same <strong>colour</strong> together."
            : "Put shapes that are the same <strong>shape</strong> together.";
        const roundLabel = phase === "colour" ? "ROUND 1 \u2014 SORT BY COLOUR" : "ROUND 2 \u2014 SORT BY SHAPE";

        app.innerHTML = `
            <div class="dccs-screen">
                <div class="dccs-header">
                    <h2>${roundLabel}</h2>
                    <p class="dccs-instruction">${instruction}</p>
                </div>

                <div class="dccs-shelves" id="dccsShelves">
                    ${[0,1,2,3].map(i => `
                        <div class="dccs-shelf" data-shelf="${i}" onclick="APP.placeOnShelf(${i})">
                            <span class="shelf-label">Shelf ${i + 1}</span>
                            <div class="shelf-items" id="shelf-${i}"></div>
                        </div>
                    `).join("")}
                </div>

                <div class="dccs-pieces" id="dccsPieces">
                    ${DCCS.pieces.filter(p => p.shelfIndex === null).map(p => `
                        <div class="dccs-piece ${DCCS.selectedPiece && DCCS.selectedPiece.id === p.id ? 'selected' : ''}" 
                             data-piece-id="${p.id}" 
                             onclick="APP.selectPiece(${p.id})"
                             aria-label="${p.colour} ${p.shape}">
                            ${DCCS_SVG.getShapeSVG(p.shape, p.colour, 50)}
                        </div>
                    `).join("")}
                </div>

                ${CONFIG.debugMode ? `
                    <div class="debug-dccs">
                        <p>Phase: ${DCCS.phase} | Moves: ${phase === 'colour' ? DCCS.metrics.preSwitchTotalMoves : DCCS.metrics.postSwitchTotalMoves}</p>
                    </div>
                ` : ""}
            </div>
        `;
    },

    /**
     * Select a DCCS piece
     */
    selectPiece(pieceId) {
        DCCS.selectPiece(pieceId);
        this.refreshDCCSUI();
    },

    /**
     * Place selected piece on shelf
     */
    placeOnShelf(shelfIndex) {
        if (!DCCS.selectedPiece) return;

        const result = DCCS.placePieceOnShelf(shelfIndex);
        this.refreshDCCSUI();

        // Check completion
        if (DCCS.phase === "colour" && DCCS.isColourPhaseSolved()) {
            DCCS.completeColourPhase();
            setTimeout(() => this.navigateToState("DCCS_TRANSITION"), 800);
        } else if (DCCS.phase === "shape" && DCCS.isShapePhaseSolved()) {
            DCCS.completeShapePhase();
            this.dccsResults = DCCS.getResults();
            setTimeout(() => this.navigateToState("COMPLETE"), 800);
        }
    },

    /**
     * Refresh DCCS UI without full re-render
     */
    refreshDCCSUI() {
        // Update pieces area
        const piecesContainer = document.getElementById("dccsPieces");
        if (piecesContainer) {
            piecesContainer.innerHTML = DCCS.pieces.filter(p => p.shelfIndex === null).map(p => `
                <div class="dccs-piece ${DCCS.selectedPiece && DCCS.selectedPiece.id === p.id ? 'selected' : ''}" 
                     data-piece-id="${p.id}" 
                     onclick="APP.selectPiece(${p.id})"
                     aria-label="${p.colour} ${p.shape}">
                    ${DCCS_SVG.getShapeSVG(p.shape, p.colour, 50)}
                </div>
            `).join("");
        }

        // Update shelves
        for (let i = 0; i < 4; i++) {
            const shelfEl = document.getElementById(`shelf-${i}`);
            if (shelfEl) {
                shelfEl.innerHTML = DCCS.shelves[i].map(p => `
                    <div class="dccs-piece in-shelf" 
                         data-piece-id="${p.id}" 
                         onclick="APP.movePieceFromShelf(${p.id})"
                         aria-label="${p.colour} ${p.shape}">
                        ${DCCS_SVG.getShapeSVG(p.shape, p.colour, 40)}
                    </div>
                `).join("");
            }
        }
    },

    /**
     * Move piece back from shelf to unsorted area
     */
    movePieceFromShelf(pieceId) {
        const piece = DCCS.pieces.find(p => p.id === pieceId);
        if (!piece || piece.shelfIndex === null) return;

        const shelf = DCCS.shelves[piece.shelfIndex];
        const idx = shelf.indexOf(piece);
        if (idx > -1) shelf.splice(idx, 1);
        piece.shelfIndex = null;

        this.refreshDCCSUI();
    },

    /* ===========================================================
       DCCS TRANSITION
       =========================================================== */
    renderDCCSTransition() {
        const app = document.getElementById("app");
        app.innerHTML = `
            <div class="dccs-transition-screen">
                <div class="transition-card celebrate">
                    <h2>\uD83C\uDF89 GREAT JOB!</h2>
                    <p>You sorted all the colours!</p>
                </div>
            </div>
        `;

        setTimeout(() => {
            app.innerHTML = `
                <div class="dccs-transition-screen">
                    <div class="transition-card new-rule">
                        <h2>\u2728 NEW RULE!</h2>
                        <p class="big-instruction">NOW SORT BY SHAPE</p>
                        <p>Put shapes that are the same together.</p>
                        <button class="btn btn-primary" onclick="APP.startShapePhase()">READY!</button>
                    </div>
                </div>
            `;
        }, 2000);
    },

    /**
     * Start shape phase
     */
    startShapePhase() {
        DCCS.startShapePhase();
        this.navigateToState("DCCS_SHAPE");
    },

    /* ===========================================================
       ADVENTURE COMPLETE
       =========================================================== */
    renderComplete() {
        const app = document.getElementById("app");
        app.innerHTML = `
            <div class="complete-screen">
                <div class="complete-content">
                    <div class="confetti-container" id="confetti"></div>
                    <h1>\uD83C\uDF1F ADVENTURE COMPLETE! \uD83C\uDF1F</h1>
                    <p class="complete-message">You helped Milo through a day full of surprises!</p>
                    <p class="complete-message">Great job thinking, choosing and trying new ideas!</p>
                    <div class="complete-badge">\uD83C\uDFC5</div>
                    <button class="btn btn-primary" onclick="APP.goToResults()">VIEW ADVENTURE REPORT</button>
                </div>
            </div>
        `;

        this.triggerConfetti();
    },

    /**
     * Simple confetti effect
     */
    triggerConfetti() {
        const container = document.getElementById("confetti");
        if (!container) return;

        const colours = ["#FFD83D", "#4DB8FF", "#FF7657", "#75D98B", "#A56DE2"];
        for (let i = 0; i < 60; i++) {
            const confetto = document.createElement("div");
            confetto.className = "confetto";
            confetto.style.left = Math.random() * 100 + "%";
            confetto.style.backgroundColor = colours[Math.floor(Math.random() * colours.length)];
            confetto.style.animationDelay = Math.random() * 2 + "s";
            confetto.style.animationDuration = (2 + Math.random() * 2) + "s";
            container.appendChild(confetto);
        }
    },

    /**
     * Go to results (with optional parent gate)
     */
    goToResults() {
        if (CONFIG.parentGate) {
            this.navigateToState("PARENT_GATE");
        } else {
            this.navigateToState("RESULTS");
        }
    },

    /* ===========================================================
       PARENT GATE
       =========================================================== */
    renderParentGate() {
        const a = Math.floor(Math.random() * 5) + 4;
        const b = Math.floor(Math.random() * 5) + 3;
        this._gateAnswer = a + b;

        const app = document.getElementById("app");
        app.innerHTML = `
            <div class="gate-screen">
                <div class="gate-card">
                    <h2>For Parents / Educators</h2>
                    <p>The next page contains the detailed Adventure Skills Report.</p>
                    <div class="gate-question">
                        <label>What is ${a} + ${b}?</label>
                        <input type="number" id="gateInput" min="0" max="20" autocomplete="off" />
                    </div>
                    <button class="btn btn-primary" onclick="APP.checkGate()">CONTINUE TO REPORT</button>
                    <p class="gate-error hidden" id="gateError">That\u2019s not quite right. Try again!</p>
                </div>
            </div>
        `;
    },

    checkGate() {
        const input = document.getElementById("gateInput");
        const val = parseInt(input.value, 10);
        if (val === this._gateAnswer) {
            this.navigateToState("RESULTS");
        } else {
            document.getElementById("gateError").classList.remove("hidden");
            input.value = "";
            input.focus();
        }
    },

    /* ===========================================================
       RESULTS
       =========================================================== */
    renderResults() {
        // Build session data
        this.sessionData = STORAGE.buildSessionData(
            this.participant,
            this.responses,
            this.dccsResults
        );

        const app = document.getElementById("app");
        RESULTS_RENDERER.render(this.sessionData, app);
    },

    /**
     * Save results to localStorage and optionally Google Sheets
     */
    async saveResults() {
        if (!this.sessionData) return;

        const saved = STORAGE.saveSession(this.sessionData);
        if (saved) {
            alert("Results saved successfully!");
        }

        // Google Sheets
        if (CONFIG.googleSheets.enabled) {
            const sheetsResult = await GOOGLE_SHEETS.submitResults(this.sessionData);
            if (sheetsResult.success) {
                console.log("Results submitted to Google Sheets.");
            }
        }

        STORAGE.clearProgress();
    },

    /**
     * Print report
     */
    printReport() {
        window.print();
    },

    /**
     * Start new adventure
     */
    newAdventure() {
        STORAGE.clearProgress();
        this.state = "LANDING";
        this.participant = { nickname: "", age: "", gender: "" };
        this.responses = {};
        this.dccsResults = null;
        this.sessionData = null;
        this.renderLanding();
    },

    /* ===========================================================
       DEBUG PANEL
       =========================================================== */
    renderDebugPanel() {
        const scores = calculateAllScores(this.responses);
        return `
            <div class="debug-panel">
                <h4>Debug Mode</h4>
                <pre>${JSON.stringify(scores, null, 2)}</pre>
                <pre>Responses: ${JSON.stringify(this.responses, null, 2)}</pre>
            </div>
        `;
    }
};

/* ===========================================================
   INITIALISE ON DOM READY
   =========================================================== */
document.addEventListener("DOMContentLoaded", () => {
    APP.init();
});
