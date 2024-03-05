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

