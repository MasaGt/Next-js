### Next.js でのカスタムフォントの利用

- next/font モジュールを利用することで、必要なフォントファイルを実行/ビルド時にダウンロードし、静的アセットに含める  
    -> よって、ページ表示時にフォントへのインターネットアクセスは発生しないため、ページ表示が早くなる

---

### next/font の利用方法

- google font を利用する例
    - next/font/google から利用したいフォント関数をインポート
    - フォント関数を呼び出す際に利用したいオプションを指定
    - フォント関数からの戻り値のオプジェクトを利用して、フォントを適用する  
        (他の方法もあり)

- フォントの適用方法
    1. className プロパティを className 属性に指定する
    2. styleプロパティを style 属性に指定する 
    3. CSS variable で利用する

---

### className プロパティおよび style プロパティを利用する方法
```jsx
// MyComponent.jsx
import { font_name } from 'next/font/google'

const font_obj = font_name({ options });

export cnost MyComponent = () => {
    return (
        <>
            <div className={font_obj.className}>
            classNameでフォント適用
            </div>

            <div style={font_obj.style}>
            styleでfont適用
            </div>
        </>
    );
}
```

<br>

- 実際の利用例
    - 今回はフォントの定義を font.ts(js)に集約し、利用する場合は、そのファイルをインポートするようにした

```js
// font.(t|j)s

// Inter というフォントを利用する
import { Inter }　from 'next/font/google';

// Interフォントの定義
export const inter = Inter({
    subset: ['latin']
});
```

```js
// MyComponent.js

import { inter } from 'font.(t|j)sのパス';

export const MyComponent = () => {
    return (
        <p className={inter.className}>
            This is MyComponent!
        </p>
    );
}
```

---

### css ファイルにて css variable で利用する方法

- フォントの定義ファイルにて使用するフォント関数を利用して定義を行う

- フォント関数を呼ぶ際に variable オプションを指定し、　css 側で利用できるように css 変数名を指定する

```ts
import { Inter } from 'next/font/google';

export const inter = Inter({
    variable: '--font-inter';
});
```

<br>

- css 側で変数名を参照し、 font-family の値を指定する

```css
/* style.css */
.selector {
    font-family: var(--font-inter);
    /* そのほかのスタイルの指定もできる */
    font-weight: 200;
    font-style: italic;
}
```

<br>

- フォントを利用するコンポーネントにて、フォントの定義ファイルおよび css ファイルをインポートする

- フォントを適用する要素の<font color="red">親要素の className 属性</font>に　font-module.variable を指定する

- フォントを適用したい要素の className 属性に　cssM-module.セレクタ を指定する

```js
// MyComponent.jsx

// フォントの定義ファイルおよびcssファイルをインポートする
import { inter } from 'font.(t|j)sのパス';
import styles from 'style.cssのパス';

export const MyModule = () => {
    return (

        {// 親要素のclassNameにfont-module.variableを設定する}
        <div className={inter.variable}>

            {// 対象要素のclassNameにcss-module.セレクタを指定する}
            <div className={styles.selector}>
                カスタムフォントが適用される要素
            </div>
        </div>
    );
}
```

<br>

- フォント関数に渡すオプションについては[こちら](https://ja.next-community-docs.dev/docs/app-router/api-reference/components/font)を参照

---

### サブセット化 (subsetting) とは

- 指定したスタイルの中で、使用する文字を指定してダウンロード/アクセスすること 

*next/font/google のフォント関数に渡すオプションの subsets はまた違う意味合いを持つ

->

---

### ローカルフォントとは

- ローカルにインストールされているフォントファイルをカスタムフォントとして利用すること

- 基本的にグーグルフォントの利用方法と変わらないが、以下の特徴がある
    - import 元は 'next/font.local'
    - フォント関数の呼び出しの際には src オプションでローカルフォントファイルのパスを指定しなければならない


<br>

```js
// MyComponent.jsx

// フォント関数のインポート元はnext/font/local
import localFont from 'next/font/local';

// src オプションでフォントファイルのパスを指定
const local = localFont({
    src: "フォントファイルのパス"
});

export const MyComponent = () => {
    return (
        <div className={local.classNames}>
            フォントが適用される要素
        </div>
    );
}
```