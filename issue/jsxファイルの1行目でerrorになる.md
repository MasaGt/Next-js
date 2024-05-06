### 事象

- Next.js プロジェクトを作成後、 Page.jsx ファイルを作成するとそのファイルの1行目は　Linter エラーになる

- エラーメッセージは "Parsing error: Cannot find module 'next/babel'"

---

### そもそも next/babel とは

複数の babel の preset や plugin のが入ったパッケージ(next/babel　はプリセット)


next/babel の中身

```
preset-env
preset-react
preset-typescript
plugin-proposal-class-properties
plugin-proposal-object-rest-spread
plugin-transform-runtime
styled-jsx
```

<br>

Next プロジェクトはデフォルトで next/babel を持っているっぽい
https://nextjs.org/docs/pages/building-your-application/configuring/babel

---

### 原因

- サブディレクトリに Next プロジェクトを作成したことで eslint がうまく動かないことが原因

自分のディレクトリ構成
```
root
  |- Next.js プロジェクト
    |- app とか
```

---

### 解決策

- VS Code の setting.json に以下の項目を追加する
  - サブディレクトリにあるプロジェクトでも eslint が機能するようになる

```json
// 
{
  "eslint.workingDirectories": ["サブディレクトリのNextプロジェクト"]
}
```

---

### 参考サイト

- [Next.js【Parsing error: Cannot find module 'next/babel'】を解決する魔法🧙‍♂️✨](https://zenn.dev/msk1206/articles/6d8731f6fc8fb3)

- [個人メモ：.eslintrcがうまく動かない](https://zenn.dev/__poc_sleepy__/scraps/5d5eb86562a5be)