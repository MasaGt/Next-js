### Server Actions とは

- サーバー側で動く非同期関数
    - 「クライアントコンポーネントのフォームのサブミットイベントにサーバーアクションで書いたデータ操作を設定する」などが主な利用方法

- Server Components / Client Compoents 両方で利用できる
    - Client Components に、サーバー側で動く関数を埋め込むことができる
    - <font color="red">Client Components に Server Action を書いても、 Server Action の関数はクライアント側でダウンロードされない</font>  

        [参考サイト](https://blog.openreplay.com/server-actions-in-nextjs/)

- クライアント側から fetch や axios で API エンドポイントを叩かなくて済むようになる  
    
    -> 普通のサーバーコンポーネントと何が違うのか?  

    答え: クライアントコンポーネントからこれができることが新しい (多分サーバーコンポーネントを使うなら、普通に Server Actions 使わなくてもいいかも)

- サーバー側で実行されるので、以下のメリットがある
    - クライアント側でJavaScriptをoffにしていても、サーバーアクションは実行できる
    - サーバーアクションの処理はクライアント側にダウンロードされる JS bundle に含まれないので、js ファイルサイズの削減につながる
        
    - js bundle に含まれないので、DBサーバーの情報などをサーバーアクションに含めることができる

---

### Server Actions の利用方法

- 'use server' をコンポーネントの先頭か、関数内の先頭で宣言する

- Server Actions は非同期関数なので、 async をつけることを忘れずに

- Server Actions は基本的に以下の箇所にしか渡せない
    - form の action 属性
    - button の formAction 属性

<br>

例: Client Component の From に Server Component を利用する

form の action 属性に渡す方法

```ts
'use cilent';
const ClientComponent = () => { 

    const serverAction = async () => {
        'use server';
        console.log('this should be displayed on the server console log');
    };

    return (
        <form action={serverAction}>
            <button>run server actions</button>
        </form>
    )
}

export ClientComponent;
```

<br>

button の formAction 属性に渡す方法  

- button は必ず form タグに囲まれていること

- この時、 button は type="subit" が指定されているか、 なんの type も指定されていないこと

- type="button" や type="reset" が指定されていると Server Actions 関数は動かない


```ts
'use cilent';
const ClientComponent = () => { 

    const serverAction = async () => {
        'use server';
        console.log('this should be displayed on the server console log');
    };

    return (
        <form>
            <button formAction={serverAction}>run server actions</button>
        </form>
    )
}

export ClientComponent;
```

---

### 間違った利用方法

- button の formAction に serverAction を渡せば、とにかく動くと思っていた

<br>

form タグで囲むのを忘れた

```ts
'use client';
export const ClientComponent = () => {
    const serverAction = async () => {
        'use server';
        console.log('this serverAction will not run');
    };

    return (
        <button actionForm={serverAction}>run server action</button>
    );
}
```

<br>

button タグの type 属性に submit 以外を指定した  

```ts
'use client';
export const ClientComponent = () => {
    const serverAction = async () => {
        'use server';
        console.log('this serverAction will not run');
    };

    return (
        <form>
            <button type="button" actionForm={serverAction}>run server action</button>
        </form>
    );
}
```

---

### formData 引数

- Server Actions が form から呼び出される時、そのフォームに入力された値を持つオブジェクトである FormData を引数に取ることができる

- FormData.get(name): form 要素の name 属性を指定し、そのフォーム要素の値を取得する

- FormData.has(name): form 要素の name 属性を指定し、そのフォーム要素がフォームにあるかどうかを調べる

-  FormData.set(name, value): form 要素の name 属性を指定し、そのフォーム要素の値を設定する

<br>

例: form 内の入力値を取得し、データベースに登録する例

```ts
'use client';

export const ClientComponent = () => {
    const serverAction = async (formData: FormData) => {
        'use server';
        const fullName = formData.get("full-name");
        const age =  formData.get("age");
        // 想像上のdbオブジェクト & 登録処理
        db.insert({name: fullName, birth: age});
    };

    return (
        <form action={serverAction}>
            // textbox for user's name
            <input
                type="text"
                name="full-name"
            />

            // selectbox for user's home country
            <select
                type="select"
                name="country"
            >
                <option value="US">
                    USA
                </option>
                <option value="NZ">
                    New Zealand
                </option>
                <option value="JP">
                    Japan
                </option>
            </select>
        </form>
    );
}
```

---

### その他の引数を Server Actions 関数に渡したい場合

- Server Actions function.bind() を使う

- 具体的には、 bind(null, 渡したいデータ) で引数を固定し、　サーバーアクション側でその引数を受け取るようにする
    - **FormDataは最後の引数になることに注意**

<br>

```ts
// client component
'use client';

import { registerData } from 'server action moduleのパス';

// propsを分割代入している
const ClientComponent = ({ userId }: { userId: string}) => {
    const insertUser = registerData.bind(null, userId);

    return (
        <form action={insertUser}>
            {// input elems}
            <button>submit</button>
        </form>
    );
}
```

```ts
// server action module
'use client';

export const registerData = async (userID: string, formData: FormData) => {
    // register process
};
```

---

### useEffect 内で Server Actions 関数を実行することができる

```ts
'use server';

// server action module
export const fetchUsers = async () => {
    const users = await db.from('User').selectAll();
    return users;
}
```

```ts
'use client';
//client component
import { fetchUsers } from 'server action moduleのパス';
import { useEffect, useState } from 'react';

export const ClientComponent = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const updateUsers = async () => {
            // ここで server action function を呼び出す
            const data = await fetchUsers();
            setUsers(data);
        }

        updateUsers();
    }, []);

    return (
        <div>
            {users.map((user) => {
                <p>
                    {user.name}
                </p>
            })}
        </div>
    );
}
```

<br>

今までだと、多分 useEffect の中で fetch や axios で API エンドポイントを叩いていた

-> js bundle に含まれてしまう  
-> api エンドポイントを立てなければならない

```ts
const ClientComponent = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const updateUsers = async () => {
            const data = await axios('~~');
            setUsers(data);
        }
        updateUsers();
    }, []);
}
```

Server Actions に置き換えることでデータ取得の処理を分離でき、サーバー側に隠蔽することができる

---

### revalidatePath とは

- revalidate とは
    - キャッシュされたデータを削除し、最新のデータを再び取得すること  
        [定義はこちらを参照](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data)

- revalidatePath とは
    - 指定したパスのキャッシュデータを削除すること

    - revalidatePath を実行したタイミングでキャッシュが削除されるのではなく、次に revalidatePath に指定したパスにアクセスすると最新のデータを取得するようになっている


<br>

```ts
// app/blog/post ページのキャッシュデータを削除し、次回アクセス時に最新データを取得するように設定する
import { revalidatePath } from 'next/cache'
revalidatePath('/blog/post');
```

<br>

- 全ページのキャッシュを削除する場合、 revalidatePath にルートパス ('/') を渡す

```ts
import { revalidatePath } from 'next/cache'
revalidatePath('/');
```

