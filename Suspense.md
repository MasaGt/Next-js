### Suspense　とは

- SSR-Streaming を可能にしてくれる機能

---

### SSR-Stream の流れ

1. あるページ内のコンポーネントにて、外部からデータの取得を行なっている場合、そのコンポーネントはレンダリングを破棄する

2. レンダリングを破棄したコンポーネントの代わりに　Suspense が代わりのコンポーネントを提供する

3. Suspense から提供されたコンポーネントをもとにサーバー側で html をレンダリングする

4. サーバー側でレンダリングされた html がクライアントに返ってくる

5. 1でデータ取得をしていたコンポーネントのデータ取得が完了し次第、その部分の html をサーバー側でレンダリングする

6. クライアント側に5でレンダリングされた html が返ってくる

7. クライアント側にて、 js でSuspnseで提供されたコンポーネントと返ってきたコンポーネントを取り替える

---

### Suspense　の利用方法

- 時間のかかるデータを取得するコンポーネントを Suspense で囲む

- Suspnse は　'react' モジュールから提供されている

- Suspense の fallbackプロパティに代わりにレンダリングするコンポーネントを指定する

```ts
// Page.tsx
import { Suspense } from 'react';
import { PlaceholderCoponent } from 'PlaceholderCoponentのパス';
// TimeTakingComponent は　そのコンポーネントファイル内で重めの外部データの取得処理を行なっている
import { TimeTakingComponent } from 'TimeTakingComponentのパス';
import { OtherComponent } from 'OtherComponentのパス';

const Page = () => {
    return (
        <div>
            <Suspense fallback={<PlaceholderCoponent />}>
                <TimeTakingComponent />
            </Suspense>

            <OtherComponent />
        </div>
    );
}
export default Page;
```

---

### Suspense の boundary　を決める

- どの範囲をSuspenseで囲むかによってパフォーマンスが変化する

- どれの範囲を選択するかは、プロジェクトで共通のルールを決めたりするなどする(どれが正解とかはない)

<br>

例: 複数の動的コンポーネントを一つの Suspense で囲む

- Suspense で囲まれた全ての動的コンポーネントのデータ取得が終わるまで、Suspense で囲まれた部分は描画されない

```ts
// Page.tsx
const Page = () => {
    return (
        <>
            <Suspense
                fallback={<Placeholder />}
            >
                <DataFetchComponent1 />
                <DataFetchComponent2 />
                <DataFetchComponent3 />
            </Suspense>
        </>
    );
};
export default Page;
```

<br>

例: 各々の動的コンポーネントを Suspense で囲む

- データ取得が完了したコンポーネントから描画されていく

```ts
// Page.tsx
const Page = () => {
    return (
        <>
            <Suspense
                fallback={<Placeholder />}
            >
                <DataFetchComponent1 />
            </Suspense>

            <Suspense
                fallback={<Placeholder />}
            >
                <DataFetchComponent2 />
            </Suspense>

            <Suspense
                fallback={<Placeholder />}
            >
                <DataFetchComponent3 />
            </Suspense>
        </>
    );
};
export default Page;
```

<br>

例: ページ全体を Suspense で囲む

- 全ての動的コンポーネントのデータ取得が完了するまで、描画が始まらない (fallback を除いて)

```ts
// Page.tsx
const Page = () => {
    return (
        <>
            <Suspense
                fallback={<Placeholder />}
            >
                <StaticComponent1 />
                <DataFetchComponent1 />
                <DataFetchComponent2 />
                <DataFetchComponent3 />
                <StaticComponent2 />
            </Suspense>
        </>
    );
};
export default Page;
```