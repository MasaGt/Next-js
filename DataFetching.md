### データの取得

- 基本的には Server Compoenent で行う

---

メモ
- サーバーコンポーネントで　Promise　をawait で扱いたい場合 async を関数コンポーネントにつける
```ts
const ServerComponent = async () => {
    // fetchData()はPromiseを返す
    const result = await fetchData();
    return <>server component</>;
}

export default ServerComponent;
```

---

### request waterfalls と parallel requests

- サーバーコンポーネントにて、複数回クエリを投げることがあるとする　

#### request waterfalls

- 以下のように、あるクエリの実行のためその前のクエリの完了を待つことを request waterfalls と呼ぶ

- request waterfalls の使うべき/使うのを避けたほうがいい ケース
    - 使うべきケース: とあるクエリが、前のクエリの結果に依存しているケース
    - 避けたほうがいいケース: 上記以外のケース
    
        基本的には後で紹介する parallel requests のほうがパフォーマンスが良い

```ts
const ServerComponent = async () => {
    
    const data1 = await fetchData1();
    const data2 = await fetchData2();
    const data3 = await fetchData3();
}

export default ServerComponent;
```

<br>

#### parallel requests 

- 複数のクエリを Promise.all()　に渡して、複数のクエリを並行で実行する

```ts
const ServerComponent = () => {
    const result = await Promise.all(fetchData1, fetchData2, fetchData3);

    const [data1, data2, data3] = result;
}
```

