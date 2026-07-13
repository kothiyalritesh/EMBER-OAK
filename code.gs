/**
 * Google Apps Script Web App
 * Deployment: Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone
 * 
 * Paste this entire file into the Google Apps Script editor linked to your Google Sheet.
 * 
 * Sheet structure (columns):
 * A: Timestamp  |  B: Name  |  C: Phone  |  D: Date  |  E: Guests  |  F: Submitted At
 * 
 * INSTRUCTIONS:
 * 1. Create a Google Sheet with the columns above
 * 2. Copy the Spreadsheet ID from the URL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
 * 3. Paste it below in the SPREADSHEET_ID constant
 * 4. Extensions → Apps Script → Paste this code → Save → Deploy → New deployment → Web app
 */

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // ← Paste your Google Sheet ID here

function getSheet() {
  if (SPREADSHEET_ID === 'YOUR_SPREADSHEET_ID_HERE') {
    // Fallback: use the active spreadsheet (the one the script is bound to)
    return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  }
  return SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
}

function doPost(e) {
  try {
    const sheet = getSheet();
    const data = JSON.parse(e.postData.contents);

    const timestamp = new Date();
    const name      = data.name || '';
    const phone     = data.phone || '';
    const date      = data.date || '';
    const guests    = data.guests || '';
    const submittedAt = data.submittedAt || '';

    sheet.appendRow([timestamp, name, phone, date, guests, submittedAt]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Ember & Oak — Reservation endpoint is live.' }))
    .setMimeType(ContentService.MimeType.JSON);
}