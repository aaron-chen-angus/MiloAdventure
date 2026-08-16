/* ============================================================
   Milo Adventure — Configuration
   ============================================================ */

const CONFIG = {
    // Google Sheets integration (optional)
    googleSheets: {
        enabled: true,
        webAppUrl: "https://script.google.com/macros/s/AKfycby9sy_2WEY4MGKkYuQNHhJOhv_HxNEu9P6t7Mfp_xW8R9HSgrOT4B4z7_YNuhjiWMqd2g/exec"
    },

    // Debug mode — reveals scores, tags and metrics during play
    debugMode: false,

    // Require participant details before starting
    requireParticipant: true,

    // Parent gate before results
    parentGate: true,

    // Audio
    audio: {
        enabled: false
    }
};
