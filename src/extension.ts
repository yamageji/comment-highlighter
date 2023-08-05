import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((activeEditor) => {
      // 編集中のファイルを閉じた場合は何もしない
      if (!activeEditor) {
        return;
      }
      // todo: ハイライトを更新
    }),
    // ファイルのテキストが変更されたら
    vscode.workspace.onDidChangeTextDocument((event) => {
      // todo: ハイライトを更新
    })
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
