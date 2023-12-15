import * as vscode from "vscode";

// updateメソッドの引数を、コマンドに渡す引数として加工する関数の型
type PickCommandArgs = (matches: RegExpMatchArray[]) => unknown[];

export class HighlightCountView {
  private _statusBarItem: vscode.StatusBarItem;
  private _warningBackground: vscode.ThemeColor;
  private _command: vscode.Command;
  // updateメソッドの引数から、コマンドに渡す引数を取得する関数
  private _pickCommandArgs: PickCommandArgs;

  // 必要なインスタンスは初期化時に生成
  constructor(command: vscode.Command, pickCommandArgs: PickCommandArgs) {
    // ステータスバーアイテムをインスタンス化
    this._statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right
    );
    this._warningBackground = new vscode.ThemeColor(
      "statusBarItem.warningBackground"
    );
    this._command = command;
    this._pickCommandArgs = pickCommandArgs;
  }

  // ステータスバーのハイライトカウント表示を更新するメソッド
  update(matches: RegExpMatchArray[]) {
    // ハイライト対象の数をカウント
    const count = matches.length;
    // ステータスバーアイテムとして表示するテキスト
    // $(checklist)はアイコン
    const text = `$(checklist) FIXME: ${count}`;

    if (count > 0) {
      // 1件以上あれば
      // 背景を警告色にする
      this._statusBarItem.backgroundColor = this._warningBackground;
      // コマンドを登録
      this._statusBarItem.command = {
        ...this._command,
        arguments: this._pickCommandArgs(matches),
      };
      // コマンド名をツールチップとして表示
      this._statusBarItem.tooltip = this._command.title;
    } else {
      // 0件なら背景をデフォルトの色に戻す
      this._statusBarItem.backgroundColor = undefined;
      // 0件ならコマンドを無効化
      this._statusBarItem.command = undefined;
      // 0件ならツールチップを消す
      this._statusBarItem.tooltip = undefined;
    }

    // ステータスバーアイテムのテキストを設定
    this._statusBarItem.text = text;
    // ステータスバーアイテムを表示
    this._statusBarItem.show();
  }
}
