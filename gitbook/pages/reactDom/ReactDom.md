# ReactDom

1. 定义 ReactDom 对象
2. 导出 ReactDom 对象

## render

```js
function render(element, container, callback) {
    return legacyRenderSubtreeIntoContainer(
        null,
        element,
        container,
        false,
        callback
    );
}
```

## legacyRenderSubtreeIntoContainer

```js
function legacyRenderSubtreeIntoContainer(
    parentComponent,
    children,
    container,
    forceHydrate,
    callback
) {
    let root = container._reactRootContainer;
    let fiberRoot;
    if (!root) {
        // Initial mount
        root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
            container,
            forceHydrate
        );
        fiberRoot = root._internalRoot;
        if (typeof callback === "function") {
            const originalCallback = callback;
            callback = function() {
                const instance = getPublicRootInstance(fiberRoot);
                originalCallback.call(instance);
            };
        }
        // Initial mount should not be batched.
        unbatchedUpdates(() => {
            updateContainer(children, fiberRoot, parentComponent, callback);
        });
    } else {
        fiberRoot = root._internalRoot;
        if (typeof callback === "function") {
            const originalCallback = callback;
            callback = function() {
                const instance = getPublicRootInstance(fiberRoot);
                originalCallback.call(instance);
            };
        }
        // Update
        updateContainer(children, fiberRoot, parentComponent, callback);
    }
    return getPublicRootInstance(fiberRoot);
}
```

## legacyCreateRootFromDOMContainer

```js
function legacyCreateRootFromDOMContainer(container, forceHydrate) {
    const shouldHydrate =
        forceHydrate || shouldHydrateDueToLegacyHeuristic(container);
    // First clear any existing content.
    if (!shouldHydrate) {
        let warned = false;
        let rootSibling;
        while ((rootSibling = container.lastChild)) {
            container.removeChild(rootSibling);
        }
    }

    return createLegacyRoot(
        container,
        shouldHydrate
            ? {
                  hydrate: true
              }
            : undefined
    );
}
```

## findDOMNode

```js
function findDOMNode(componentOrElement) {
    if (componentOrElement == null) {
        return null;
    }
    if (componentOrElement.nodeType === ELEMENT_NODE) {
        return componentOrElement;
    }

    return findHostInstance(componentOrElement);
}
```
