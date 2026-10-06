# DNA相補鎖

FASTA形式または素のDNA配列から、相補鎖・逆相補鎖を計算するスマホ向けPWAです。

## 特徴

- FASTA形式に対応
- 素のDNA配列に対応
- 改行・空白を自動除去
- A/T/G/C以外を検出
- 相補鎖（3′→5′）を表示
- 逆相補鎖（5′→3′）を表示
- 配列長、GC%、AT%を表示
- クリップボードへコピー
- 入力内容をブラウザのlocalStorageに保存
- Service Workerによるオフライン利用
- 外部API・サーバーへの配列送信なし

## GitHub Pages

GitHubリポジトリのルートにこのファイル一式を置き、
Settings → Pages → Deploy from a branch → main / root
を選択してください。

## Python

`dna_logic.py` は計算ロジックの基準実装です。
GitHub PagesではPythonをサーバー側で実行できないため、
公開版では同じロジックを `script.js` にJavaScriptとして実装しています。
