### Prisma でのトランザクション管理

https://www.prisma.io/docs/orm/prisma-client/queries/transactions

---

### Nested Writes

関連づいたテーブルにアクセス(create, update )する際に1つのトランザクションにする方法

Nested Writes の詳しい書き方は[こちら](./NestedWrites.md)

<font color="red">createMany(), updateMany(), deleteMany() は Nested Writes は使えない</font>

<br>

例: 以下の one to many リレーションのテーブルがあるとする

User テーブルに User A を作成、その後 User A に紐づく Post として 3件 Post テーブルにデータを登録

-> どれか1つでも失敗した場合、ロールバックする

<img src="../../img/one_many1.png" />

```ts
await prisma.user.create({
    data: {
        name: "User A",
        post: {
            create: [
                {title: "1st post"},
                {title: "2nd post"},
                {title: "3rd post"},
            ]
        }
    }
});
```

---

### $transcation API