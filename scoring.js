/* ============================================================
   Milo Adventure — Scoring Engine
   ============================================================ */

const SCORING = {
    domains: {
        adaptability: { maxScore: 9, scenes: ["scene2", "scene3", "scene4"] },
        emotional_regulation: { maxScore: 9, scenes: ["scene5b", "scene6", "scene7"] },
        emotion_recognition: { maxScore: 3, scenes: ["scene5a"] },
        flexible_thinking: { maxScore: 6, scenes: ["scene8", "scene9"] }
    }
};

/**
 * Get descriptive performance band from percentage
 */
function getPerformanceBand(percent) {
    if (percent <= 33) return "Emerging";
    if (percent <= 55) return "Developing";
    if (percent <= 78) return "Developing Well";
    return "Strong";
}

/**
 * Calculate domain score from responses
 */
function calculateDomainScore(domain, responses) {
    const domainConfig = SCORING.domains[domain];
    if (!domainConfig) return null;

    let rawScore = 0;
    const strategyTags = [];
    const sceneResponses = [];

    domainConfig.scenes.forEach(sceneId => {
        const response = responses[sceneId];
        if (response) {
            rawScore += response.score;
            strategyTags.push(response.strategyTag);
            sceneResponses.push({
                sceneId: sceneId,
                choiceId: response.choiceId,
                choiceText: response.choiceText,
                score: response.score,
                strategyTag: response.strategyTag
            });
        }
    });

    const percent = Math.round((rawScore / domainConfig.maxScore) * 100);
    const classification = getPerformanceBand(percent);

    return {
        rawScore,
        maxScore: domainConfig.maxScore,
        percent,
        classification,
        responses: sceneResponses,
        strategyTags
    };
}

/**
 * Calculate all domain scores
 */
function calculateAllScores(responses) {
    return {
        adaptability: calculateDomainScore("adaptability", responses),
        emotionalRegulation: calculateDomainScore("emotional_regulation", responses),
        emotionRecognition: calculateDomainScore("emotion_recognition", responses),
        flexibleThinking: calculateDomainScore("flexible_thinking", responses)
    };
}

/**
 * Get parent feedback for a domain
 */
function getParentFeedback(domain, classification, strategyTags) {
    const feedback = PARENT_FEEDBACK[domain];
    if (!feedback) return null;

    const bandFeedback = feedback[classification];
    const strategyNotes = getStrategyNotes(strategyTags);

    return {
        ...bandFeedback,
        strategyNotes
    };
}

/**
 * Get strategy-specific parent notes
 */
function getStrategyNotes(strategyTags) {
    const notes = [];
    const tagSet = new Set(strategyTags);

    if (tagSet.has("social_support") || tagSet.has("appropriate_support_seeking")) {
        notes.push("Your child showed a tendency to seek help or emotional support from trusted people. This can be an important coping resource. Continue encouraging appropriate help-seeking while gradually supporting independent problem solving where appropriate.");
    }

    if (tagSet.has("self_regulation")) {
        notes.push("Your child recognised self-calming strategies such as pausing and breathing. Practising these skills during calm moments can make them easier to use when emotions are stronger.");
    }

    if (tagSet.has("rumination")) {
        notes.push("Your child\u2019s choices sometimes involved continuing to think about an upsetting event. Parents can help by acknowledging the feeling and then gently shifting the conversation toward what the child can do next.");
    }

    if (tagSet.has("externalising_response") || tagSet.has("impulsive_reactive")) {
        notes.push("Some responses reflected acting immediately while upset. Practising a short pause before responding may help create more space for choosing another action.");
    }

    return notes;
}

/* ============================================================
   Parent Feedback Templates
   ============================================================ */

