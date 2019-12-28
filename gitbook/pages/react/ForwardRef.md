# ForwardRef

```js
function forwardRef(render) {
    if (__DEV__) {
        if (typeof render !== "function") {
            warningWithoutStack(
                false,
                "forwardRef requires a render function but was given %s.",
                render === null ? "null" : typeof render
            );
        } else {
            warningWithoutStack(
                // Do not warn for 0 arguments because it could be due to usage of the 'arguments' object
                render.length === 0 || render.length === 2,
                "forwardRef render functions accept exactly two parameters: props and ref. %s",
                render.length === 1
                    ? "Did you forget to use the ref parameter?"
                    : "Any additional parameter will be undefined."
            );
        }

        if (render != null) {
            warningWithoutStack(
                render.defaultProps == null && render.propTypes == null,
                "forwardRef render functions do not support propTypes or defaultProps. " +
                    "Did you accidentally pass a React component?"
            );
        }
    }

    return {
        $$typeof: REACT_FORWARD_REF_TYPE,
        render
    };
}
```

> 返回一个\$\$typeof = REACT_FORWARD_REF_TYPE 的对象
