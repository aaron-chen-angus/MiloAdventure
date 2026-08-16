# Milo Adventure

**A science-informed interactive activity exploring adaptability, emotional regulation and flexible thinking in children aged 6–9.**

> Milo Adventure is a science-informed interactive activity designed to explore patterns in children's responses to hypothetical situations and a short cognitive-flexibility activity. It is not a psychological diagnosis or formal developmental assessment.

**Live Application:** https://aaron-chen-angus.github.io/MiloAdventure/

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

The application is deployed at:

**https://aaron-chen-angus.github.io/MiloAdventure/**

To redeploy after changes:
1. Push changes to the `main` branch
2. GitHub Pages will automatically rebuild and deploy

All asset paths are relative — no configuration changes needed.

---

## 17. Google Sheets Integration

Google Sheets persistence is enabled. Each completed adventure automatically submits all results to the configured Google Sheet.

**Google Sheet:** https://docs.google.com/spreadsheets/d/1OiaM2AoJ_D3h9-YtQuBZ3o1aoTeinktMPZ1_E3umYh4/edit

**Web App Endpoint:** https://script.google.com/macros/s/AKfycby9sy_2WEY4MGKkYuQNHhJOhv_HxNEu9P6t7Mfp_xW8R9HSgrOT4B4z7_YNuhjiWMqd2g/exec

Results are also always saved to browser `localStorage` as a fallback.

To disable Google Sheets integration, set `enabled: false` in `config.js`.

---

## 18. Google Apps Script Setup

