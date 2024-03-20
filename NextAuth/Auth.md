### NextAuth.js と Auth.js の違い

- NextAuth.js は メジャーバージョンアップによって Auth.js (v5) になった

- Auth.js が利用できる Next.js の バージョンは 13.4 以上 

- 上記条件より、 Auth.js は App Router のディレクトリ構成で利用する (Page Router もサポートはされているs)

---

### Auth.js　ができること

- OAut / OpenID Connect 認証
- Email 認証 (Email Authentication)
- ユーザー名&パスワード認証 (Credentials Authentication)

---

### 利用の流れ

0. 秘密鍵の生成&設定

```bash
# 秘密鍵の生成
openssl rand -base64 32
```

```
# .env
AUTH_SECRET=生成した秘密鍵
```

<br>

1. Authモジュールで使用される設定オブジェクト (NextAuthConfig 型) を作成する (Auth.ts)
    - 慣例では、プロジェクトルートに作成する

```ts
// Auth.js

// "next-auth" から NextAuthConfig を import
import { NextAuthConfig } from "next-auth";

// 自分のアプリで使う認証や、ログインページのパスによって適当な設定を行う
const config = {
    // provider プロパティは必須
    provider: []
} satisfies NextAuthConfig;
```

<br>

- <font color="red">**NextAuthConfig の詳しい設定方は**</font>[こちら](#config)

<br>

2. 1で作成した設定オブジェクトを NextAuth NextAuth 関数から返ってきた "auth 関数"、 "handelrs オブジェクト"、 "signIn 関数"、 "signOut 関数" を受け取る

```ts
// Auth.js

import { NextAuthConfig } from "next-auth";

const config = {
    provider: [自分の利用する認証方法],
    その他の設定項目
} satisfies NextAuthConfig;

// NextAuth 関数からの戻り値を export する
export {handers, auth, signIn, signOut} = NextAuth(config);
```

<br>

3. API エンドポイントを作成し、 handlers オプジェクトの GET 関数と POST 関数を export する
    - 理由: 認証プロバイダーと認証情報のやり取りをするため
    - ディレクトリ構成に注意   
    route.js は \[...フォルダ名\] (Optional Catch-all Segments) に配置すること: [理由はこちら](#endpoint)

```
project
    |- app
        |- api
            |- [...myAuth] #フォルダ名はなんでもいい
                |- route.ts|js
```

```ts
// route.js
import { handlers } from 'Auth.jsのパス';

export const { GET, POST } = handler;
```

<br>

5. page ファイルもしくは component から、signIn 関数や signOut 関数を呼び出す
    - [signIn/signOutの使い方はこちら](#sign-in-out)

<br>

#### middleware を使いたい場合

- そもそも middleware とは
    - express でのミドルウェアと同じもの
    - **TODO: 画像(ミドルウェアの処理順番の図など)を挟む**

6. プロジェクトルートに middleware.ts|js を作成する

```
project
    |- middleware.ts|js
```

<br>

7. Auth.js の 設定を記述したファイル (Auth.ts|js) にて、 <font color="red">NextAuthConfig オブジェクトの callback プロパティにて、 authorized 関数を定義する</font>
    - TODO: authorized関数は何かを説明する

```ts
// Auth.ts
// 途中省略

const config = {
    ~,
    callback: {
        // TODO: いつ走るの?
        authorized({req, auth}) {
            /** 認証完了後のauthは以下の通り
             *  auth:
             *  {user: {name: "ユーザー名",など}}
             */

            /**
             * 以下のケースは認証未完了
             * 1. authがnull
             * 2. auth.userがundefined
             */
            if (auth && auth.user) {
                return true;
            } else {
                // redirect to login page
                return false;
            }

            // 上の条件分岐よりこっちの方が1行で済む
            // return !!auth?.user;
        }
    }
} satisfies NextAuthConfig;
```

<br>

8. middleware ファイルにて、 auth.ts|js で定義した設定を NextAuth 関数に渡した際に返ってきた auth 関数を export する

```ts
// middleware.ts

export {auth as middleware} from "Auth.tsのパス";
```

<br>

9. middleware の処理をどのパスで動かしたいのかが明確な場合 middleware.ts にて設定する
    - matcher: string[] をプロパティに持つ config オブジェクトを作成し、exportする (named export)

```ts
// middleware.ts

export {auth as middleware} from "Auth.tsのパス";

export const config = {
    matcher: ["ミドルウェアを動かしたいパス(正規表現も可)"]
}
```


---
<div id="config"></div>

### NextAuthConfig の設定

---
<div id="endpoint"></div>

### API エンドポイントのディレクトリ構成について

---
<div id="sign-in-out"></div>

### signIn / signOut の使い方

---