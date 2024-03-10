### ページ内で発生したエラーのハンドリング方法

- エラーが発生する可能性のあるセグメント(パス)に error ファイルを配置する

    - error ファイルとは　エラーをキャッチして代わりに表示されるフォールバック UI

<br>

- error ファイルを配置すると、そのセグメントの page タグを React Error Boundary でラップするイメージ

    - React Error Boundaryについては[こちら](#ErrorBoundary)

    ```
    - errorファイルを app/blog/ に配置してみる

    app
        |- blog
            |- layout.tsx
            |- page.tsx
            |- error.tsx

    - blog/ のページの構造は以下のイメージ

    <Layout>
        <ErrorBoundary>
            <Page />
        </ErrorBoundary>
    </Layout>
    ```

<br>

- 上記のページ構造にイメージ図より、<font color="red"> error ファイルの同階層にある layout もしくは template で発生するエラーはキャッチできない</font> (ErrorBoundary がラップするのは Page だから)

    - さらに上の階層に error ファイルを配置すれば layout/template で発生するエラーをキャッチできる

---

### Next.js での error ファイルの利用方法

```
プロジェクトのディレクトリ構成(例)

app
    |- blog
        |- layout.tsx
        |- page.tsx
        |- error.tsx

blog/~~ blog/~~/~~ などでエラーが発生した場合、
代わりに app/blog/error.tsx コンポーネントが代わりに表示される
```

- error.tsx は <font color="red">Client Component</font> なので ファイルの先頭に 'use client' をつける

- error.tsx は以下のプロパティを持つオブジェクトを引数として受け取ることができる

    - {error: Error, reset: () => void}

        - error: thorw されたエラー情報を持つオブジェクト

        - reset: error.tsx が配置されているセグメントのページを再レンダリングする関数

<br>

```ts
// app/blog/error.tsx
'use client';

export default function ErrorFallback({
    error,
    next
},{
    error: Error,
    next: () => void
}) {
    return (
        <>
            <p>Error Occured</p>

            <p>{error.message}</p>

            <button onClick={next}>try again</button>
        </>
    );
}
```

---

### global-error ファイル

- error ファイルは同階層の layout/template ファイルで発生したエラーはキャッチできない

    - よって、ルートのレイアウトのエラーは error ファイルではキャッチできない

    ```
    app
        |- layout.tsx
        |- page.tsx
        | error.tsx


    - / のページの構造としては以下の通り

    <Layout>
        <ErrorBoundary>
            <Page />
        </ErrorBoundary>
    </Layout>
    ```

<br>

- ルートの layout/template で発生するエラーをキャッチしたい場合、 app 配下に global-error ファイルを配置する

    - アプリ全体を ErrorBaundary でラップするようになる

    ```
    app
        |- layout.tsx
        |- page.tsx
        |- gobal-error.tsx
    ```

<br>

- global-error がアプリ全体をラップするため、 <font color="red">global-error ファイルに html タグと body タグを含める必要がある</font>

```ts
// gobal-error.tsx
export default function({
    error,
    reset
}, {
    error: Error,
    reset: () => void
}) {

    return (
        <html>
            <body>
                <p>{error.message}</p>
                <button onClick={reset}>retry</button>
            </body>
        </html>
    );
}
```


---

### 404 Not Found Error

- 404 を発生させる方法

    - 'next/navigation' が提供している notFound 関数を利用する

    ```ts
    import { notFound } from 'next/navigation';

    notFound(); // invoke 404 error
    ```

- app の直下に not-found ファイルを作成すると、アプリのどこで 404 エラーが発生しても not-found が表示されるようにできる

    - エラーが発生したセグメント (URL) に　error ファイルが配置されている場合、 そちらが優先されて表示される

```
app
    |- not-found.tsx
    |- blog
        |- not-found.tsx
        |- page.tsx
    |- recepi
        |- page.tsx
    |- other
        |- error.tsx
        |- page.tsx

- /blog/~~ で 404エラーが発生した場合
  -> app/blog/not-found.tsx が表示されるs

- recepi/~~ で 404エラーが発生した場合
  -> app/not-found.tsx が表示される

- other/~~ で 404エラーが発生した場合
  -> app/other/error.tsx が表示される
```

----
<div id="ErrorBoundary"></div>

### React Error Boundary とは

- Error Boundary でラップしたコンポーネントで発生したエラーをキャッチする仕組み

- Next.js ではすでに組み込まれているため、別途インストールする必要はない

    - 以下は普通の React プロジェクトで利用するための準備
    
        - react-error-boundary をインストールする
        ```bash
        npm install react-error-boundary
        ```

#### 利用方法

- エラーが発生した際に代わりに表示するコンポーネントを準備する

- エラー発生時に表示されるコンポーネントは引数にエラー情報が渡ってくる

```ts
// ErrorFallBack.tsx
export default function ErrorFallBack ({ error }: FallbackProps) => {
    return (
        <p>{error.message}</p>
    );
}
```

<br>

- エラーが発生する可能性のあるコンポーネントを　ErrorBoundary コンポーネントでくくる

    - FallbackComponent 属性に、fallback 時に表示するおコンポーネントを渡す

```ts
// infoPage.tsx
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallBack from 'ErrorFallBack.tsxのパス';
import OtherComponent from 'OtherComponentのパス';

export default function() => {
    return (
        <>
            {// OtherComponent内でエラーが発生した場合、代わりにErrorFallBackが表示される}
            <ErrorFallBack FallbackComponent={<ErrorFallBack />}>
                <OtherComponent />
            </ErrorFallBack>
        </>
    );
}
```

---
