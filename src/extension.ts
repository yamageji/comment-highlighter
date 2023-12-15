import * as vscode from "vscode";
import { Highlighter } from "./highlighter";

// package.jsonのnameフィールドに指定した拡張機能ID
const EXTENSION_ID = "comment-highlighter";

// 機能を実行する対象ファイル
const TARGET_LANGUAGE = ["markdown", "javascript", "typescript", "mdx"];
// 対象ファイルかどうかを判定する関数
const isTargetFile = (editor: vscode.TextEditor) =>
  TARGET_LANGUAGE.includes(editor.document.languageId);

export function activate(context: vscode.ExtensionContext) {
  // comment-highlighter拡張機能の全機能を初期化する
  const highlighter = new Highlighter(EXTENSION_ID);

  // 現在エディタで編集中のファイルを取得
  const activeEditor = vscode.window.activeTextEditor;

  // 拡張機能が有効化された時点でファイルを開いていれば
  if (activeEditor && isTargetFile(activeEditor)) {
    highlighter.updateView(activeEditor);
  }

  context.subscriptions.push(
    // 独自コマンドをVS Codeに登録
    highlighter.registerCommand(),

    // 別なファイルを編集し始めたら or 編集中のファイルを閉じたら
    vscode.window.onDidChangeActiveTextEditor((activeEditor) => {
      // 編集中のファイルを閉じた場合は何もしない
      if (!activeEditor) {
        return;
      }
      // 実行対象ファイルでなければ何もしない
      if (!isTargetFile(activeEditor)) {
        return;
      }
      // ハイライトなどの表示を更新
      highlighter.updateView(activeEditor);
    }),

    // ファイルのテキストが変更されたら
    vscode.workspace.onDidChangeTextDocument((event) => {
      // 現在エディタで編集中のファイルを取得
      const activeEditor = vscode.window.activeTextEditor;
      // エディタでファイルを開いていなかったら何もしない
      if (!activeEditor) {
        return;
      }
      // 実行対象ファイルでなければ何もしない
      if (!isTargetFile(activeEditor)) {
        return;
      }
      // 変更イベントが発生したファイルが現在編集中のファイルであれば
      if (event.document.uri === activeEditor.document.uri) {
        // ハイライトなどの表示を更新
        highlighter.updateView(activeEditor);
      }
    })
  );

  // ユーザー設定が変更されたら
  vscode.workspace.onDidChangeConfiguration((event) => {
    // 変更されたのがcomment-highlighter拡張機能に関する設定であれば
    if (event.affectsConfiguration(EXTENSION_ID)) {
      // 拡張機能の動作に新たな設定を反映
      highlighter.updateConfig();
    }
  });
}

// This method is called when your extension is deactivated
export function deactivate() {}
