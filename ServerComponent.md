### Server Component とは

- (実際は違うが) イメージとしては、サーバー側でレンダリングされ、 html レスポンスとして返ってくるコンポーネント

- Next.js はデフォルトでサーバーコンポーネントになる

---

### サーバーコンポーネントの特徴

#### 制約

- サーバー側でレンダリングされて返ってくるので、useState や useEffect などのコンポーネントの状態に関するフックは使えない

- onClick などのイベントリスナープロパティは使えない

- DOM など、ブラウザ専用のAPIは使えない
    - window.~
    - document.createElement  
    など

<br>

#### サーバーコンポーネントができること

- サーバーコンポーネントは、直接DBなどを叩ける

    - ノーマルの React でDBアクセスしたければ、 Node.js などで API エンドポイントを立てて、それ経由でデータを取得するの

    - しかし、サーバーコンポーネントはそのコンポーネントから DB にアクセスしデータ取得 & 取得したデータを元に html 作成までできる

---

### SSR (Server Side rendering) との違い

- SC はサーバーでhtmlファイルに変換されるわけではなく、json文字列になり、 httpsレスポンスでクライアントに返される

- SSR はサーバーでhtmlファイルを生成する

- Next.js は SC がサーバーで json文字列になったものを html　に生成し直してるっぽい
    - [こちらを参照](https://zenn.dev/noko_noko/articles/7987456909978c#ssr-と-react-server-components-の相違点)