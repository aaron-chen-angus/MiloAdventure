# Milo Adventure

**A science-informed interactive activity exploring adaptability, emotional regulation and flexible thinking in children aged 6–9.**

> Milo Adventure is a science-informed interactive activity designed to explore patterns in children's responses to hypothetical situations and a short cognitive-flexibility activity. It is not a psychological diagnosis or formal developmental assessment.

---

## 1. Project Overview

Milo Adventure is a visually immersive, mobile-first web application in which a child (aged approximately 6–9) follows Milo, a young duckling, through a series of school-day situations and makes decisions on Milo's behalf.

The application explores three primary developmental domains:

1. **Adaptability** — response to environmental change, disruption of routine and changed plans
2. **Emotional Regulation** — recognition of emotions, response to provocation, self-calming, response to disappointment
3. **Flexible Thinking & Problem Solving** — generating alternative solutions, adjusting when an initial strategy fails

Additionally:
- A supplementary **Emotion Recognition** indicator
- A short **Dimensional Change Card Sort (DCCS)** task assessing rule switching and cognitive flexibility

The child experiences: **Story → Decision → Story → Decision → Mini-Game → Celebration**

The detailed analysis is shown only to parents/educators after the child completes the activity.

---

## 2. Intended Users

| User | Role |
|------|------|
| Child (6–9) | Primary participant — experiences the interactive story |
| Parent / Caregiver | Reviews the Adventure Skills Report |
| Educator / Facilitator | Uses results to support developmental conversations |

The child interface and parent interface are visually and functionally distinct. Children never see scores, percentages, or clinical labels during play.

---

## 3. Purpose and Scope

### What this app IS:
- Science-informed
- Educational
- Exploratory
- Developmental
- Suitable for community, school, wellness and educational contexts

### What this app is NOT:
- A diagnostic psychological test
- A validated developmental assessment
- A mental-health diagnosis tool
- An IQ test
- A clinical executive-function assessment
- A substitute for professional evaluation

---

## 4. Scientific and Developmental Basis

### A. Hypothetical Social Scenarios

The Challenging Situations Task (Denham et al., 1994; 2014) uses pictorial hypothetical peer-provocation scenarios with emotion and behavioural response alternatives to examine children's social-emotional processing. Social-information-processing frameworks conceptualise children's responses as involving interpretation of cues, response generation, evaluation and behavioural choice.

Milo Adventure adapts this approach by presenting illustrated school-day scenarios where children select from multiple response options that reflect different cognitive and emotional strategies.

### B. Emotion Regulation

Emotion regulation involves processes used to modify emotional experience or expression. Research distinguishes adaptive strategies such as problem solving, reappraisal, acceptance and social support from less adaptive patterns such as avoidance, rumination and poorly regulated behavioural responses.

### C. Cognitive Flexibility (DCCS)

The Dimensional Change Card Sort (DCCS) is a widely used measure of executive function and cognitive flexibility in children (Doebel & Zelazo, 2015). Standard versions require sorting by one dimension (e.g., colour) followed by switching to another rule (e.g., shape). Research shows clear developmental changes in switching performance between ages 3 and 7.

The Milo Adventure implementation is a **custom gamified adaptation** of this paradigm. It should not be considered equivalent to a standardised DCCS administration.

### D. Important Limitation

Hypothetical scenario responses are not equivalent to observing the child's behaviour in real life. Children's choices may vary depending on mood, fatigue, comprehension, language proficiency and context. Milo Adventure is a science-informed interactive developmental activity, not a validated psychological instrument.

---

## 5. Important Limitations

- Results reflect responses to hypothetical scenarios, not observed behaviour
- Scoring bands are app-derived descriptive categories, not age-normative clinical classifications
- The DCCS implementation is gamified and not equivalent to standardised administration
- Performance may be influenced by device familiarity, reading level, mood and context
- Results should not be used for clinical diagnosis or formal assessment

---

## 6. Application Architecture

