/* ============================================================
   Milo Adventure — Scenario Data
   ============================================================ */

const SCENARIOS = {
    scene1: {
        id: "scene1",
        image: "assets/Scene 1.png",
        imageRatio: "9:16",
        chapter: "Welcome",
        chapterNumber: 0,
        domain: null,
        story: [
            "It's a brand-new school day for Milo.",
            "Milo is excited to see Ms Cappy and his friends again.",
            "But today might bring a few surprises...",
            "Help Milo decide what to do as his adventure unfolds!"
        ],
        title: "Welcome to School!",
        question: null,
        choices: null,
        buttonText: "LET'S GO!"
    },

    scene2: {
        id: "scene2",
        image: "assets/Scene 2.png",
        imageRatio: "1:1",
        chapter: "Things Are Different Today!",
        chapterNumber: 1,
        domain: "adaptability",
        story: [
            "Milo arrives at his familiar classroom.",
            "Ms Cappy smiles and tells everyone:",
            "\u201COur class has moved upstairs to a brand-new classroom!\u201D"
        ],
        title: "Surprise, New Classroom!",
        question: "What should Milo do?",
        choices: [
            {
                id: "A",
                text: "\u201CI don\u2019t want to move. I want my old classroom.\u201D",
                score: 0,
                strategyTag: "resistance_to_change"
            },
            {
                id: "B",
                text: "\u201CI liked my old classroom, but I\u2019ll go and see the new one.\u201D",
                score: 2,
                strategyTag: "acceptance_of_change"
            },
            {
                id: "C",
                text: "\u201CA new classroom! Let\u2019s explore and see what\u2019s different.\u201D",
                score: 3,
                strategyTag: "positive_reframing"
            }
        ]
    },

    scene3: {
        id: "scene3",
        image: "assets/Scene 3.png",
        imageRatio: "1:1",
        chapter: "Things Are Different Today!",
        chapterNumber: 1,
        domain: "adaptability",
        story: [
            "Milo reaches the new classroom.",
            "He notices that the seat where he usually sits beside Pip is already occupied.",
            "Ms Cappy says:",
            "\u201CMilo, today you\u2019ll be sitting at this table.\u201D"
        ],
        title: "Milo\u2019s Usual Seat Is Gone",
        question: "What should Milo do?",
        choices: [
            {
                id: "A",
                text: "Refuse to sit anywhere else.",
                score: 0,
                strategyTag: "routine_rigidity"
            },
            {
                id: "B",
                text: "Sit at the new table even though it feels unfamiliar.",
                score: 2,
                strategyTag: "adaptive_acceptance"
            },
            {
                id: "C",
                text: "Sit there and introduce himself to the children at the table.",
                score: 3,
                strategyTag: "active_adaptation"
            }
        ]
    },

    scene4: {
        id: "scene4",
        image: "assets/Scene 4.png",
        imageRatio: "1:1",
        chapter: "Things Are Different Today!",
        chapterNumber: 1,
        domain: "adaptability",
        story: [
            "Ms Cappy looks outside.",
            "It has started raining.",
            "She says:",
            "\u201CWe were going to have art outside, but we\u2019ll do a different activity indoors instead.\u201D"
        ],
        title: "Lesson Plan Changes",
        question: "What should Milo do?",
        choices: [
            {
                id: "A",
                text: "Become upset because the planned activity cannot happen.",
                score: 0,
                strategyTag: "difficulty_with_change"
            },
            {
                id: "B",
                text: "Accept the change and join the new activity.",
                score: 2,
                strategyTag: "adaptive_acceptance"
            },
            {
                id: "C",
                text: "Suggest something fun the class could do indoors instead.",
                score: 3,
                strategyTag: "adaptive_reframing"
            }
        ]
    },

    scene5a: {
        id: "scene5a",
        image: "assets/Scene 5.png",
        imageRatio: "1:1",
        chapter: "Big Feelings!",
        chapterNumber: 2,
        domain: "emotion_recognition",
        story: [
            "During the activity, Kai takes Milo\u2019s favourite pencil without asking.",
            "Milo looks upset."
        ],
        title: "Kai Takes Milo\u2019s Pencil",
        question: "How do you think Milo feels?",
        isEmotionRecognition: true,
        choices: [
            {
                id: "A",
                text: "Angry",
                emoji: "\uD83D\uDE20",
                score: 3,
                strategyTag: "emotion_recognition_accurate"
            },
            {
                id: "B",
                text: "Sad",
                emoji: "\uD83D\uDE22",
                score: 2,
                strategyTag: "emotion_recognition_plausible"
            },
            {
                id: "C",
                text: "Worried",
                emoji: "\uD83D\uDE1F",
                score: 1,
                strategyTag: "emotion_recognition_less_likely"
            },
            {
                id: "D",
                text: "Happy",
                emoji: "\uD83D\uDE04",
                score: 0,
                strategyTag: "emotion_recognition_incongruent"
            }
        ]
    },

    scene5b: {
        id: "scene5b",
        image: "assets/Scene 5.png",
        imageRatio: "1:1",
        chapter: "Big Feelings!",
        chapterNumber: 2,
        domain: "emotional_regulation",
        story: [
            "Milo feels angry."
        ],
        title: "What Should Milo Do?",
        question: "What should Milo do?",
        choices: [
            {
                id: "A",
                text: "Grab the pencil back and shout at Kai.",
                score: 0,
                strategyTag: "impulsive_reactive"
            },
            {
                id: "B",
                text: "Take a breath and say, \u201CPlease give it back. Ask me next time.\u201D",
                score: 3,
                strategyTag: "calm_assertive"
            },
            {
                id: "C",
                text: "Say nothing and stay upset for the rest of the lesson.",
                score: 1,
                strategyTag: "passive_withdrawal"
            },
            {
                id: "D",
                text: "Ask Ms Cappy for help if Kai will not return it.",
                score: 3,
                strategyTag: "appropriate_support_seeking"
            }
        ]
    },

    scene6: {
        id: "scene6",
        image: "assets/Scene 6.png",
        imageRatio: "1:1",
        chapter: "Big Feelings!",
        chapterNumber: 2,
        domain: "emotional_regulation",
        story: [
            "Kai gives the pencil back.",
            "\u201CSorry, Milo.\u201D",
            "But Milo still feels angry."
        ],
        title: "Milo Is Still Upset",
        question: "What could Milo do to help himself feel calmer?",
        choices: [
            {
                id: "A",
                text: "Keep thinking about how unfair Kai was.",
                score: 1,
                strategyTag: "rumination"
            },
            {
                id: "B",
                text: "Take a few slow breaths and continue the activity.",
                score: 3,
                strategyTag: "self_regulation"
            },
            {
                id: "C",
                text: "Tell Pip how he feels and ask to sit together later.",
                score: 3,
                strategyTag: "social_support"
            },
            {
                id: "D",
                text: "Throw the pencil away because the whole day is ruined.",
                score: 0,
                strategyTag: "emotional_escalation"
            }
        ]
    },

    scene7: {
        id: "scene7",
        image: "assets/Scene 7.png",
        imageRatio: "1:1",
        chapter: "Big Feelings!",
        chapterNumber: 2,
        domain: "emotional_regulation",
        story: [
            "Later, Milo and Pip play a classroom game.",
            "Milo really wanted to win, but Pip wins this round."
        ],
        title: "Losing a Game",
        question: "What could Milo do?",
        choices: [
            {
                id: "A",
                text: "Say the game is stupid and quit.",
                score: 1,
                strategyTag: "avoidant_response"
            },
            {
                id: "B",
                text: "Take a moment, congratulate Pip and try again later.",
                score: 3,
                strategyTag: "adaptive_coping"
            },
            {
                id: "C",
                text: "Accuse Pip of cheating.",
                score: 0,
                strategyTag: "externalising_response"
            }
        ]
    },

    scene8: {
        id: "scene8",
        image: "assets/Scene 8.png",
        imageRatio: "1:1",
        chapter: "What Else Could I Try?",
        chapterNumber: 3,
        domain: "flexible_thinking",
        story: [
            "Milo reaches the canteen.",
            "Ari, the new student, is sitting in Milo\u2019s usual place."
        ],
        title: "Usual Lunch Seat Is Taken",
        question: "Milo normally sits here every day. What could he do?",
        choices: [
            {
                id: "A",
                text: "Tell Ari to move because it is Milo\u2019s seat.",
                score: 0,
                strategyTag: "rigid_solution"
            },
            {
                id: "B",
                text: "Sit somewhere else alone.",
                score: 1,
                strategyTag: "simple_alternative"
            },
            {
                id: "C",
                text: "Ask Ari whether they can sit together.",
                score: 3,
                strategyTag: "collaborative_problem_solving"
            },
            {
                id: "D",
                text: "Think of another way everyone could have lunch together.",
                score: 3,
                strategyTag: "solution_generation"
            }
        ]
    },

    scene9: {
        id: "scene9",
        image: "assets/Scene 9.png",
        imageRatio: "1:1",
        chapter: "What Else Could I Try?",
        chapterNumber: 3,
        domain: "flexible_thinking",
        story: [
            "Milo asks:",
            "\u201CCan I sit here too?\u201D",
            "Ari replies:",
            "\u201CSorry, my friend is coming and this seat is saved.\u201D"
        ],
        title: "First Solution Doesn\u2019t Work",
        question: "Milo\u2019s first idea didn\u2019t work. What else could he try?",
        choices: [
            {
                id: "A",
                text: "Keep asking until Ari gives up the seat.",
                score: 0,
                strategyTag: "perseveration"
            },
            {
                id: "B",
                text: "Find Pip and choose another table together.",
                score: 2,
                strategyTag: "alternative_solution"
            },
            {
                id: "C",
                text: "Ask whether another chair can fit nearby.",
                score: 3,
                strategyTag: "adaptive_modification"
            },
            {
                id: "D",
                text: "Invite Ari and Ari\u2019s friend to join Milo\u2019s group at another table.",
                score: 3,
                strategyTag: "integrative_solution"
            }
        ]
    },

    scene10: {
        id: "scene10",
        image: "assets/Scene 10.png",
        imageRatio: "9:16",
        chapter: "Bonus Challenge",
        chapterNumber: 4,
        domain: null,
        story: [
            "Before lunch, Ms Cappy has one more challenge for Milo.",
            "Can you help sort the colourful shapes?",
            "Watch carefully because the rule will change!"
        ],
        title: "Ms Cappy\u2019s Sorting Game",
        question: null,
        choices: null,
        buttonText: "START SORTING GAME"
    }
};

// Scene order for navigation
const SCENE_ORDER = [
    "scene1", "scene2", "scene3", "scene4",
    "scene5a", "scene5b", "scene6", "scene7",
    "scene8", "scene9", "scene10"
];

// Chapter definitions
const CHAPTERS = [
    { number: 0, title: "Welcome", scenes: ["scene1"] },
    { number: 1, title: "Things Are Different Today!", scenes: ["scene2", "scene3", "scene4"] },
    { number: 2, title: "Big Feelings!", scenes: ["scene5a", "scene5b", "scene6", "scene7"] },
    { number: 3, title: "What Else Could I Try?", scenes: ["scene8", "scene9"] },
    { number: 4, title: "Bonus Challenge", scenes: ["scene10"] }
];
