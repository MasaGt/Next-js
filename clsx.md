### clsx とは

- 条件によってコンポーネントのクラスネームの付与/剥奪をするライブラリ

```js
npm install clsx
```

---

### 使い方

```js
// MyComponent.jsx
import clsx from 'clsx';

export const MyComponent = () => {
    reutrn (
        <>
            <div
                className = {clsx(
                    'common-class-name1 common-class-name2',
                    {
                        'conditioal-class-name': condition,
                        'conditioal-class-name2': condition2
                    }
                )}
            ></div>
        </>
    )    
}
```

<br>

具体例: props に boolean を受け取る Button コンポーネント

```js
import clsx from 'clsx';

export const Button = ({ isVisible }) => {
    return (
        <>
            <button
                className = {clsx(
                    'large-button round-shape',
                    {
                        'visible': isVisible,
                        'invisible': !isVisible
                    }
                )}
            >
                Click
            </button>
        </>
    );
}
```

<br>


もしくはこんな書き方もある

```js
// MyComponent.jsx
import clsx from 'clsx';

export const MyComponent = () => {
    reutrn (
        <>
            <div
                className = {clsx(
                    'common-class-name',
                    condition1 && 'style1',
                    condition2 &&  'style2'
                )}
            ></div>
        </>
    )    
}
```