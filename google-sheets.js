/* ============================================================
   Milo Adventure — Google Sheets Integration
   ============================================================ */

const GOOGLE_SHEETS = {
    /**
     * Submit results to Google Sheets via Apps Script Web App
     */
    async submitResults(sessionData) {
        if (!CONFIG.googleSheets.enabled || !CONFIG.googleSheets.webAppUrl) {
            console.log("Google Sheets integration is disabled or URL not configured.");
            return { success: false, reason: "disabled" };
        }

        const payload = this.formatForSheet(sessionData);

        try {
            // Use text/plain with no-cors to ensure the body is sent
            // Google Apps Script can parse JSON from e.postData.contents regardless
            const response = await fetch(CONFIG.googleSheets.webAppUrl, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain"
                },
                body: JSON.stringify(payload)
            });

            // no-cors mode won't give us the response body,
            // but if no error was thrown, assume success
            return { success: true };
        } catch (error) {
            console.error("Google Sheets submission error:", error);
            return { success: false, reason: error.message };
        }
    },

    /**
     * Format session data into flat row for Google Sheet
     */
    formatForSheet(data) {
        const adapt = data.adaptability || {};
        const emo = data.emotionalRegulation || {};
        const emoRec = data.emotionRecognition || {};
        const flex = data.flexibleThinking || {};
        const dccs = data.dccs || {};

        const getResponse = (domain, index) => {
            if (domain && domain.responses && domain.responses[index]) {
                return domain.responses[index];
            }
            return { choiceText: "", score: "", strategyTag: "" };
        };

        // Adaptability responses (scenes 2, 3, 4)
        const a1 = getResponse(adapt, 0);
        const a2 = getResponse(adapt, 1);
        const a3 = getResponse(adapt, 2);

        // Emotion recognition
        const er = emoRec.responses && emoRec.responses[0]
            ? emoRec.responses[0]
            : { choiceText: "", score: "", strategyTag: "" };

        // Emotional regulation responses (scenes 5b, 6, 7)
        const e1 = getResponse(emo, 0);
        const e2 = getResponse(emo, 1);
        const e3 = getResponse(emo, 2);

        // Flexible thinking responses (scenes 8, 9)
        const f1 = getResponse(flex, 0);
        const f2 = getResponse(flex, 1);

        return {
            timestamp: data.completedAt,
            sessionId: data.sessionId,
            nickname: data.participant.nickname,
            age: data.participant.age,
            gender: data.participant.gender,

            scene2Choice: a1.choiceText,
            scene2Score: a1.score,
            scene2Strategy: a1.strategyTag,

            scene3Choice: a2.choiceText,
            scene3Score: a2.score,
            scene3Strategy: a2.strategyTag,

            scene4Choice: a3.choiceText,
            scene4Score: a3.score,
            scene4Strategy: a3.strategyTag,

            adaptabilityRaw: adapt.rawScore,
            adaptabilityPercent: adapt.percent,
            adaptabilityBand: adapt.classification,

            emotionRecognitionChoice: er.choiceText,
            emotionRecognitionScore: er.score,

            scene5bChoice: e1.choiceText,
            scene5bScore: e1.score,
            scene5bStrategy: e1.strategyTag,

            scene6Choice: e2.choiceText,
            scene6Score: e2.score,
            scene6Strategy: e2.strategyTag,

            scene7Choice: e3.choiceText,
            scene7Score: e3.score,
            scene7Strategy: e3.strategyTag,

            emotionalRegulationRaw: emo.rawScore,
            emotionalRegulationPercent: emo.percent,
            emotionalRegulationBand: emo.classification,

            scene8Choice: f1.choiceText,
            scene8Score: f1.score,
            scene8Strategy: f1.strategyTag,

            scene9Choice: f2.choiceText,
            scene9Score: f2.score,
            scene9Strategy: f2.strategyTag,

            flexibleThinkingRaw: flex.rawScore,
            flexibleThinkingPercent: flex.percent,
            flexibleThinkingBand: flex.classification,

            dccsPreAccuracy: dccs.preSwitchAccuracy,
            dccsPreTime: dccs.preSwitchTime,
            dccsPreErrors: dccs.preSwitchErrors,

            dccsPostAccuracy: dccs.postSwitchAccuracy,
            dccsPostTime: dccs.postSwitchTime,
            dccsPostErrors: dccs.postSwitchErrors,

            dccsFirstSwitchCorrect: dccs.firstPostSwitchCorrect,
            dccsPerseverativeErrors: dccs.perseverativeErrors,
            dccsAccuracySwitchCost: dccs.accuracySwitchCost,
            dccsTimeSwitchCost: dccs.timeSwitchCost
        };
    }
};
