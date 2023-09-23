import * as vscode from "vscode";
// 機能を実行する対象ファイル
const TARGET_LANGUAGE = ["markdown", "javascript", "typescript", "mdx"];
// 対象ファイルかどうかを判定する関数
const isTargetLanguage = (editor: vscode.TextEditor) =>
  TARGET_LANGUAGE.includes(editor.document.languageId);

export function activate(context: vscode.ExtensionContext) {
  // 現在エディタで編集中のファイルを取得
  const activeEditor = vscode.window.activeTextEditor;

  // 拡張機能が有効化された時点でファイルを開いていれば
  if (activeEditor) {
    // todo: ハイライトを更新
  }

  context.subscriptions.push(
    // 別なファイルを編集し始めたら or 編集中のファイルを閉じたら
    vscode.window.onDidChangeActiveTextEditor((activeEditor) => {
      // 編集中のファイルを閉じた場合は何もしない
      if (!activeEditor) {
        return;
      }
      // todo: ハイライトを更新
    }),
    // ファイルのテキストが変更されたら
    vscode.workspace.onDidChangeTextDocument((event) => {
      // 現在エディタで編集中のファイルを取得
      const activeEditor = vscode.window.activeTextEditor;
      // エディタでファイルを開いていなかったら何もしない
      if (!activeEditor) {
        return;
      }
      // 更新イベントが発生したファイルが現在編集中のふぁいるであれば
      if (event.document.uri === activeEditor.document.uri) {
        // todo: ハイライトを更新
      }
    })
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
