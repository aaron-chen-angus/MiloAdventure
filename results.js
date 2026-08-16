/* ============================================================
   Milo Adventure — Results Renderer
   ============================================================ */

const RESULTS_RENDERER = {
    /**
     * Render the complete parent results page
     */
    render(sessionData, container) {
        const html = `
            <div class="results-page" id="resultsPage">
                <div class="results-header">
                    <h1>Milo\u2019s Adventure Skills Report</h1>
                    <div class="results-meta">
                        <p><strong>Child:</strong> ${this.escapeHtml(sessionData.participant.nickname)}</p>
                        <p><strong>Age:</strong> ${sessionData.participant.age}</p>
                        <p><strong>Date:</strong> ${new Date(sessionData.completedAt).toLocaleDateString()}</p>
                        <p class="session-id"><strong>Session:</strong> ${sessionData.sessionId}</p>
                    </div>
                </div>

                <div class="results-chart-container">
                    <canvas id="resultsChart" width="400" height="200"></canvas>
                </div>

                ${this.renderDomainCard("Adaptability", sessionData.adaptability, "adaptability", "#4DB8FF")}
                ${this.renderDomainCard("Emotional Regulation", sessionData.emotionalRegulation, "emotional_regulation", "#FF7657")}
                ${this.renderDomainCard("Flexible Thinking & Problem Solving", sessionData.flexibleThinking, "flexible_thinking", "#A56DE2")}

                <div class="results-supplementary">
                    <h2>Supplementary Results</h2>
                    ${this.renderEmotionRecognition(sessionData.emotionRecognition)}
                    ${this.renderDCCS(sessionData.dccs)}
                </div>

                <div class="results-transparency">
                    <details>
                        <summary>How Was This Profile Generated?</summary>
                        <div class="transparency-content">
                            ${this.renderTransparency(sessionData)}
                        </div>
                    </details>
                </div>

                <div class="results-disclaimer">
                    <h3>About This Report</h3>
                    <p>This game explores how a child responds to hypothetical social situations and a short rule-switching activity. Children\u2019s choices may vary depending on mood, familiarity, language, context and understanding of the scenarios.</p>
                    <p>The results are intended to support reflection and conversation with parents or educators and should not be interpreted as a diagnosis of a psychological, behavioural or developmental condition.</p>
                    <p>If parents or educators have persistent concerns about a child\u2019s emotional regulation, behaviour, learning or development, they should seek advice from an appropriately qualified professional.</p>
                </div>

                <div class="results-actions">
                    <button class="btn btn-primary" onclick="APP.saveResults()">SAVE RESULTS</button>
                    <button class="btn btn-secondary" onclick="APP.printReport()">PRINT / SAVE AS PDF</button>
                    <button class="btn btn-accent" onclick="APP.newAdventure()">NEW ADVENTURE</button>
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Render chart after DOM update
        setTimeout(() => this.renderChart(sessionData), 100);
    },

    /**
     * Render a domain card
     */
    renderDomainCard(title, domainData, domainKey, colour) {
        if (!domainData) return "";

        const feedback = getParentFeedback(domainKey, domainData.classification, domainData.strategyTags);

        return `
            <div class="domain-card" style="border-left-color: ${colour}">
                <div class="domain-header">
                    <h2>${title}</h2>
                    <div class="domain-score">
                        <span class="score-value">${domainData.rawScore} / ${domainData.maxScore}</span>
                        <span class="score-band band-${domainData.classification.toLowerCase().replace(" ", "-")}">${domainData.classification}</span>
                    </div>
                </div>
                <p class="band-note">These categories describe patterns observed within this activity and are not age-normative clinical classifications.</p>
                ${feedback ? `
                    <div class="feedback-section">
                        <h3>What We Observed</h3>
                        <p>${feedback.observed}</p>
                        <h3>Strengths to Encourage</h3>
                        <p>${feedback.strengths}</p>
                        <h3>Ideas to Practise at Home</h3>
                        <p>${feedback.practice}</p>
                        ${feedback.strategyNotes && feedback.strategyNotes.length > 0 ? `
                            <div class="strategy-notes">
                                ${feedback.strategyNotes.map(n => `<p class="strategy-note">\uD83D\uDCA1 ${n}</p>`).join("")}
                            </div>
                        ` : ""}
                    </div>
                ` : ""}
            </div>
        `;
    },

    /**
     * Render emotion recognition supplementary
     */
    renderEmotionRecognition(data) {
        if (!data) return "";
        return `
            <div class="supplementary-card">
                <h3>Emotion Recognition</h3>
                <div class="supp-score">${data.rawScore} / ${data.maxScore}</div>
                <p>${data.rawScore === 3 ? "Your child accurately identified the emotion in the scenario." :
                    data.rawScore === 2 ? "Your child identified a plausible emotion for the scenario." :
                    data.rawScore === 1 ? "Your child selected a less typical emotion for the situation." :
                    "Your child selected an emotion that did not match the expected response for this scenario."}</p>
            </div>
        `;
    },

    /**
     * Render DCCS results
     */
    renderDCCS(dccs) {
        if (!dccs) return "";

        const interpretation = getDCCSInterpretation(dccs);

        return `
            <div class="supplementary-card dccs-card">
                <h3>Switching Rules</h3>
                <p class="dccs-subtitle">How easily did your child adjust when the sorting rule changed?</p>
                
                <div class="dccs-grid">
                    <div class="dccs-metric">
                        <span class="dccs-label">Colour Sort Accuracy</span>
                        <span class="dccs-value">${dccs.preSwitchAccuracy}%</span>
                    </div>
                    <div class="dccs-metric">
                        <span class="dccs-label">Shape Sort Accuracy</span>
                        <span class="dccs-value">${dccs.postSwitchAccuracy}%</span>
                    </div>
                    <div class="dccs-metric">
                        <span class="dccs-label">Colour Sort Time</span>
                        <span class="dccs-value">${dccs.preSwitchTime}s</span>
                    </div>
                    <div class="dccs-metric">
                        <span class="dccs-label">Shape Sort Time</span>
                        <span class="dccs-value">${dccs.postSwitchTime}s</span>
                    </div>
                    <div class="dccs-metric">
                        <span class="dccs-label">First Switch Response</span>
                        <span class="dccs-value">${dccs.firstPostSwitchCorrect ? "Correct" : "Needs Another Try"}</span>
                    </div>
                    <div class="dccs-metric">
                        <span class="dccs-label">Perseverative Errors</span>
                        <span class="dccs-value">${dccs.perseverativeErrors}</span>
                    </div>
                </div>

                ${interpretation ? `
                    <div class="dccs-interpretation">
                        <h4>${interpretation.summary}</h4>
                        <p>${interpretation.detail}</p>
                    </div>
                ` : ""}
            </div>
        `;
    },

    /**
     * Render transparency section showing actual choices
     */
    renderTransparency(sessionData) {
        let html = "";
        const sceneTitles = {
            scene2: "New Classroom",
            scene3: "Different Seat",
            scene4: "Rain Changed the Plan",
            scene5a: "How Does Milo Feel?",
            scene5b: "Response to Provocation",
            scene6: "Calming Down",
            scene7: "Losing a Game",
            scene8: "Usual Lunch Seat",
            scene9: "First Solution Didn\u2019t Work"
        };

        const domains = [
            sessionData.adaptability,
            sessionData.emotionRecognition,
            sessionData.emotionalRegulation,
            sessionData.flexibleThinking
        ];

        domains.forEach(domain => {
            if (domain && domain.responses) {
                domain.responses.forEach(r => {
                    const title = sceneTitles[r.sceneId] || r.sceneId;
                    html += `
                        <div class="transparency-item">
                            <strong>${title}</strong>
                            <p>Child selected: \u201C${this.escapeHtml(r.choiceText)}\u201D</p>
                        </div>
                    `;
                });
            }
        });

        return html;
    },

    /**
     * Render Chart.js horizontal bar chart
     */
    renderChart(sessionData) {
        const canvas = document.getElementById("resultsChart");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Adaptability", "Emotional Regulation", "Flexible Thinking"],
                datasets: [{
                    data: [
                        sessionData.adaptability ? sessionData.adaptability.percent : 0,
                        sessionData.emotionalRegulation ? sessionData.emotionalRegulation.percent : 0,
                        sessionData.flexibleThinking ? sessionData.flexibleThinking.percent : 0
                    ],
                    backgroundColor: [
                        "rgba(77, 184, 255, 0.8)",
                        "rgba(255, 118, 87, 0.8)",
                        "rgba(165, 109, 226, 0.8)"
                    ],
                    borderColor: [
                        "#4DB8FF",
                        "#FF7657",
                        "#A56DE2"
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    barPercentage: 0.6
                }]
            },
            options: {
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => `${ctx.raw}%`
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        grid: { color: "rgba(0,0,0,0.05)" },
                        ticks: {
                            callback: (v) => v + "%",
                            font: { size: 12 }
                        }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { font: { size: 14, weight: "bold" } }
                    }
                }
            }
        });
    },

    /**
     * Escape HTML
     */
    escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }
};
