# ReactHooks

```js
function resolveDispatcher() {
    const dispatcher = ReactCurrentDispatcher.current;
    invariant(
        dispatcher !== null,
        "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for" +
            " one of the following reasons:\n" +
            "1. You might have mismatching versions of React and the renderer (such as React DOM)\n" +
            "2. You might be breaking the Rules of Hooks\n" +
            "3. You might have more than one copy of React in the same app\n" +
            "See https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem."
    );
    return dispatcher;
}

function useContext(Context, unstable_observedBits) {
    const dispatcher = resolveDispatcher();
    if (__DEV__) {
        if (unstable_observedBits !== undefined) {
            console.error(
                "useContext() second argument is reserved for future " +
                    "use in React. Passing it is not supported. " +
                    "You passed: %s.%s",
                unstable_observedBits,
                typeof unstable_observedBits === "number" &&
                    Array.isArray(arguments[2])
                    ? "\n\nDid you call array.map(useContext)? " +
                          "Calling Hooks inside a loop is not supported. " +
                          "Learn more at https://fb.me/rules-of-hooks"
                    : ""
            );
        }

        // TODO: add a more generic warning for invalid values.
        if (Context._context !== undefined) {
            const realContext = Context._context;
            // Don't deduplicate because this legitimately causes bugs
            // and nobody should be using this in existing code.
            if (realContext.Consumer === Context) {
                console.error(
                    "Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be " +
                        "removed in a future major release. Did you mean to call useContext(Context) instead?"
                );
            } else if (realContext.Provider === Context) {
                console.error(
                    "Calling useContext(Context.Provider) is not supported. " +
                        "Did you mean to call useContext(Context) instead?"
                );
            }
        }
    }
    return dispatcher.useContext(Context, unstable_observedBits);
}

function useState(initialState) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useState(initialState);
}

function useReducer(reducer, initialArg, init) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useReducer(reducer, initialArg, init);
}

function useRef(initialValue) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useRef(initialValue);
}

function useEffect(create, inputs) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useEffect(create, inputs);
}

function useLayoutEffect(create, inputs) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useLayoutEffect(create, inputs);
}

function useCallback(callback, inputs) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useCallback(callback, inputs);
}

function useMemo(create, inputs) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useMemo(create, inputs);
}

function useImperativeHandle(ref, create, inputs) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useImperativeHandle(ref, create, inputs);
}

function useDebugValue(value, formatterFn) {
    if (__DEV__) {
        const dispatcher = resolveDispatcher();
        return dispatcher.useDebugValue(value, formatterFn);
    }
}

const emptyObject = {};

function useResponder(responder, listenerProps) {
    const dispatcher = resolveDispatcher();
    if (__DEV__) {
        if (responder == null || responder.$$typeof !== REACT_RESPONDER_TYPE) {
            console.error(
                "useResponder: invalid first argument. Expected an event responder, but instead got %s",
                responder
            );
            return;
        }
    }
    return dispatcher.useResponder(responder, listenerProps || emptyObject);
}

function useTransition(lconfig) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useTransition(config);
}

function useDeferredValue(value, config) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useDeferredValue(value, config);
}
```
