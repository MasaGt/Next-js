### ルートグループ (Route Group) とは

- App Router では　app 配下のフォルダ、ファイルは URL のパスにマッピングされる

- しかし、フォルダをルートグループにすることで、そのフォルダが URL にマッピングされなくなる

- フォルダ名を () でくくることによってルートグループを作成できる

- 何が嬉しいのか?
    - URL に不必要なフォルダのパスがマッピングされなくなる

<br>

```
ルートグループがない場合

app
    |- sports
        |- layout.tsx
        |- baseball
            L page.tsx
        |- golf
            L page.tsx
        |- swimming
            L page.tsx


- baseball のページにアクセスする場合
    /sports/baseball
- golf のページにアクセスする場合
    /sports/golf
- swimming のページにアクセスする場合
    /sports/swimming
```

<br>

```
sports をルートグループにすると

app
    |- (sports)
        |- layout.tsx
        |- baseball
            L page.tsx
        |- golf
            L page.tsx
        |- swimming
            L page.tsx


- baseball のページにアクセスする場合
    /baseball
- golf のページにアクセスする場合
    /golf
- swimming のページにアクセスする場合
    /swimming
```

---

### エラーを引き起こすケース

ルートグループを利用したことで、複数のファイルが同一 URL でマッピングされてしまう場合、エラーになる


```
app
    |- (product)
        |- book
            L page.tsx
    |- (action)
        |- book
            L page.tsx


/book が　/product/book なのか /action/book　なのか解決できないのでエラー
```