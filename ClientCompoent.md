### Client Component とは

- クライアント側でレンダリングされるコンポーネントのこと
    - JavaScriptによって、DOMが生成されレンダリングされる

- Next.js でクライアントコンポーネントを作成したい場合はコンポーネントファイルの先頭に 'use client' と記述する必要がある

```js
'use client';

const ClientComponent = () => {
    return <></>;
};

export default ClientComponent;
```

---

### クライアントコンポーネントの特徴

#### 制約

- クライアントで生成されるので、サーバーに置いてあるリソースに直でアクセスできない

- DB などからデータ取得はできなくもないらしいが、基本的にサーバーコンポーネントにやらせるべき
    - データ取得のためのライブラリを　js　バンドルに含まなくて済んだり、 API エンドポイントを経由する必要もなくなるなどのメリットがあるため

#### クライアントコンポーネントができること

基本的には、サバーコンポーネントができないことができる

- useState/useEffect など、コンポーネントの状態を管理するフックが使える

- onClick など、イベントリスナーのプロパティが使える

- window や document などのブラウザー専用 API が使える

---

### ハイドレーション (hydration) とは

#### 広義の意味でのハイドレーション
- サーバーから返ってきた html を画面に描画していき、インタラクティブな状態にするプロセスのこと

    - 大きな流れ
        1. サーバーから帰ってくる html にて、クライアントコンポーネントはプレースホルダーに置き換えられてる = html (1)

        2. 実際にクライアントでプレースホルダーを実際のクライアントコンポーネントに置き換える = html (2)

        3. この時、サーバーからの html (1) と クライアントでのhtml (2) を比較し、一致するかをチェックする  
        *実際には DOM だか React ツリーだかを比較するっぽい


        4. 上記のサーバー側で生成された html (1) にはイベントリスナーなどがまだ登録されていないので、その登録をする

#### 狭義の意味でのハイドレーション

- 上記の広義の意味でのハイドレーションの "4. サーバー側で生成された html に対してイベントリスナーの登録を行う" 部分を狭義の意味でのハイドレーションという

---

### ハイドレーションエラー

- クライアントサイドで生成された html と　クライアントサイドで再構築した html が一致しないことで起きるエラー  
*実際は html ではなく DOM か React Tree

<br>

例: クライアントコンポーネントでrandom関数の出力を p タグに埋め込んでいるとする

```ts
'use client';

export const ClientComponent = () => {
    const num = Math.random();
    return <p>{num}</p>;
}
```

サーバー側での ClientComponent の num と　クライアント側の再構築される際の ClentComponent の num が違う場合、ハイドレーションエラーが起こる

- ここでの疑問: **クライアントコンポーネントはサーバーでも実行されてる?**  
    答え: [実行されているっぽい](https://qiita.com/martini3oz/items/7c4e421e8f5174642d5f)

#### 解決策

Math.random() の実行を useStateの中で行うことで、ハイドレーションエラーが回避できる

<br>

```ts
'use client';
import { useState } 'react';

export const ClientComponent = () => {
    let num: number | null = null;
    useState(() => {
        num = Math.random();
    }, []);
    return <p>{num}</p>;
}
```

useStateはクライアントでのコンポーネントの描画後(狭義の意味でのハイドレーションの後)に実行される。よってサーバー側での html 生成時でも、クライアント側での再構築時でもuseStateの部分は実行はされない。

<br>

- ハイドレーションエラーについて参考にしたサイト
    - [7歳娘「パパ、ReactのHydration Errorってなんで起こるの？」](https://qiita.com/Yametaro/items/22cde58cd6abf577f1a4#参考文献)
    - [【Next.js】ハイドレーション & プリレンダリング / 簡単な例、考察を添えて。](https://zenn.dev/jordan23/articles/05b78f925d35ba)
