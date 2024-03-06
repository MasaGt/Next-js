### リクエストパラメーターを取得する

- クエリパラメーターの取得方法を操作方法

- Client Component と Server Component で利用するフックや機能が異なるので注意

---

### Client Components 編

- 'next/navigation' 内にある useSearchParams フックを利用することで URL につけられたクエリパラメーターを取得/参照することができる

- クエリ文字列の追加/削除はできない

- get('key') でクエリパラメーターを読み取る

- has('key') でそのキーに紐づくパラメーターがあるかどうか調べる

<br>

例: 'key' というクエリパラメーターがあればその値を表示し、無ければ表示しない

```ts
'use client';
import { useSearchParams } from 'next/navigation';

const ClientComponent = () => {
    const searchParams = useSearchParams();
    return (
        {searchParams.has('key') &&
            <p>
                {searchParams.get('key')}
            </p>
        }
    )
}
export default Page;
```

---

### Client Components 編 その2

- URLSearchParams というブラウザ専用のAPIを使うこともできる

- 実は useSearchParams は読み取り専用の URLSearchParams を返すフック

- set('key', value) もしくは　append('key', value) でにキーと値のセットを追加する
    - set と append の違い
        - set: 同じキー名がすでに存在する場合、そのキーに紐づく値を上書きする
        - append: 同じキー名がすでに存在する場合、上書きせず、新たに追加する

```js
// /search?id=1 でidに紐づくクエリパラメーターが存在する場合
const params = URLSearchParams();

params.set('id', 100);
// /search?id=100

params.append('id', 200);
// /search?id=100&id=200∏
```

<br>

- get('key') で指定したキーに紐づく値を取得

- delete('key') でキーとその値を削除

- toString() で　'key=value' の文字列で出力する

```js
const params = URLSearchParams();
param.set("key1", 100);
param.set("key2", 'usa');

console.log(param.toString());
// 'key1=100&key2=usa'
```

<br>

例: ボタンを押したら、遷移先の url に テキストボックスに入力されている値をクエリパラメータとして追加する

```ts
'use client';
import Link from 'next/link';

const ClientComponent = () => {
    const params = URLSearchParams();

    // テキストボックスに入力されると呼ばれる関数
    const onChange = (value) => {

        // 'key'というキーに、テキストボックスで入力された値をクエリパラメーターとして追加する

        if (value) {
            params.set('key', value);
        } else {
            params.delete('key');
        }
    }

    return (
        <>
            <input
                value={value}
                onChange={(e) => {onChange(e.target.value)}}
            />
            <Link
                href={`/home?${params.toString()}`}
            >
                Go to home page
            </Link>
            
        </>
    );
}
```

---

### Server Components 編

- Page が受け取る props の searchParams からそのページの url についているクエリパラメーターを参照できる


- prams: {key: value} のオブジェクト

    ```
    /path/home?name=john&age=30 でアクセスしたとする

    Page の引数の searhParam の中身
    {name: 'john', age: 30}
    ```

- Page 内の Server Component に searchProps の値を props で渡すことで、 Server Component でクエリパラメータの参照ができる

<br>

```ts
// /home/page.tsx
const Page ({
    searchParams    
}) => {

    // /home?name=john&name=30 でアクセスした場合
    const name = searchParams?.name || 'no name';
    const age = serchParam?.age || 0;

    return (
        <div>
            {// ServerCompoent にクエリパラメーターを渡す}
            <ServerComponent name={name} age={age} />
        </div>
    );
}
export default Page;
```