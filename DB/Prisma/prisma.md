### Prisma とは

- Node.js で書かれたライブラリ

- JS/TS で作成するアプリで利用できるORM

- Next.js 意外にも、 Express や　NestJS など他のフレームワークでも利用できる

---

### インストール

- 必要なモジュール
    - @prisma/client: アプリ側でデータベースとやり取りをするためのライブラリ

    - prisma: Prisma schemaファイル作成に必要な CLI ツール

    ```bash
    npm install @prisma/client
    npm install -D prisma
    ```

---

### Prisma schema ファイルの作成

- Prisma を利用するためは必ず必要なファイル

- prisma cli で作成する設定ファイル

- DB の接続情報や、マッピングするオブジェクトの定義などを書く

- prisma.schema の設定項目について詳しくは[こちら](https://www.prisma.io/docs/orm/reference/prisma-schema-reference)

<br>

```bash
npx prisma init
```

すると prisma/ 配下に schema.prisma という名前で設定ファイルが作成される

```
// schema.prisma

// データベースの接続情報
datasource db {
  provider = "postgresql" // DBの種類
  url      = env("DATABASE_URL") // .env の DATABASE_URL に記載する
}

// 利用するジェネレーターの指定
generator client {
  provider = "prisma-client-js"
}

/** 
* DBのテーブルとマッピングする
* アプリ内で表現されるオブジェクト
*/
model <ModelName> {
    prop type constraint
}

/**
* 例: User tableと対応するオブジェクト
*/
model User {
    id String @id,
    name String,
    age Ing?
}
```

*generatorとは  
- Prisma schema をインプットとして受け取り、コードを生成するプログラム
- 生成されたコードはデータベースへのクエリ実行やデータの取得、更新などの操作を行うための構造化されたAPIを提供する
- prisma generate コマンドの際にその generator が動く
- 現在は　prisma-client-js　か、自分で作るカスタム
 generator の2つの選択肢しかない

---

### DBへの接続先URL


- 各 DB ごとの URL の書き方は[こちら](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-mysql)

<br>

例: mysql に接続したい場合

```
# .env
DATABASE_URL="mysql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DB_NAME>"
```

---

### 利用する DB によって、 model の prop のデータ型が異なるので注意

- 各 DB で利用できるデータ型は[こちらを参照](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-mysql)