```
/MiloAdventure/
├── index.html          — Entry point
├── styles.css          — All styling
├── app.js              — Main application controller & state machine
├── scenarios.js        — Scene data (story text, choices, scores, tags)
├── scoring.js          — Domain scoring, bands, parent feedback templates
├── dccs.js             — DCCS game engine, SVG generator, metrics
├── results.js          — Results page renderer, Chart.js integration
├── storage.js          — localStorage & sessionStorage management
├── google-sheets.js    — Optional Google Sheets integration
├── config.js           — Application configuration
├── google-apps-script.gs — Google Apps Script for Sheets backend
├── README.md           — This file
└── /assets/
    ├── Cover.png
    ├── Scene 1.png – Scene 10.png
    └── /icons/
```

---

## 7. Scenario Structure

The adventure follows one continuous school-day story:

| Scene | Title | Domain | Max Score |
|-------|-------|--------|-----------|
| 1 | Welcome to School | — | — |
| 2 | Surprise, New Classroom | Adaptability | 3 |
| 3 | Milo's Usual Seat Is Gone | Adaptability | 3 |
| 4 | Lesson Plan Changes | Adaptability | 3 |
| 5A | How Does Milo Feel? | Emotion Recognition | 3 |
| 5B | Response to Provocation | Emotional Regulation | 3 |
| 6 | Milo Is Still Upset | Emotional Regulation | 3 |
| 7 | Losing a Game | Emotional Regulation | 3 |
| 8 | Usual Lunch Seat Is Taken | Flexible Thinking | 3 |
| 9 | First Solution Doesn't Work | Flexible Thinking | 3 |
| 10 | Ms Cappy's Sorting Game | — (intro to DCCS) | — |

---

## 8. Scoring Architecture

| Domain | Scenes | Max Raw | Normalisation |
|--------|--------|---------|---------------|
| Adaptability | 2, 3, 4 | 9 | raw ÷ 9 × 100 |
| Emotional Regulation | 5B, 6, 7 | 9 | raw ÷ 9 × 100 |
| Emotion Recognition | 5A | 3 | Supplementary |
| Flexible Thinking & Problem Solving | 8, 9 | **6** | raw ÷ 6 × 100 |

**Performance Bands (app-derived, not normative):**

| Percentage | Band |
|-----------|------|
| 0–33% | Emerging |
| 34–55% | Developing |
| 56–78% | Developing Well |
| 79–100% | Strong |

No single total psychological score is calculated. Domains remain separate.

---

## 9. Strategy Tags

Each response option is tagged with a strategy identifier used for personalised parent feedback:

**Adaptability:** resistance_to_change, acceptance_of_change, positive_reframing, routine_rigidity, adaptive_acceptance, active_adaptation, difficulty_with_change, adaptive_reframing

**Emotional Regulation:** impulsive_reactive, calm_assertive, passive_withdrawal, appropriate_support_seeking, rumination, self_regulation, social_support, emotional_escalation, avoidant_response, adaptive_coping, externalising_response

**Flexible Thinking:** rigid_solution, simple_alternative, collaborative_problem_solving, solution_generation, perseveration, alternative_solution, adaptive_modification, integrative_solution

**Emotion Recognition:** emotion_recognition_accurate, emotion_recognition_plausible, emotion_recognition_less_likely, emotion_recognition_incongruent

---

## 10. DCCS Implementation

- 16 game pieces: 4 colours (red, yellow, green, blue) × 4 shapes (circle, triangle, square, star)
- Shapes generated programmatically via SVG
- Phase 1: Sort by colour (pre-switch)
- Phase 2: Sort by shape (post-switch)
- Tap-to-place interaction optimised for mobile

**Metrics recorded:**
- Accuracy per phase
- Time per phase
- Total/correct/incorrect moves
- First post-switch response
- Perseverative errors (sorting by old colour rule during shape phase)
- Accuracy switch cost
- Time switch cost

---

## 11. Results Interpretation

Parent reports contain for each domain:
1. **What We Observed** — factual description of response patterns
2. **Strengths to Encourage** — positive framing
3. **Ideas to Practise at Home** — actionable suggestions

