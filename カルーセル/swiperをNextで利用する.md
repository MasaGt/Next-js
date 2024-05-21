### 準備

swiperのインストール

```bash
npm i swiper
```

---

### 実装

*今回は超シンプルな水平カルーセルを実装してみる

<font color="red">クライアントコンポーネントじゃないと動かない(ビルド時にエラー発生)</font>
```js
// Carousel.tsx
'use client';

import {Swiper, SwiperSlide} from swiper/react
import "swiper/css";

const Carousel = () => {
    return <div>
        
        <Swiper
            // 様々な項目を設定できる
            loop={true}
        >
            <SwiperSlide>コンテンツ1</SwiperSlide>
            <SwiperSlide>コンテンツ2</SwiperSlide>
            <SwiperSlide>コンテンツ3</SwiperSlide>
        </Swiper>
    </div>;
};
export default Carousel;
```

---

### 参考サイト

- [【個人開発】最新のNext14で駆け出しエンジニア支援サイト作ってみた](https://qiita.com/mamimami0709/items/bca756ed5a3c89e654e0)

- [codesandboxでのサンプル](https://codesandbox.io/p/github/toanlbbhsoft/swiper-nextjs/main?file=%2Fapp%2F_components%2FDemoSlider.tsx%3A1%2C1-1%2C14)