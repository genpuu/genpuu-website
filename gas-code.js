function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.phone,
    data.category,
    data.message
  ]);

  var subject = "[HP問い合わせ] " + data.category + " - " + data.name;
  var body = "HPから新しいお問い合わせがありました。\n\n";
  body += "お名前: " + data.name + "\n";
  body += "メール: " + data.email + "\n";
  body += "電話番号: " + data.phone + "\n";
  body += "ご相談内容: " + data.category + "\n\n";
  body += "詳細:\n" + data.message;

  GmailApp.sendEmail("info@genpuu.com", subject, body);

  return ContentService
    .createTextOutput(JSON.stringify({result: "success"}))
    .setMimeType(ContentService.MimeType.JSON);
}