All feedback is deterministic and selected from prewritten templates based on the performance band and strategy tags. No external LLM generates advice.

---

## 12. Parent Reporting Logic

Feedback is band-based (Strong / Developing Well / Developing / Emerging) with additional strategy-specific notes triggered by particular response patterns (e.g., repeated rumination, support-seeking, self-regulation).

---

## 13. Asset Structure

All assets in `/assets/` are final production artwork. They must not be regenerated, substituted, cropped or recoloured.

| Filename | Ratio | Scene |
|----------|-------|-------|
| Cover.png | 9:16 | Landing |
| Scene 1.png | 9:16 | Welcome |
| Scene 2.png | 1:1 | New Classroom |
| Scene 3.png | 1:1 | Different Seat |
| Scene 4.png | 1:1 | Rain/Lesson Change |
| Scene 5.png | 1:1 | Pencil/Provocation |
| Scene 6.png | 1:1 | Still Upset |
| Scene 7.png | 1:1 | Losing a Game |
| Scene 8.png | 1:1 | Canteen Seat |
| Scene 9.png | 1:1 | First Solution Fails |
| Scene 10.png | 9:16 | DCCS Intro |

---

## 14. Local Installation

No build tools, npm, or server required.

1. Clone or download this repository
2. Place image assets in `/assets/` folder with correct filenames
3. Open `index.html` in a modern browser

---

## 15. Running Locally

Simply open `index.html` directly in a browser, or use any static file server:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve .
```

Then open `http://localhost:8000`

---

## 16. GitHub Pages Deployment

1. Push repository to GitHub
2. Go to repository **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Choose **main** branch, **/ (root)** folder
5. Click **Save**
6. Site will be available at `https://username.github.io/repository-name/`

All asset paths are relative — no configuration changes needed.

---

## 17. Google Sheets Integration

Google Sheets persistence is **optional**. The app functions completely without it.

To enable:

1. Edit `config.js`:
```javascript
googleSheets: {
    enabled: true,
    webAppUrl: "YOUR_APPS_SCRIPT_WEB_APP_URL"
}
```

---

## 18. Google Apps Script Setup

### Step-by-step:

1. **Create a Google Sheet** with a name like "Milo Adventure Results"
2. **Copy the Sheet ID** from the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
3. **Open Extensions → Apps Script**
4. **Delete any existing code** and paste the contents of `google-apps-script.gs`
5. **Replace** `YOUR_SPREADSHEET_ID_HERE` with your Sheet ID
6. **Deploy:**
   - Click **Deploy → New deployment**
   - Select type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**
7. **Authorise** when prompted
8. **Copy the Web App URL**
9. **Paste** the URL into `config.js` → `googleSheets.webAppUrl`
10. **Set** `enabled: true`
11. **Test** by completing an adventure and checking the sheet

### Troubleshooting:
- If data doesn't appear: check the Sheet ID is correct
- CORS issues: the app uses `mode: "no-cors"` which should bypass most issues
- Permissions: ensure "Anyone" can access the web app
- Re-deploy after code changes (create new deployment version)

---

## 19. Data Schema

```json
{
  "sessionId": "MA-abc123-xyz456",
  "participant": {
    "nickname": "Milo",
    "age": "7",
    "gender": "Boy"
  },
  "completedAt": "2024-01-15T10:30:00.000Z",
  "adaptability": {
    "rawScore": 7,
    "maxScore": 9,
    "percent": 78,
    "classification": "Developing Well",
    "responses": [...],
    "strategyTags": [...]
  },
  "emotionalRegulation": { ... },
  "emotionRecognition": {
    "rawScore": 3,
    "maxScore": 3,
    "percent": 100,
    "classification": "Strong",
    "responses": [...],
    "strategyTags": [...]
  },
  "flexibleThinking": { ... },
  "dccs": {
    "preSwitchAccuracy": 94,
    "preSwitchTime": 45.2,
    "preSwitchMoves": 18,
    "preSwitchErrors": 1,
    "postSwitchAccuracy": 81,
    "postSwitchTime": 52.1,
    "postSwitchMoves": 21,
    "postSwitchErrors": 4,
    "firstPostSwitchCorrect": false,
    "perseverativeErrors": 2,
    "accuracySwitchCost": 13,
    "timeSwitchCost": 6.9
  }
}
```

