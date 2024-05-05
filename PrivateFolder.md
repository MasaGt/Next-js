### Private Folder とは

- Route Groups のように、対象ディレクトリおよび、そのサブフォルダが URL にマッピングされなくなる

- Route Groups との違い
    - Route Groups: 対象のディレクトリのみマッピングの対象ではなくなる。サブディレクトリはマッピングされる
    - Private Folfer: 対象のディレクトリおよび、そのフォルダ移行の全てのサブディレクトリはマッピングされなくなる

    ```
    app
     |- (admin) (dir)
        |- blog (dir)
            |- page.jsx
     |       
     |- _components (dir)
        |- blog (dir)
            |- button.jsx


    blog/ で(admin)/blog/page.jsx にアクセス可能

    _components/blog/button.jsx にはアクセスできない
    ```

---

### 利用方法

- フォルダ名の前に _ (アンダースコア) をつける

---

### Route Groups と Private Folder の使い分け

- Route Groups
    - ファイルをグループにまとめたいが、そのグループ名はマッピング対象にしたくない場合


- Prvate Folder
    - ファイルをマッピング対象にしたくないとき
    - 例: UIコンポーネントファイルを格納するフォルダはPrivate Folderにする