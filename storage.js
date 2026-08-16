/* ============================================================
   Milo Adventure — Storage Engine
   ============================================================ */

const STORAGE = {
    SESSIONS_KEY: "milo_adventure_sessions",
    CURRENT_KEY: "milo_adventure_current",

    /**
     * Generate a unique session ID
     */
    generateSessionId() {
        return "MA-" + Date.now().toString(36) + "-" + Math.random().toString(36).substr(2, 6);
    },

    /**
     * Save current session progress to sessionStorage (for recovery)
     */
    saveProgress(state) {
        try {
            sessionStorage.setItem(this.CURRENT_KEY, JSON.stringify(state));
        } catch (e) {
            console.warn("Could not save session progress:", e);
        }
    },

    /**
     * Load current session progress from sessionStorage
     */
    loadProgress() {
        try {
            const data = sessionStorage.getItem(this.CURRENT_KEY);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.warn("Could not load session progress:", e);
            return null;
        }
    },

    /**
     * Clear current session progress
     */
    clearProgress() {
        try {
            sessionStorage.removeItem(this.CURRENT_KEY);
        } catch (e) {
            console.warn("Could not clear session progress:", e);
        }
    },

    /**
     * Save completed session to localStorage
     */
    saveSession(sessionData) {
        try {
            const sessions = this.getAllSessions();
            sessions.push(sessionData);
            localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(sessions));
            return true;
        } catch (e) {
            console.warn("Could not save session:", e);
            return false;
        }
    },

    /**
     * Get all saved sessions
     */
    getAllSessions() {
        try {
            const data = localStorage.getItem(this.SESSIONS_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.warn("Could not load sessions:", e);
            return [];
        }
    },

    /**
     * Get last session
     */
    getLastSession() {
        const sessions = this.getAllSessions();
        return sessions.length > 0 ? sessions[sessions.length - 1] : null;
    },

    /**
     * Build complete session data object
     */
    buildSessionData(participant, responses, dccsResults) {
        const scores = calculateAllScores(responses);

        return {
            sessionId: this.generateSessionId(),
            participant: {
                nickname: participant.nickname,
                age: participant.age,
                gender: participant.gender
            },
            completedAt: new Date().toISOString(),
            adaptability: scores.adaptability,
            emotionalRegulation: scores.emotionalRegulation,
            emotionRecognition: scores.emotionRecognition,
            flexibleThinking: scores.flexibleThinking,
            dccs: dccsResults
        };
    }
};
