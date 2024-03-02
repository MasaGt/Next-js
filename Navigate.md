### ページ間遷移

- ページ間を遷移するために以下のようなものを利用できる
    - \<a\>タグ: HTMLタグ

    - \<Link\>コンポーネント: next/link パッケージが提供するコンポーネント

    - useRouter:next/router パッケージが提供するカスタムフック

---

### \<a\>タグ

- ページ遷移をすると、ページ全体の再読み込みが行われる

- 遷移先のパスは App routing で指定するように、 app 配下のディレクトリ構造 とマッピングされる

<br>

例: /about ページに /home へ遷移するボタンを配置する
```ts
// app/about/page.tsx
const Page = () => {
    return (
        <div>
            <a href="/home">Go to Home</a>
        </div>
    );
};

export default Page;
```

----

### \<Link\> コンポーネント

- ページ全体の再読み込みは行われない

- 対象コンポーネントの部分のみ更新が行われる

<br>

例: /about ページに /home へ遷移するボタンを配置する
```ts
// app/about/page.tsx
import Link from 'next.link';

const Page = () => {
    return (
        <div>
            <Link href="/home">Go to Home</Link>
        </div>
    );
};

export default Page;
```

- (<font color="red">**本番環境下のみ**</font>)　Link のリンク先のページ(コンポーネント)は　Linkコンポーネントがビューポート内に入った時点でバックグラウンドでリクエストされる  

     -> そのため、リンクをクリックしたら、素早くリンク先のページ(コンポーネント)の読み込みができる

---

### useRouter

- \<a\> タグや \<Link\>コンポーネントとは異な理、プログラムで別ページへの遷移をさせる仕組み

- useRouter はカスタムフックなので、Client Component でしか利用できない

<br>

例: /home のボタンを押下すると /about に遷移する

```ts
'use client';

import { useRouter } from 'next/router';

const Page = () => {

    const router = useRouter();

    const onClick = () => {
        router.push('/about');
    };

    return (
        <>
            <button onClick={onClick}>
                Go to About
            </button>
        </>
    );
};
```

<br>

- push(): 指定したパスへ遷移する

```
push(url, as, opitons)

- url: 遷移先のパス
- as: ブラウザの url バーに表示される文字およびUrlObject
- options: オブジェクトの形でオプションを渡す
    - scroll: 遷移後、ページをトップまでスクロールするか

    など
```

<br>

- replace(): 指定したパスへ遷移するが履歴スタックに遷移先ページを追加しないため、<font color="red">遷移後に戻るボタンを押しても戻れない</font>

```
replace(url, as, options)

- 引数は push() と同じ
```

<br>

- prefetch(): 指定したページのプリロードを行う。通常、コンポーネントの初期処理時にプリロードする時に使われるっぽい

```
prefetch(url, as, options)

- 引数 url と as は push() と同じ
- options
    - locale: 現在のロケールを利用する
```
* ロケールに関しては[こちら](https://zenn.dev/steelydylan/articles/nextjs-with-i18n)を参照

<br>

- pathname: 現在のパス名

