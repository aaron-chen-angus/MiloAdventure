/**
 * Milo Adventure — Google Apps Script
 * 
 * This script receives POST requests from the Milo Adventure web app
 * and appends result data to a Google Sheet.
 * 
 * SETUP:
 * 1. Create a new Google Sheet
 * 2. Open Extensions → Apps Script
 * 3. Paste this entire code
 * 4. Replace SPREADSHEET_ID with your Google Sheet ID
 * 5. Deploy as Web App (Execute as: Me, Access: Anyone)
 * 6. Copy the Web App URL into your config.js
 */

// Replace with your actual Google Sheet ID (found in the sheet URL)
const SPREADSHEET_ID = "1OiaM2AoJ_D3h9-YtQuBZ3o1aoTeinktMPZ1_E3umYh4";
const SHEET_NAME = "Results";

/**
 * Handle POST requests
 */
function doPost(e) {
  try {
    var data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter && e.parameter.data) {
      data = JSON.parse(e.parameter.data);
    } else {
      throw new Error("No data received");
    }
    
    const sheet = getOrCreateSheet();
    
    // Ensure headers exist
    ensureHeaders(sheet);
    
    // Append data row
    const row = buildRow(data);
    sheet.appendRow(row);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: "Data saved successfully" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "Milo Adventure API is running" }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Get or create the results sheet
 */
function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  
  return sheet;
}

/**
 * Ensure header row exists
 */
function ensureHeaders(sheet) {
  const firstCell = sheet.getRange(1, 1).getValue();
  if (firstCell === "") {
    const headers = getHeaders();
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
}

/**
 * Get column headers
 */
function getHeaders() {
  return [
    "Timestamp",
    "Session ID",
    "Nickname",
    "Age",
    "Gender",
    "Scene 2 Choice",
    "Scene 2 Score",
    "Scene 2 Strategy",
    "Scene 3 Choice",
    "Scene 3 Score",
    "Scene 3 Strategy",
    "Scene 4 Choice",
    "Scene 4 Score",
    "Scene 4 Strategy",
    "Adaptability Raw",
    "Adaptability Percent",
    "Adaptability Band",
    "Emotion Recognition Choice",
    "Emotion Recognition Score",
    "Scene 5B Choice",
    "Scene 5B Score",
    "Scene 5B Strategy",
    "Scene 6 Choice",
    "Scene 6 Score",
    "Scene 6 Strategy",
    "Scene 7 Choice",
    "Scene 7 Score",
    "Scene 7 Strategy",
    "Emotional Regulation Raw",
    "Emotional Regulation Percent",
    "Emotional Regulation Band",
    "Scene 8 Choice",
    "Scene 8 Score",
    "Scene 8 Strategy",
    "Scene 9 Choice",
    "Scene 9 Score",
    "Scene 9 Strategy",
    "Flexible Thinking Raw",
    "Flexible Thinking Percent",
    "Flexible Thinking Band",
    "DCCS Pre Accuracy",
    "DCCS Pre Time",
    "DCCS Pre Errors",
    "DCCS Post Accuracy",
    "DCCS Post Time",
    "DCCS Post Errors",
    "DCCS First Switch Correct",
    "DCCS Perseverative Errors",
    "DCCS Accuracy Switch Cost",
    "DCCS Time Switch Cost"
  ];
}

/**
 * Build a data row from the POST payload
 */
function buildRow(data) {
  return [
    data.timestamp || new Date().toISOString(),
    data.sessionId || "",
    data.nickname || "",
    data.age || "",
    data.gender || "",
    data.scene2Choice || "",
    data.scene2Score || 0,
    data.scene2Strategy || "",
    data.scene3Choice || "",
    data.scene3Score || 0,
    data.scene3Strategy || "",
    data.scene4Choice || "",
    data.scene4Score || 0,
    data.scene4Strategy || "",
    data.adaptabilityRaw || 0,
    data.adaptabilityPercent || 0,
    data.adaptabilityBand || "",
    data.emotionRecognitionChoice || "",
    data.emotionRecognitionScore || 0,
    data.scene5bChoice || "",
    data.scene5bScore || 0,
    data.scene5bStrategy || "",
    data.scene6Choice || "",
    data.scene6Score || 0,
    data.scene6Strategy || "",
    data.scene7Choice || "",
    data.scene7Score || 0,
    data.scene7Strategy || "",
    data.emotionalRegulationRaw || 0,
    data.emotionalRegulationPercent || 0,
    data.emotionalRegulationBand || "",
    data.scene8Choice || "",
    data.scene8Score || 0,
    data.scene8Strategy || "",
    data.scene9Choice || "",
    data.scene9Score || 0,
    data.scene9Strategy || "",
    data.flexibleThinkingRaw || 0,
    data.flexibleThinkingPercent || 0,
    data.flexibleThinkingBand || "",
    data.dccsPreAccuracy || 0,
    data.dccsPreTime || 0,
    data.dccsPreErrors || 0,
    data.dccsPostAccuracy || 0,
    data.dccsPostTime || 0,
    data.dccsPostErrors || 0,
    data.dccsFirstSwitchCorrect || false,
    data.dccsPerseverativeErrors || 0,
    data.dccsAccuracySwitchCost || 0,
    data.dccsTimeSwitchCost || 0
  ];
}
