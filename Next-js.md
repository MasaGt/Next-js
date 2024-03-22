### Next.js とは

- React のフレームワーク

- Next.js でできること
    - React はクライアントサイトレンダリング (CSR) しかできない

    - 一方で、 Next.js は CSR だけではなく、サーバーサイドレンダリング (SSR) や静的
    サイト生成 (SSG) ができる

    - ファイルベースのルーティング機能
        - ディレクトリの構造が URL のルーティングに反映される仕組み

    - 画像の最適化機能
        - 画像を自動で圧縮
        - 画像の遅延読み込み ( Lazy Loadnig )

    - コードの自動分割
        - (おそらく) 最終的にソースコードがバンドルされても、ユーザーがリクエストしたページに必要な部分だけを読み込むことで、ページの表示速度を上げる... という理解 

---

### 延読み込み ( Lazy Loadnig ) とは

- 通常 web ページを読み込む際は、そのページで使用される画像を一度に全て読み込む  

    -> 全ての画像が読み込まれるまで、他の要素の描画が止まる

- よって、表示領域内 (画面)　で表示される画像だけを都度読み込むようにすることで、ページの表示速度を上げる仕組みが遅延読み込み

---

### Next.js と Nuxt.js の違い

- Next.js
    - React ベースのフレームワーク

- Nuxt.js
    - Vue.js ベースのフレームワーク

---

### Next.js の環境構築

- React のプロジェクト作成の時のように npx コマンドを叩く

```bash
npx create-next-app <app_name>

# typescriptベースのプロジェクトを作成したい場合
npx create-next-app <app_name> --typescript
```

---

### サーバーの起動

- Next.js プロジェクトを作成した時にインストールされる next モジュールに開発サーバーを立てる機能がついている

- package.json の scripts 項目を見ると　dev　で開発サーバーを起動できることがわかる

```json
  "scripts": {
    "build": "next build",
    // ↓これ
    "dev": "next dev",
    "prettier": "prettier --write --ignore-unknown .",
    "prettier:check": "prettier --check --ignore-unknown .",
    "start": "next start"
  },
```

```bash
# 開発サーバー起動
npm run dev
```

- サーバー起動後はポート3000でアクセスを受け付ける