---

## 20. Privacy and Data Protection

- **No camera** access
- **No microphone** access
- **No biometric data** collected
- **No medical records** accessed
- **No images** recorded
- Only entered nickname/demographics and game responses are stored

**Data storage:**
- Locally in browser `localStorage` (persists until cleared)
- Optionally transmitted to a configured Google Sheet

**Recommendations:**
- Use a nickname or coded ID rather than full legal name
- Obtain appropriate consent if deployed in research/school settings
- Follow institutional privacy policies
- Data in Google Sheets is subject to Google's data handling policies

---

## 21. Accessibility

- Large child-readable text (minimum 16px body)
- Clear iconography with text labels
- Colour + text used together (never colour alone)
- Keyboard accessibility
- ARIA labels on interactive elements
- Focus indicators
- Minimum 48px touch targets
- `prefers-reduced-motion` support
- No red/green-only distinctions
- High contrast text

---

## 22. Testing

### Scenario Testing
- Every choice produces correct score and strategy tag
- Next button appears only after selection
- No answer overwritten accidentally
- All scenes accessible in sequence

### DCCS Testing
- All 16 pieces render correctly
- Colour grouping validates regardless of shelf order
- Shape grouping validates regardless of shelf order
- Incorrect placements are allowed (not prevented)
- Pieces can be moved between shelves
- Mobile touch interactions work
- Rule switch resets and reshuffles correctly
- Perseverative error detection works
- Timers record accurately

### Results Testing
- All score combinations produce correct classifications
- Flexible thinking max correctly treated as 6
- Normalised percentages are accurate
- Strategy-specific feedback triggers correctly
- Chart renders properly

---

## 23. Known Limitations

- Hypothetical responses ≠ real-world behaviour
- Single-session sampling (mood/context dependent)
- Reading comprehension required
- No audio narration in MVP
- DCCS is gamified, not standardised
- Band thresholds are not empirically validated
- No longitudinal tracking in MVP

---

## 24. Future Development

- Audio narration for pre-readers
- Multiple language support
- Additional scenario sets
- Teacher dashboard
- Longitudinal progress tracking
- Research-mode with anonymised export
- Validated normative data collection

---

## 25. Academic References

Denham, S. A., Bouril, B., & Belouad, F. (1994). Preschoolers' affect and cognition about challenging peer situations. *Child Study Journal*, 24, 1–21.

Denham, S. A., Bassett, H. H., Way, E., Mincic, M., Zinsser, K., & Graling, K. (2014). "How would you feel? What would you do?" Development and underpinnings of preschoolers' social information processing. *Journal of Research in Childhood Education*, 28(2), 182–198.

Doebel, S., & Zelazo, P. D. (2015). A meta-analysis of the Dimensional Change Card Sort: Implications for developmental theories and the measurement of executive function in children. *Developmental Review*, 38, 241–268.

Gross, J. J. (2015). Emotion regulation: Current status and future prospects. *Psychological Inquiry*, 26(1), 1–26.

Zelazo, P. D. (2006). The Dimensional Change Card Sort (DCCS): A method of assessing executive function in children. *Nature Protocols*, 1(1), 297–301.

---

## 26. Disclaimer

Milo Adventure is a science-informed interactive activity designed to explore patterns in children's responses to hypothetical situations and a short cognitive-flexibility activity. It is not a psychological diagnosis or formal developmental assessment.

The results are intended to support reflection and conversation with parents or educators and should not be interpreted as a diagnosis of a psychological, behavioural or developmental condition.

If parents or educators have persistent concerns about a child's emotional regulation, behaviour, learning or development, they should seek advice from an appropriately qualified professional.

---

*Built with HTML5, CSS3, Vanilla JavaScript and Chart.js. No build tools or server dependencies required.*
