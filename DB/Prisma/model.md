### prisma.schema の model 項目

データベースのテーブルに対応するプログラム内のオブジェクトを定義する項目

model は以下のように、テーブル名と対応するように命名し、内部にてカラム名/データ型/制約を設定する
<br>

```
// prisma.schema

model <tableName> {
    colName dataType constraint
}
```
\*colName, dataType, constraint は**半角スペースで区切ること**

---

### attributes

上記 model の設定項目である constraint のことを prisma では model の attributes と呼ぶ

#### 主な attributes 項目
    - @id/@@id: 主キーの設定

---

### 主キーの設定

1\. キー項目の設定

- 主キーが一つの場合
    - @id で特定のカラムを主キーに設定する

    ```
    model User {
        userId Int @id
    }
    ```

<br>

- 主キーが複数項目からなる場合(composite key)
    - @@id に複数のカラムを指定し複合主キーに設定する

    ```
    model modelName {
        col1 type const
        col2 type const
        ...

        // name: 複合主キーに別名をつける
        @@id(name: "compoundKeyName", fields: [colName,colName])


        //以下のようにnameとfieldsを省略することもできる
        @@id([colName, colName])
    }
    ```

    ```
    model User {
        firstName String
        lastName String

        @@id(name: "fullName", fields:[firstName, lastName])
    }
    ```

    実行結果
    <img src="../../img/prisma_model1.png" />

<br>
<br>
<br>

2\. 複合主キーで設定する name プロパティについて

where オプションで他のカラムのように指定することができる

```ts
const user = prisma.user.findUnique(
    where: {
        fullName: {
            firstName: "John",
            lastName:  "Smith",
        }
    }
);
```

<br>

もし、nameが設定されていなかったら
```ts
const user = prisma.user.findUnique(
    where: {
        firstName: "John",
        lastName: "Smith",
    }
);
```

---


