# Google Apps Script セットアップ手順

## 手順

1. スプレッドシートを開く: https://docs.google.com/spreadsheets/d/1iQ-mMxsFwcNtSzGiLyYQUD1vSXPbjPTRSwijQQG-P1s/edit

2. メニューから「拡張機能」→「Apps Script」を開く

3. エディタに以下のコードを貼り付ける（既存のコードは全て消してから）:

```javascript
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

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. 「デプロイ」→「新しいデプロイ」をクリック
5. 種類の横の歯車アイコン →「ウェブアプリ」を選択
6. 設定:
   - 説明: HP問い合わせ
   - 次のユーザーとして実行: 自分
   - アクセスできるユーザー: **全員**
7. 「デプロイ」をクリック
8. 表示されたウェブアプリのURLをコピー

そのURLをここに貼ってください。
