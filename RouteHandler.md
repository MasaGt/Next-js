### Route Handler とは

- API エンドポイントを作成するための機能

- 制約
    - app フォルダ内に配置すること
    - ファイル名は route.js|ts
    - page.jsx|tsx と同じ階層に作成してはいけない
    - 関数名は対応するhttpのメソッド(GET, POST など)と同じでなければいけない
    - GET や POST などの関数は同期でも非同期でもかけるけど、非同期で書くのがデフォっぽい
    - GET や POST などの関数はdefault export ではなく、named export でないといけない
    - GET や POST などの関数内で Response を返さなければ実行時にエラーになる

```ts
// app/api/route.ts

export function GET(req: Request) {
    // api/にGETでリクエストが送られてきた時の処理
    // return で　Response　オブジェクトを返さなければならない
    return Response.json({data: "val"})
}
```

<br>

*Pages Router の API Routes では、 pages フォルダ直下に api フォルダを作成し、その中に置かれた js|ts ファイルが、ファイル名込みでエンドポイントとして機能していた

しかし、App Router の Route Handler では api フォルダを作成する必要がなくなった

---

### 使い方

- route.js|ts 内の各関数は引数にRequest オブジェクトを受け取る

- Response オブジェクトは引数に受け取る必要なく、ファイル内でいきなり返していい

```ts
// app/api/route.ts
export const GET = (req: Request) => {
    return Response.json({msg: "hello, world"});
}
```

<br>

- Request, Response オブジェクトの代わりに NextRequest NextResponse を使っても良い
    - NextRequest / Next Response: 'next/server' から提供される　Response/Requestオブジェクトを拡張したもの

```ts
import { NextRequest, NextResponse } from "next/server";
export const GET = (req: Request) => {
    return Response.json({msg: "hello, world"});
}
```


---

### NextRequest, NextResponse の使い方

- text/plain レスポンスの返し方
    - NextResponse をインスタンス化し、以下の引数を渡す
        1. テキスト
        2. オプションオブジェクト  
        [詳しくはこちら](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response)

```ts
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    return new NextResponse("hello, world", {
        status: 200, // status200 の時は省略しても良い
        headers: { "Content-Type": "text/plain" }
    });
}
```

<br>

- 