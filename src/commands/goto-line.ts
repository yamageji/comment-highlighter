import * as vscode from "vscode";

export class GotoLineCommand implements vscode.Command {
  command: string;
  title: string;

  constructor(id: string, title: string) {
    this.command = id;
    this.title = title;
  }

  // ファイル内のcharIdx文字目の文字が含まれる行にスクロール
  execute(charIdx: number) {
    // 現在エディタで編集中のファイル
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    // 現在見えている範囲（vscode.Rangeオブジェクト）
    const [visibleRange] = editor.visibleRanges;
    // 現在見えている範囲の最初の行の行番号
    const visibleStartLine = visibleRange.start.line + 1;
    // charIdx文字目の文字を含む行の行番号
    const targetLine = editor.document.positionAt(charIdx).line + 1;
    // Sticky Scrollで隠れてしまうことを防ぐため、エディタの上端から数行分は余裕を持たせる
    const offsetTop = 3;
    // 移動量
    const moveLines = targetLine - visibleStartLine - offsetTop;
    // スクロール移動が必要ない場合は、何もしない
    if (moveLines === 0) {
      return;
    }
    // 移動方向
    const direction = moveLines > 0 ? "down" : "up";

    // 組み込みのスクロールコマンドを実行
    vscode.commands.executeCommand("editorScroll", {
      to: direction,
      by: "line",
      value: Math.abs(moveLines),
    });
  }
}
