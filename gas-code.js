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

  try {
    MailApp.sendEmail("info@genpuu.com", "[HP問い合わせ] " + data.category + " - " + data.name, "HPから新しいお問い合わせがありました。\n\nお名前: " + data.name + "\nメール: " + data.email + "\n電話番号: " + data.phone + "\nご相談内容: " + data.category + "\n\n詳細:\n" + data.message);
  } catch(err) {
    sheet.appendRow(["メール送信エラー", err.toString()]);
  }

  return ContentService
    .createTextOutput(JSON.stringify({result: "success"}))
    .setMimeType(ContentService.MimeType.JSON);
}
