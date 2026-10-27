// 玄風HP 問い合わせ受付（2026-10-27 セキュリティ修正版）
// 修正点: ①数式インジェクション対策（=,+,-,@ 始まりを文字列化）②文字数上限
//         ③連投対策（1時間あたり30件まで受付・超過分は記録も通知もしない）④件名の改行除去
var MAX_LEN = { name: 100, email: 200, phone: 50, category: 100, message: 5000 };
var HOURLY_LIMIT = 30;

function clean_(v, max) {
  var s = String(v == null ? '' : v).slice(0, max);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; // シートで数式として実行させない
  return s;
}

function doPost(e) {
  var cache = CacheService.getScriptCache();
  var count = Number(cache.get('contact_count') || 0);
  if (count >= HOURLY_LIMIT) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: "busy" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  cache.put('contact_count', String(count + 1), 3600);

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = {};
  try { data = JSON.parse(e.postData.contents) || {}; } catch (err) { data = {}; }

  var d = {};
  for (var k in MAX_LEN) d[k] = clean_(data[k], MAX_LEN[k]);

  sheet.appendRow([new Date(), d.name, d.email, d.phone, d.category, d.message]);

  try {
    var subj = ("[HP問い合わせ] " + d.category + " - " + d.name).replace(/[\r\n]+/g, ' ');
    MailApp.sendEmail("info@genpuu.com", subj, "HPから新しいお問い合わせがありました。\n\nお名前: " + d.name + "\nメール: " + d.email + "\n電話番号: " + d.phone + "\nご相談内容: " + d.category + "\n\n詳細:\n" + d.message);
  } catch (err) {
    sheet.appendRow(["メール送信エラー", err.toString()]);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
