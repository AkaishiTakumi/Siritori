# jig.jp サマーインターンシップ 選考課題 撰 咲汰

## 実装した機能やデザインの詳細な説明
### 実装した機能
- スタートボタンをクリックすると、スタートボタンがリセットボタンに変化し、 `過去に使用した単語` , `ひとつ前の単語は しりとり です` ,テキストボックス,決定ボタンが表示され、しりとりが開始する
- しりとりが終了するとリセットボタンがスタートボタンに変化する
- 直前の単語を、表示できるようにする
    - `ひとつ前の単語は XXXX です` で直前の単語を確認できる
- 任意の単語を、入力できるようにする
    - テキストボックスを選択時、決定ボタンをクリック、または、EnterKeyを押すと、直前の単語の末尾と、入力した単語の先頭を比較する
- 直前の単語の末尾と、入力した単語の先頭を比較して、同じ場合だけ単語を更新する。違う場合は、エラーを表示する
    - 違う場合は、 `ひとつ前の単語の末尾と入力した単語の先頭が一致しません` というエラーを表示する
- 末尾が「ん」で終わる単語が入力されたら、ゲームを終了する
    - 末尾が「ん」で終わる単語が入力されると `入力した単語の末尾が'ん'でした ゲームを終了します` が表示されしりとりが終了する
- 過去に使用した単語が入力されたら、ゲームを終了する
    - 過去に使用した単語が入力されたら、  `過去に使用した単語が入力されました ゲームを終了します` というエラーを表示する
- ゲーム中や終了後に、最初からやり直せるリセット機能をつける
    - ゲーム中や終了後に、リセットボタンをクリックすると最初の文字が `しりとり` になり、過去に使用した単語が `しりとり` のみになる
- 一文字のものは入力できないようにする
    - 一文字のものを入力すると `入力が一文字だけでした 文字数を増やしてください` というエラーを表示する
- ひらがな以外は入力できないようにする
    - ひらがな以外を入力すると `ひらがな以外が入力されました` というエラーを表示する
- しりとりの単語の履歴を表示できるようにする
    - しりとりの単語の履歴は、 `過去に使用した単語` で確認できる
    - `過去に使用した単語` の中の単語が多くなると横にスクロールできるようになる
### デザイン
- 背景を薄い青に設定
- 直前の単語を少し大きくなるように設定
- スマホで開くと全体の文字が大きくなるように設定

## アプリの動作確認の方法（WebサイトのURLや、セットアップを含めたアプリケーションの実行手順等）
[https://akaishitakumi.github.io/Siritori/](https://akaishitakumi.github.io/Siritori/) を開く

## 参考にしたWebサイト
- [viteでReact×TypeScript環境を爆速で作る最小版 #React - Qiita](https://qiita.com/teradonburi/items/fcdd900adb069811bfda)
- [Reactでいいねボタンを作ろう | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/tutorials/react-like-button-tutorial)
- [CSSでテキスト選択をできないようにする | cly7796.net](https://cly7796.net/blog/css/disable-text-selection-in-css/)
- [consoleオブジェクトの種類 #JavaScript - Qiita](https://qiita.com/tacopic-007/items/d6fabf55f24b30430bf6)
- [ReactのuseStateでテキストボックスの値を取得・利用する方法 | 完全独学React](https://yuya-blog.net/react/reactのusestateでテキストボックスの値を取得・利用する)
- [Typescriptでinputフォームの値を取得する #React - Qiita](https://qiita.com/bell_007/items/c0b30d39a45a3b4e6a3a)
- [[React] inputにフォーカスしてる時にEnterキー押下で送信する](https://zenn.dev/takky94/articles/f3096bb59761ee)
- [JavaScript / TypeScript 文字列操作まとめ](https://zenn.dev/mkosakana/articles/87d584e87a18b7)
- [【C言語】AVL 木（平衡２分探索木）の解説と実装 | だえうホームページ](https://daeudaeu.com/avl_tree/#AVL-3)
- [TypeScriptでよく見る「？」「！」と仲良くしたい](https://zenn.dev/oreo2990/articles/3d780560c5e552)
- [https://future-architect.github.io/typescript-guide/exception.html](https://future-architect.github.io/typescript-guide/exception.html)
- [undefinedとnullの違い | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/values-types-variables/undefined-vs-null)
- [【ゼロパディング】`001`のように数値の桁を合わせる](https://zenn.dev/communitio/articles/js-zero-padding)
- [JavaScriptプログラミング講座【文字列について（String）】](https://hakuhin.jp/js/string.html)
- [TypeScript で配列をループする簡単な3つの方法を紹介](https://gizanbeak.com/post/typescript-loop)
- [JavaScriptで平仮名(ひらがな)を判定する #Unicode - Qiita](https://qiita.com/thzking/items/f07633e0ee9145a85ace)
- [【TypeScript】真偽を示すもの - 株式会社アイサット](https://www.aisatt.co.jp/developer-20221219/)
- [Next.jsで猫画像ジェネレーターを作ろう | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/tutorials/nextjs)
- [TypeScriptでビット演算をマスターする！15の実践的サンプルコード – Japanシーモア](https://jp-seemore.com/web/13742/#toc12)
- [CSS の値と単位 - ウェブ開発の学習 | MDN](https://developer.mozilla.org/ja/docs/Learn_web_development/Core/Styling_basics/Values_and_units)
- [background - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/background)
- [CSS/JavaScript、スクロールの禁止と解除。](https://fuuno.net/web02/interrupt_scroll/interrupt_scroll.html)
- [reactでのwheel eventの扱い](https://zenn.dev/yamakyu/scraps/b5e3a16fa13b58)
- [CSSで画面サイズに合わせるための最新テクニック！レイアウト崩れ対策も | プログラミングスクールおすすめランキング｜MeglioFuturo](https://megliofuturo.co.jp/media/css-responsive-screen-size/#index_id2)
- [@media - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/@media)
- [ASCII.jp：CSS初学者がきちんと理解したい、marginとpaddingとborderの複雑な関係](https://ascii.jp/elem/000/001/487/1487634/)
- [ルート要素のフォントサイズを20pxにするには？ | プログラミング学習サイト【侍テラコヤ】](https://terakoya.sejuku.net/question/detail/32234)
- [width - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/width)
- [<span>: コンテンツ区間要素 - HTML | MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/span)
- [【CSS】@mediaや@supportsなど、@規則と呼ばれる記述について知ろう｜クリエイターブログ｜東京都新宿区のWeb制作会社 - ウェブラボ](https://www.weblab.co.jp/blog/creator/14626.html#i-2)
- [React＋ViteをGithub Actionsでデプロイするまで｜Miruko Wakashita](https://note.com/_little_en_grey_/n/n309d18cfc090)
- [vite x React x TypeScript でgithub pages にデプロイする - y-ohgi's blog](https://y-ohgi.blog/entry/2021/08/11/vite_x_React_x_TypeScript_でgithub_pages_にデプロイする)
- [y-ohgi/y-ohgi.github.io](https://github.com/y-ohgi/y-ohgi.github.io/tree/main)
- [GitHub Actionsが動かない？トリガーの設定ミスをチェックしよう | 前菜の備忘録](https://t-salad.com/github-actions-trigger-fail/)


## AIを使用したところ
- `Microsoft Copilot`を、TypeScriptの環境開発時の、エラー修正のために使用した
- `GitHub Copilot`を、デプロイの設定ファイルを、エラー修正のために使用した
- `GitHub Copilot`を、App.tsxを記述するとき、コード補完のために使用した