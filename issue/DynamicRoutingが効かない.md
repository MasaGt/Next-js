### 事象

- Dynamic Routing を利用しようとしたが、ページにアクセスすると 404 エラーになる

```
プロジェクト構成
app
    |- sample
        |- [[...post]].tsx
```

- アクセスした URL
    - /sample/abc
    - /sample/1
    - /sample/abc/def

---

### 原因

- App Router での Dynamic Routing が Page Router での使い方と少し異なっていた

    - App Router で　Dynamic Routing を利用したい場合はフォルダ名を [] でくくる

    - Page Router で　Dynamic Routing を利用したい場合はフォルダ名かファイル名を [] でくくる

- 今回、 App Router でのフォルダ構成だったにもかかわらず、 ファイルを [] でくくり　Dynamic Routing を利用しようとしていたから

---

### 解決方法

- フォルダ名 [] でくくる

```
app
    |- [...sample]
        |- page.tsx
```