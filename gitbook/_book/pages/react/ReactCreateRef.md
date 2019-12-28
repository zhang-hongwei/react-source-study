# ReactCreateRef

```js
function createRef() {
    const refObject = {
        current: null
    };
    if (__DEV__) {
        Object.seal(refObject);
    }
    return refObject;
}
```

> 返回一个 ref 对象
