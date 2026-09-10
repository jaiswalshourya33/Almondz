/**
 * Almondz Global Infra-Consultant — Contact form → Google Sheets bridge.
 *
 * This receives JSON from the website's /contact forms and appends a row to the
 * matching tab of the bound Google Sheet. Career submissions also store the
 * uploaded resume in Google Drive and drop a link into the sheet.
 *
 * ── SETUP ──────────────────────────────────────────────────────────────────
 *  1. Create a Google Sheet (this is your inbox). Tabs are created automatically
 *     on first submission, named:  Inquiries | Vendors | Careers
 *  2. In that Sheet:  Extensions → Apps Script.  Delete the sample code, paste
 *     this whole file, and Save (disk icon).
 *  3. Set SHARED_TOKEN below to a long random string. Put the SAME string in the
 *     website's .env as  VITE_SHEETS_TOKEN.
 *  4. (optional) Make a Drive folder for resumes, open it, copy the id from the
 *     URL (…/folders/THIS_PART) into RESUME_FOLDER_ID. Leave '' to use My Drive.
 *  5. Deploy → New deployment → gear icon → "Web app".
 *        Description:      agicl-contact-bridge
 *        Execute as:       Me
 *        Who has access:   Anyone
 *     Click Deploy, authorise when prompted, copy the Web app URL that ends in
 *     /exec.  Put it in the website .env as  VITE_SHEETS_WEBHOOK_URL.
 *  6. After ANY later edit here: Deploy → Manage deployments → pencil → Version:
 *     "New version" → Deploy. (The /exec URL stays the same.)
 *
 * Quick test:  open the /exec URL in a browser — you should see
 *   {"ok":true,"service":"agicl-contact-bridge"}
 */

var SHARED_TOKEN = 'REPLACE_WITH_A_LONG_RANDOM_STRING';
var RESUME_FOLDER_ID = ''; // e.g. '1AbCdEf...'; '' = store resumes in My Drive root

var TABS = {
  inquiry: {
    name: 'Inquiries',
    headers: ['Timestamp', 'Name', 'Email', 'Phone', 'Organization', 'Inquiry Type', 'Sector', 'Message'],
    row: function (d) {
      return [new Date(), d.name, d.email, d.phone, d.organization, d.inquiryType, d.sector, d.message];
    }
  },
  vendor: {
    name: 'Vendors',
    headers: ['Timestamp', 'Company Name', 'Contact Person', 'Email', 'Phone', 'Vendor Category', 'GST Number', 'Years in Operation', 'Message'],
    row: function (d) {
      return [new Date(), d.companyName, d.contactPerson, d.email, d.phone, d.vendorCategory, d.gstNumber, d.yearsInOperation, d.message];
    }
  },
  career: {
    name: 'Careers',
    headers: ['Timestamp', 'Name', 'Email', 'Phone', 'Position', 'Experience', 'Portfolio URL', 'Resume', 'Message'],
    row: function (d) {
      return [new Date(), d.name, d.email, d.phone, d.position, d.experience, d.portfolio, d.resumeUrl || '', d.message];
    }
  }
};

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000); // serialise appends so rows never collide

    var data = JSON.parse(e.postData.contents);

    if (String(data.token) !== SHARED_TOKEN) {
      return json({ ok: false, error: 'unauthorized' });
    }
    // Honeypot — real users never fill this hidden field.
    if (data.company_website) {
      return json({ ok: true, skipped: 'bot' });
    }

    var cfg = TABS[data.formType];
    if (!cfg) {
      return json({ ok: false, error: 'unknown formType: ' + data.formType });
    }

    if (data.formType === 'career' && data.resumeBase64) {
      data.resumeUrl = saveResume(data);
    }

    getSheet(cfg).appendRow(cfg.row(data));
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

function doGet() {
  return json({ ok: true, service: 'agicl-contact-bridge' });
}

function getSheet(cfg) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(cfg.name) || ss.insertSheet(cfg.name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(cfg.headers);
    sheet.getRange(1, 1, 1, cfg.headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function saveResume(d) {
  var bytes = Utilities.base64Decode(d.resumeBase64);
  var safeApplicant = d.name ? String(d.name).replace(/[^\w.\- ]+/g, '_') + ' - ' : '';
  var blob = Utilities.newBlob(bytes, d.resumeMimeType || 'application/octet-stream',
    safeApplicant + (d.resumeName || 'resume'));
  var folder = RESUME_FOLDER_ID ? DriveApp.getFolderById(RESUME_FOLDER_ID) : DriveApp.getRootFolder();
  var file = folder.createFile(blob);
  try {
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (ignore) {
    // Domain policy may block link-sharing; the file link still works for the owner.
  }
  return file.getUrl();
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
