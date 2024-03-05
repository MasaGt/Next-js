### Pre Rendering とは

- Next.js はページ (html) を事前に生成しておく。このことを Pre-renderingと呼ぶ
    - 生成のタイミングはレンダリング方法によって異なる(SSRやSSGなど)

- Next.js は Pre-rendering に以下の2つの方法を利用している
    - [Static Rendering (SSG)](#ssg)
    - [Dynamic Rendering (SSR)](#ssr)

---
<div id="ssg"></div>

### Static Rendering (静的レンダリング) とは

- SSG (Static Site Generator) のこと
    - 詳しくは[こちらを参照](https://github.com/MasaGt/react/blob/main/Rendering.md)

- 以下のようなケースで利用が推奨されている
    - 外部からデータを取得しないページ
    - どのユーザー関係なく、同一の情報(情報の更新頻度が少ない)を表示するページ

- <font color="red">Next.js において、デフォルトでは static rendering でプリレンダリングされる</font>
    - しかし、基本的に開発者が意識してどのレンダリング方法をとるかを意識しなくてもいいように、以下の方法でレンダリング方法が Next によって決められている
        - Server Component のデフォルトのレンダリング方法 -> SSG
        - 対象コンポーネントが html リクエストから情報を取得するメソッドを使用している場合 -> SSR
        - 対象コンポーネントがデータを取得する際にキャッシュしないよう指定している場合 -> SSR

        

---
<div id="ssr"></div>

### Dynamic Rendering (動的レンダリング) とは

- SSR (Server Side Rendering) のこと
     - 詳しくは[こちらを参照](https://github.com/MasaGt/react/blob/main/Rendering.md)

- 以下のようなケースで利用が推奨されている
    - 表示するデータの更新頻度が高いページ
    - ユーザーごとに表示される内容が異なるページ

---

### SSR でレンダリングするように　サーバーコンポーネントを作成する

- npm/cache モジュールから、unstable_noStoreという関数をインポートし、コンポーネントの中で呼び出す

```ts
// server component that will be rendered by SSR

import { unstable_noStore as noStore } from 'next/cache';

const ServerComponent = () => {
    noStore();
    return <></>;
}

export default ServerComponent;
```

---

### SSR-Streaming とは

- 従来の SSR ではリクエストされたページ内の複数のうち1つのコンポーネントでもデータ取得の際に時間がかかると、 html の生成が遅れ、結果としてクライアント側でwebページの表示に時間がかかってしまう

- SSR-Streaming では以下を可能にした

    - 各々のコンポーネントについて、データ取得が完了したものから各々の html を作成しクライアントに返す

    - 返ってきた html からハイドレーションを行う

- もっと具体的なことやSSR-Streamingの利用方法などは[こちらを参照](./Suspense.md)