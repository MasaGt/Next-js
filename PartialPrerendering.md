### Partial Prerendering とは

- Next14 で experimental feature として導入された機能

- ビルド時にページを静的 html として生成する
    - Suspense で囲まれた部分は fallback で指定された静的コンポーネントに置き換えられる
    - Suspense で囲まれた動的コンポーネントが準備できたら、サーバー側でその html を作成し streamimng する

---

### Next13 での SSR-Streaming と Next14 の Pre-rendering との違い

- html 生成のタイミング

    - SSR-Streaming
        - ページの html 作成タイミングはクライアントがアクセスした時に作成される
        - イメージ的には(名前の通り) SSR + Streaming
    
    - Pre-rendering
        - ページの html 作成タイミングはビルド時
        - イメージ的には　SSG + Streaming

- 疑問: Next13 でも、ルートコンポーネントは Server Component であり、Server Component のデフォルトのレンダリング方式は SSG

    -> Next13 でも　ページの html 作成のタイミングはビルド時では?

- 答え: ページ内で動的コンポーネント(コンポーネント内で外部データの取得などをするコンポーネント)が検出された場合、<font color="red">ページ全体が動的なレンダリング(SSR)となる</font>

    よって、 SSR-Streaming と Partial Pre-rendering の違いはページ全体の html ファイルがどのタイミングで生成されるかというもの

[参考ページ](https://zenn.dev/sinhalite/articles/aa343f6d52c8b4)

---

### Partial Pre-rendering の利用方法

- next の設定ファイルに ppr: true を追加する

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    // これを追加
    ppr: true,
};

module.exports = nextConfig;
```

<br>

- あとは、Suspense で動的コンポーネントを括れば、ページ全体が SSR でレンダリングされるのではなく、 SSG でレンダリングされる。