const PARENT_FEEDBACK = {
    adaptability: {
        "Strong": {
            observed: "Your child frequently chose responses that involved accepting change, exploring alternatives and continuing with an activity even when the original plan changed.",
            strengths: "Your child showed a willingness to explore new situations and adjust when familiar routines changed. Continue giving them age-appropriate opportunities to experience small changes and make choices about what to do next.",
            practice: "When plans change, invite your child to help create a new plan. You might ask, \u201COur first plan changed. What else could we do?\u201D Praise the effort involved in adapting, not just whether the new plan works."
        },
        "Developing Well": {
            observed: "Your child generally selected workable responses when Milo encountered changes, although they sometimes preferred familiar routines before adjusting.",
            strengths: "Your child can adjust to changes with some initial preference for the familiar. This shows healthy caution combined with eventual flexibility.",
            practice: "Use simple \u201CPlan A / Plan B\u201D conversations to help your child practise thinking ahead about alternatives."
        },
        "Developing": {
            observed: "Your child sometimes found it harder to move away from familiar routines or expectations in the scenarios.",
            strengths: "Your child values consistency and predictability, which shows awareness of their environment and what feels safe.",
            practice: "Provide advance notice where possible, acknowledge that changes can feel uncomfortable, and offer two manageable alternatives."
        },
        "Emerging": {
            observed: "In several scenarios, your child preferred keeping the original routine when unexpected changes occurred.",
            strengths: "Your child shows strong attachment to familiar patterns, which reflects awareness of their environment.",
            practice: "Practise small, safe changes to familiar activities and support your child in identifying one alternative at a time."
        }
    },

    emotional_regulation: {
        "Strong": {
            observed: "Your child generally selected constructive ways of responding to frustration and disappointment. Their choices showed evidence of calming, assertive communication, seeking support when appropriate and returning to an activity after disappointment.",
            strengths: "Your child demonstrated a range of healthy emotion-management strategies including self-calming, communicating feelings, and accepting outcomes gracefully.",
            practice: "Continue naming emotions in everyday life and praising your child when they use calm strategies. Ask \u201CWhat helped you feel better?\u201D to reinforce their awareness."
        },
        "Developing Well": {
            observed: "Your child selected several constructive strategies, although their responses varied depending on the situation.",
            strengths: "Your child can use helpful regulation strategies and is building a broader repertoire for different situations.",
            practice: "Help your child notice which strategies work best in different situations. You might say, \u201CLast time you took a breath and that helped. Would that work here too?\u201D"
        },
        "Developing": {
            observed: "Your child recognised some constructive ways of responding but sometimes selected withdrawal, rumination or immediate emotional reactions.",
            strengths: "Your child is developing awareness of different ways to respond to strong feelings.",
            practice: "Encourage a simple sequence: Stop \u2192 Name the Feeling \u2192 Breathe \u2192 Choose What to Do. Practise this during calm moments so it becomes familiar."
        },
        "Emerging": {
            observed: "In several scenarios, your child selected responses that reflected immediate reactions, withdrawal or difficulty moving beyond the upsetting event.",
            strengths: "Your child\u2019s responses show they experience emotions strongly, which reflects emotional awareness.",
            practice: "Start with naming feelings together: \u201CIt looks like you feel frustrated.\u201D Then offer one simple calming strategy at a time. Keep expectations realistic and praise any small steps toward self-regulation."
        }
    },

    flexible_thinking: {
        "Strong": {
            observed: "Your child frequently identified alternative ways to solve problems and was able to move to another strategy when the first idea did not work.",
            strengths: "Your child showed creative thinking and the ability to generate multiple solutions, including collaborative ones that consider others\u2019 needs.",
            practice: "During everyday problems, continue asking: \u201CCan you think of three different things we could try?\u201D Celebrate creative solutions even if they aren\u2019t the most obvious ones."
        },
        "Developing Well": {
            observed: "Your child generally recognised workable alternatives and showed some flexibility when circumstances changed.",
            strengths: "Your child can generate alternative solutions and shows growing flexibility in problem solving.",
            practice: "When a first idea doesn\u2019t work, ask: \u201CThat one didn\u2019t work out. What\u2019s another idea?\u201D Encourage considering how others might feel about the solution too."
        },
        "Developing": {
            observed: "Your child identified some solutions but sometimes remained focused on the original approach.",
            strengths: "Your child can think of alternatives when supported, and shows persistence with initial solutions.",
            practice: "Model flexible thinking by talking through your own problem-solving: \u201CHmm, that didn\u2019t work. Let me think of something else.\u201D Offer two alternatives to choose from."
        },
        "Emerging": {
            observed: "Your child often preferred the original solution even after the situation changed.",
            strengths: "Your child shows determination and focus, which are valuable qualities when combined with flexibility.",
            practice: "During everyday problems, ask: \u201CCan you think of three different things we could try?\u201D Start with simple either/or choices and gradually expand to open-ended brainstorming."
        }
    }
};

/**
 * Get DCCS parent interpretation
 */
function getDCCSInterpretation(dccsData) {
    if (!dccsData) return null;

    const postAccuracy = dccsData.postSwitchAccuracy;
    const perseverativeErrors = dccsData.perseverativeErrors;

    if (postAccuracy >= 80 && perseverativeErrors <= 2) {
        return {
            level: "Strong",
            summary: "Strong rule switching within this activity",
            detail: "Your child adjusted successfully when the sorting rule changed from colour to shape and made few previous-rule errors."
        };
    } else if (postAccuracy >= 50) {
        return {
            level: "Developing",
            summary: "Some adjustment required",
            detail: "Your child needed several attempts to adjust after the sorting rule changed. This type of rule-switching challenge requires the child to stop using the previous rule and apply a new one. This is a normal developmental process."
        };
    } else {
        return {
            level: "Emerging",
            summary: "Rule switching was challenging",
            detail: "Your child found it challenging to switch from the colour rule to the shape rule. Many children in this age range are still developing this skill. Practise simple rule-change games at home, such as sorting toys by colour then by size."
        };
    }
}