### Step 1: Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet
2. Name it something like **"Milo Adventure Results"**
3. Copy the **Spreadsheet ID** from the URL — it's the long string between `/d/` and `/edit`:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID_HERE/edit
   ```

### Step 2: Open Apps Script

1. In your Google Sheet, click **Extensions → Apps Script**
2. This opens the Apps Script editor in a new tab
3. Delete any existing code in the editor (the default `myFunction` stub)

### Step 3: Paste the Script

1. Open the file `google-apps-script.gs` from this repository
2. Copy the **entire contents** and paste into the Apps Script editor
3. On line 5, confirm the Spreadsheet ID matches your Sheet:
   ```javascript
   const SPREADSHEET_ID = "1OiaM2AoJ_D3h9-YtQuBZ3o1aoTeinktMPZ1_E3umYh4";
   ```
4. Click the **Save** icon (💾) or press Ctrl+S

### Step 4: Deploy as Web App

1. Click **Deploy → New deployment** (blue button, top right)
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Fill in the settings:
   - **Description:** `Milo Adventure Results v1`
   - **Execute as:** `Me` (your Google account)
   - **Who has access:** `Anyone`
4. Click **Deploy**
5. A dialog will ask you to **authorise** access — click "Authorise access"
6. Choose your Google account and click "Allow" (you may need to click "Advanced" → "Go to Milo Adventure (unsafe)" if Google shows a warning — this is normal for personal scripts)
7. After authorisation, you'll see a **Web app URL** like:
   ```
   https://script.google.com/macros/s/AKfycbw.../exec
   ```
8. **Copy that URL**

### Step 5: Configure Your App

Open `config.js` in your Milo Adventure folder and update both values:

```javascript
const CONFIG = {
    googleSheets: {
        enabled: true,
        webAppUrl: "https://script.google.com/macros/s/AKfycby9sy_2WEY4MGKkYuQNHhJOhv_HxNEu9P6t7Mfp_xW8R9HSgrOT4B4z7_YNuhjiWMqd2g/exec"
    },
    // ... rest stays the same
};
```

### Step 6: Test

1. Open the live app at https://aaron-chen-angus.github.io/MiloAdventure/
2. Complete a full adventure (all scenes + DCCS)
3. On the results page, click **SAVE RESULTS**
4. Check the Google Sheet — a new row should appear in the "Results" tab
5. The script auto-creates column headers if the sheet is empty

### Step 7: Verify with GET request (optional)

Visit the Web App URL directly in a browser. You should see:
```json
{"status":"Milo Adventure API is running"}
```

### Troubleshooting

| Issue | Solution |
|-------|----------|
| No data appears in sheet | Double-check the Spreadsheet ID in the script matches your sheet URL |
| Console shows CORS error | This is expected with `no-cors` mode — data still goes through. Check the sheet. |
| "Permission denied" | Re-deploy and confirm "Who has access" is set to **Anyone** |
| Old code still running after edits | You must create a **new deployment version**: Deploy → Manage deployments → edit → increment version |
| Sheet tab named wrong | The script automatically creates a tab called "Results" — look for it |
| Authorisation popup not appearing | Try opening the script editor in an incognito window |

---

## 19. Data Dictionary

The following table defines every field captured by the application. All fields are written to a single row in the Google Sheet upon session completion.

### 19.1 Session & Participant Fields

| # | Field Name | Data Type | Description | Example Value | Constraints |
|---|-----------|-----------|-------------|---------------|-------------|
| 1 | Timestamp | ISO 8601 datetime string | Date and time when the adventure was completed | `2026-08-16T10:30:00.000Z` | Auto-generated; UTC format |
| 2 | Session ID | String (alphanumeric) | Unique identifier for this adventure session | `MA-m1k3x9-ab7c2f` | Auto-generated; format: `MA-{base36_timestamp}-{random_6chars}` |
| 3 | Nickname | String | Child's name or nickname as entered by the participant | `Milo` | Required; max 30 characters; free text |
| 4 | Age | Integer | Child's age in years | `7` | Expected range: 6–9; entered via button selection |
| 5 | Gender | String (categorical) | Child's gender as selected | `Boy` | Values: `Boy`, `Girl`, `Others`, `Prefer not to say`, or empty |

### 19.2 Adaptability Domain (Scenes 2–4)

| # | Field Name | Data Type | Description | Example Value | Constraints |
|---|-----------|-----------|-------------|---------------|-------------|
| 6 | Scene 2 Choice | String | Full text of the child's selected response for Scene 2 (New Classroom) | `"A new classroom! Let's explore and see what's different."` | One of 3 predefined options |
| 7 | Scene 2 Score | Integer | Points awarded for Scene 2 response | `3` | Range: 0–3 |
| 8 | Scene 2 Strategy | String (coded tag) | Strategy classification tag for Scene 2 response | `positive_reframing` | Values: `resistance_to_change`, `acceptance_of_change`, `positive_reframing` |
| 9 | Scene 3 Choice | String | Full text of the child's selected response for Scene 3 (Seat Change) | `"Sit there and introduce himself to the children at the table."` | One of 3 predefined options |
| 10 | Scene 3 Score | Integer | Points awarded for Scene 3 response | `3` | Range: 0–3 |
| 11 | Scene 3 Strategy | String (coded tag) | Strategy classification tag for Scene 3 response | `active_adaptation` | Values: `routine_rigidity`, `adaptive_acceptance`, `active_adaptation` |
| 12 | Scene 4 Choice | String | Full text of the child's selected response for Scene 4 (Lesson Plan Changes) | `"Suggest something fun the class could do indoors instead."` | One of 3 predefined options |
| 13 | Scene 4 Score | Integer | Points awarded for Scene 4 response | `3` | Range: 0–3 |
| 14 | Scene 4 Strategy | String (coded tag) | Strategy classification tag for Scene 4 response | `adaptive_reframing` | Values: `difficulty_with_change`, `adaptive_acceptance`, `adaptive_reframing` |
| 15 | Adaptability Raw | Integer | Sum of scores from Scenes 2 + 3 + 4 | `8` | Range: 0–9 |
| 16 | Adaptability Percent | Integer | Normalised percentage: (raw ÷ 9) × 100, rounded | `89` | Range: 0–100 |
| 17 | Adaptability Band | String (categorical) | Descriptive performance classification | `Strong` | Values: `Emerging`, `Developing`, `Developing Well`, `Strong` |

### 19.3 Emotion Recognition (Scene 5A — Supplementary)

| # | Field Name | Data Type | Description | Example Value | Constraints |
|---|-----------|-----------|-------------|---------------|-------------|
| 18 | Emotion Recognition Choice | String | The emotion label the child selected | `Angry` | Values: `Angry`, `Sad`, `Worried`, `Happy` |
| 19 | Emotion Recognition Score | Integer | Points awarded for emotion identification accuracy | `3` | Range: 0–3 (3=accurate, 2=plausible, 1=less likely, 0=incongruent) |

### 19.4 Emotional Regulation Domain (Scenes 5B, 6, 7)

| # | Field Name | Data Type | Description | Example Value | Constraints |
|---|-----------|-----------|-------------|---------------|-------------|
| 20 | Scene 5B Choice | String | Full text of the child's selected response for Scene 5B (Response to Provocation) | `"Take a breath and say, 'Please give it back. Ask me next time.'"` | One of 4 predefined options |
| 21 | Scene 5B Score | Integer | Points awarded for Scene 5B response | `3` | Range: 0–3 |
| 22 | Scene 5B Strategy | String (coded tag) | Strategy classification tag for Scene 5B response | `calm_assertive` | Values: `impulsive_reactive`, `calm_assertive`, `passive_withdrawal`, `appropriate_support_seeking` |
| 23 | Scene 6 Choice | String | Full text of the child's selected response for Scene 6 (Self-Calming) | `"Take a few slow breaths and continue the activity."` | One of 4 predefined options |
| 24 | Scene 6 Score | Integer | Points awarded for Scene 6 response | `3` | Range: 0–3 |
| 25 | Scene 6 Strategy | String (coded tag) | Strategy classification tag for Scene 6 response | `self_regulation` | Values: `rumination`, `self_regulation`, `social_support`, `emotional_escalation` |
| 26 | Scene 7 Choice | String | Full text of the child's selected response for Scene 7 (Losing a Game) | `"Take a moment, congratulate Pip and try again later."` | One of 3 predefined options |
| 27 | Scene 7 Score | Integer | Points awarded for Scene 7 response | `3` | Range: 0–3 |
| 28 | Scene 7 Strategy | String (coded tag) | Strategy classification tag for Scene 7 response | `adaptive_coping` | Values: `avoidant_response`, `adaptive_coping`, `externalising_response` |
| 29 | Emotional Regulation Raw | Integer | Sum of scores from Scenes 5B + 6 + 7 | `9` | Range: 0–9 |
| 30 | Emotional Regulation Percent | Integer | Normalised percentage: (raw ÷ 9) × 100, rounded | `100` | Range: 0–100 |
| 31 | Emotional Regulation Band | String (categorical) | Descriptive performance classification | `Strong` | Values: `Emerging`, `Developing`, `Developing Well`, `Strong` |

### 19.5 Flexible Thinking & Problem Solving Domain (Scenes 8, 9)

| # | Field Name | Data Type | Description | Example Value | Constraints |
|---|-----------|-----------|-------------|---------------|-------------|
| 32 | Scene 8 Choice | String | Full text of the child's selected response for Scene 8 (Lunch Seat Taken) | `"Ask Ari whether they can sit together."` | One of 4 predefined options |
| 33 | Scene 8 Score | Integer | Points awarded for Scene 8 response | `3` | Range: 0–3 |
| 34 | Scene 8 Strategy | String (coded tag) | Strategy classification tag for Scene 8 response | `collaborative_problem_solving` | Values: `rigid_solution`, `simple_alternative`, `collaborative_problem_solving`, `solution_generation` |
| 35 | Scene 9 Choice | String | Full text of the child's selected response for Scene 9 (First Solution Fails) | `"Invite Ari and Ari's friend to join Milo's group at another table."` | One of 4 predefined options |
| 36 | Scene 9 Score | Integer | Points awarded for Scene 9 response | `3` | Range: 0–3 |
| 37 | Scene 9 Strategy | String (coded tag) | Strategy classification tag for Scene 9 response | `integrative_solution` | Values: `perseveration`, `alternative_solution`, `adaptive_modification`, `integrative_solution` |
| 38 | Flexible Thinking Raw | Integer | Sum of scores from Scenes 8 + 9 | `6` | Range: 0–6 |
| 39 | Flexible Thinking Percent | Integer | Normalised percentage: (raw ÷ 6) × 100, rounded | `100` | Range: 0–100 |
| 40 | Flexible Thinking Band | String (categorical) | Descriptive performance classification | `Strong` | Values: `Emerging`, `Developing`, `Developing Well`, `Strong` |

### 19.6 DCCS (Dimensional Change Card Sort) Metrics

| # | Field Name | Data Type | Description | Example Value | Constraints |
|---|-----------|-----------|-------------|---------------|-------------|
| 41 | DCCS Pre Accuracy | Integer | Percentage of correct placements during the colour-sorting phase | `94` | Range: 0–100; calculated as (correct moves ÷ total moves) × 100 |
| 42 | DCCS Pre Time | Float | Time in seconds to complete the colour-sorting phase | `45.2` | Measured from phase start to successful completion; 1 decimal place |
| 43 | DCCS Pre Errors | Integer | Number of incorrect placements during the colour-sorting phase | `1` | Range: 0–n; an error = placing a piece on a shelf with a different-coloured piece |
| 44 | DCCS Post Accuracy | Integer | Percentage of correct placements during the shape-sorting phase | `81` | Range: 0–100; calculated as (correct moves ÷ total moves) × 100 |
| 45 | DCCS Post Time | Float | Time in seconds to complete the shape-sorting phase | `52.1` | Measured from phase start to successful completion; 1 decimal place |
| 46 | DCCS Post Errors | Integer | Number of incorrect placements during the shape-sorting phase | `4` | Range: 0–n; an error = placing a piece on a shelf with a different-shaped piece |
| 47 | DCCS First Switch Correct | Boolean | Whether the very first placement in the shape phase followed the new rule | `false` | `true` = first post-switch move was shape-congruent; `false` = first move was incorrect |
| 48 | DCCS Perseverative Errors | Integer | Number of post-switch placements that followed the old colour rule | `2` | Range: 0–n; a perseverative error = grouping by colour during the shape phase |
| 49 | DCCS Accuracy Switch Cost | Integer | Difference in accuracy between pre-switch and post-switch phases | `13` | Calculated as: Pre Accuracy − Post Accuracy; positive values indicate decreased accuracy after rule switch |
| 50 | DCCS Time Switch Cost | Float | Difference in completion time between phases | `6.9` | Calculated as: Post Time − Pre Time (seconds); positive values indicate the shape phase took longer |

### 19.7 Field Classification Summary

| Category | Fields | Purpose |
|----------|--------|---------|
| Identification | 1–5 | Session tracking and participant demographics |
| Adaptability | 6–17 | Responses and scoring for environmental-change scenarios |
| Emotion Recognition | 18–19 | Supplementary emotion-identification accuracy |
| Emotional Regulation | 20–31 | Responses and scoring for emotion-management scenarios |
| Flexible Thinking | 32–40 | Responses and scoring for problem-solving scenarios |
| DCCS Metrics | 41–50 | Performance data from the cognitive-flexibility sorting task |

### 19.8 Performance Band Definitions

| Band | Percentage Range | Interpretation |
|------|-----------------|----------------|
| Emerging | 0–33% | Child's responses predominantly reflected less adaptive strategies in this domain |
| Developing | 34–55% | Child showed some awareness of adaptive strategies but inconsistently selected them |
| Developing Well | 56–78% | Child generally selected adaptive strategies with occasional variation |
| Strong | 79–100% | Child consistently selected highly adaptive responses across scenarios |

**Important:** These bands are app-derived descriptive categories and are NOT age-normative clinical classifications.

### 19.9 Strategy Tag Reference

Strategy tags are coded categorical variables indicating the psychological strategy reflected by each response choice. They are used internally for generating personalised parent feedback.

| Domain | Tag | Description |
|--------|-----|-------------|
| Adaptability | `resistance_to_change` | Refusal to accept the changed situation |
| Adaptability | `acceptance_of_change` | Reluctant but willing acceptance of change |
| Adaptability | `positive_reframing` | Active enthusiasm toward the new situation |
| Adaptability | `routine_rigidity` | Strong preference for maintaining established routine |
| Adaptability | `adaptive_acceptance` | Calm acceptance of the disruption |
| Adaptability | `active_adaptation` | Proactive engagement with the new situation |
| Adaptability | `difficulty_with_change` | Distress response to plan disruption |
| Adaptability | `adaptive_reframing` | Generating constructive alternatives to the original plan |
| Emotion Recognition | `emotion_recognition_accurate` | Correctly identified the most congruent emotion |
| Emotion Recognition | `emotion_recognition_plausible` | Selected a plausible but not primary emotion |
| Emotion Recognition | `emotion_recognition_less_likely` | Selected a less situationally appropriate emotion |
| Emotion Recognition | `emotion_recognition_incongruent` | Selected an emotion incongruent with the situation |
| Emotional Regulation | `impulsive_reactive` | Immediate behavioural reaction without pause |
| Emotional Regulation | `calm_assertive` | Regulated response with clear communication |
| Emotional Regulation | `passive_withdrawal` | Internalising response; suppressing emotions |
| Emotional Regulation | `appropriate_support_seeking` | Seeking help from a trusted adult |
| Emotional Regulation | `rumination` | Continued focus on the upsetting event |
| Emotional Regulation | `self_regulation` | Use of self-calming strategies (e.g., breathing) |
| Emotional Regulation | `social_support` | Seeking comfort from a peer |
| Emotional Regulation | `emotional_escalation` | Intensification of negative emotion/behaviour |
| Emotional Regulation | `avoidant_response` | Withdrawing from the situation entirely |
| Emotional Regulation | `adaptive_coping` | Accepting outcome and choosing constructive next step |
| Emotional Regulation | `externalising_response` | Blaming others or attributing fault externally |
| Flexible Thinking | `rigid_solution` | Insisting on a single approach that disadvantages others |
| Flexible Thinking | `simple_alternative` | Generating a basic alternative but not optimal solution |
| Flexible Thinking | `collaborative_problem_solving` | Proposing a solution that includes others |
| Flexible Thinking | `solution_generation` | Creating a novel approach for the group |
| Flexible Thinking | `perseveration` | Repeating the same failed approach |
| Flexible Thinking | `alternative_solution` | Switching to a different workable strategy |
| Flexible Thinking | `adaptive_modification` | Modifying the original approach to fit constraints |
| Flexible Thinking | `integrative_solution` | Creating a solution that benefits all parties involved |

---

## 20. Data Schema (localStorage)

```json
{
  "sessionId": "MA-m1k3x9-ab7c2f",
  "participant": {
    "nickname": "Milo",
    "age": "7",
    "gender": "Boy"
  },
  "completedAt": "2026-08-16T10:30:00.000Z",
  "adaptability": {
    "rawScore": 7,
    "maxScore": 9,
    "percent": 78,
    "classification": "Developing Well",
    "responses": [
      {
        "sceneId": "scene2",
        "choiceId": "B",
        "choiceText": "\"I liked my old classroom, but I'll go and see the new one.\"",
        "score": 2,
        "strategyTag": "acceptance_of_change"
      }
    ],
    "strategyTags": ["acceptance_of_change", "active_adaptation", "adaptive_reframing"]
  },
  "emotionalRegulation": {
    "rawScore": 9,
    "maxScore": 9,
    "percent": 100,
    "classification": "Strong",
    "responses": [...],
    "strategyTags": [...]
  },
  "emotionRecognition": {
    "rawScore": 3,
    "maxScore": 3,
    "percent": 100,
    "classification": "Strong",
    "responses": [...],
    "strategyTags": ["emotion_recognition_accurate"]
  },
  "flexibleThinking": {
    "rawScore": 6,
    "maxScore": 6,
    "percent": 100,
    "classification": "Strong",
    "responses": [...],
    "strategyTags": [...]
  },
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

## 21. Privacy and Data Protection

- **No camera** access
- **No microphone** access
- **No biometric data** collected
- **No medical records** accessed
- **No images** recorded
- Only entered nickname/demographics and game responses are stored

**Data storage:**
- Locally in browser `localStorage` (persists until cleared)
- Transmitted to the configured Google Sheet on save

**Recommendations:**
- Use a nickname or coded ID rather than full legal name
- Obtain appropriate consent if deployed in research/school settings
- Follow institutional privacy policies
- Data in Google Sheets is subject to Google's data handling policies

---

## 22. Accessibility

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

## 23. Testing

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

## 24. Known Limitations

- Hypothetical responses ≠ real-world behaviour
- Single-session sampling (mood/context dependent)
- Reading comprehension required
- No audio narration in MVP
- DCCS is gamified, not standardised
- Band thresholds are not empirically validated
- No longitudinal tracking in MVP

---

## 25. Future Development

- Audio narration for pre-readers
- Multiple language support
- Additional scenario sets
- Teacher dashboard
- Longitudinal progress tracking
- Research-mode with anonymised export
- Validated normative data collection

---

## 26. Academic References

Denham, S. A., Bouril, B., & Belouad, F. (1994). Preschoolers' affect and cognition about challenging peer situations. *Child Study Journal*, 24, 1–21.

Denham, S. A., Bassett, H. H., Way, E., Mincic, M., Zinsser, K., & Graling, K. (2014). "How would you feel? What would you do?" Development and underpinnings of preschoolers' social information processing. *Journal of Research in Childhood Education*, 28(2), 182–198.

Doebel, S., & Zelazo, P. D. (2015). A meta-analysis of the Dimensional Change Card Sort: Implications for developmental theories and the measurement of executive function in children. *Developmental Review*, 38, 241–268.

Gross, J. J. (2015). Emotion regulation: Current status and future prospects. *Psychological Inquiry*, 26(1), 1–26.

Zelazo, P. D. (2006). The Dimensional Change Card Sort (DCCS): A method of assessing executive function in children. *Nature Protocols*, 1(1), 297–301.

---

## 27. Disclaimer

Milo Adventure is a science-informed interactive activity designed to explore patterns in children's responses to hypothetical situations and a short cognitive-flexibility activity. It is not a psychological diagnosis or formal developmental assessment.

The results are intended to support reflection and conversation with parents or educators and should not be interpreted as a diagnosis of a psychological, behavioural or developmental condition.

If parents or educators have persistent concerns about a child's emotional regulation, behaviour, learning or development, they should seek advice from an appropriately qualified professional.

---

*Built with HTML5, CSS3, Vanilla JavaScript and Chart.js. No build tools or server dependencies required.*
