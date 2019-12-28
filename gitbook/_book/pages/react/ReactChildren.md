# ReactChildren

## forEachChildren

```js
function forEachChildren(children, forEachFunc, forEachContext) {
    if (children == null) {
        return children;
    }
    const traverseContext = getPooledTraverseContext(
        null,
        null,
        forEachFunc,
        forEachContext
    );
    traverseAllChildren(children, forEachSingleChild, traverseContext);
    releaseTraverseContext(traverseContext);
}
```

## mapChildren

```js
function mapChildren(children, func, context) {
    if (children == null) {
        return children;
    }
    const result = [];
    mapIntoWithKeyPrefixInternal(children, result, null, func, context);
    return result;
}
```

## countChildren

## onlyChild

## toArray

```js
function onlyChild(children) {
    invariant(
        isValidElement(children),
        "React.Children.only expected to receive a single React element child."
    );
    return children;
}
```

> 判断是否为有效的 cReact 元素，否则抛出错误

## mapIntoWithKeyPrefixInternal

```js
function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
    let escapedPrefix = "";
    if (prefix != null) {
        escapedPrefix = escapeUserProvidedKey(prefix) + "/";
    }
    const traverseContext = getPooledTraverseContext(
        array,
        escapedPrefix,
        func,
        context
    );
    traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
    releaseTraverseContext(traverseContext);
}
```

## mapSingleChildIntoContext

```js
function mapSingleChildIntoContext(bookKeeping, child, childKey) {
    const { result, keyPrefix, func, context } = bookKeeping;

    let mappedChild = func.call(context, child, bookKeeping.count++);
    if (Array.isArray(mappedChild)) {
        mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, c => c);
    } else if (mappedChild != null) {
        if (isValidElement(mappedChild)) {
            mappedChild = cloneAndReplaceKey(
                mappedChild,
                // Keep both the (mapped) and old keys if they differ, just as
                // traverseAllChildren used to do for objects as children
                keyPrefix +
                    (mappedChild.key &&
                    (!child || child.key !== mappedChild.key)
                        ? escapeUserProvidedKey(mappedChild.key) + "/"
                        : "") +
                    childKey
            );
        }
        result.push(mappedChild);
    }
}
```
