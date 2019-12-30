# ReactDom.js

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
    // TODO: Ensure all entry points contain this check
    invariant(
        isValidContainer(container),
        "Target container is not a DOM element."
    );

    if (__DEV__) {
        topLevelUpdateWarnings(container);
    }

    // TODO: Without `any` type, Flow says "Property cannot be accessed on any
    // member of intersection type." Whyyyyyy.
    let root;
    if (!root) {
        // Initial mount
        root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
            container,
            forceHydrate
        );
        if (typeof callback === "function") {
            const originalCallback = callback;
            callback = function() {
                const instance = DOMRenderer.getPublicRootInstance(
                    root._internalRoot
                );
                originalCallback.call(instance);
            };
        }
        // Initial mount should not be batched.
        DOMRenderer.unbatchedUpdates(() => {
            if (parentComponent != null) {
                root.legacy_renderSubtreeIntoContainer(
                    parentComponent,
                    children,
                    callback
                );
            } else {
                root.render(children, callback);
            }
        });
    } else {
        if (typeof callback === "function") {
            const originalCallback = callback;
            callback = function() {
                const instance = DOMRenderer.getPublicRootInstance(
                    root._internalRoot
                );
                originalCallback.call(instance);
            };
        }
        // Update
        if (parentComponent != null) {
            root.legacy_renderSubtreeIntoContainer(
                parentComponent,
                children,
                callback
            );
        } else {
            root.render(children, callback);
        }
    }
    return DOMRenderer.getPublicRootInstance(root._internalRoot);
}
```

## legacyCreateRootFromDOMContainer

```js
function legacyCreateRootFromDOMContainer(container, forceHydrate): Root {
    const shouldHydrate =
        forceHydrate || shouldHydrateDueToLegacyHeuristic(container);
    // First clear any existing content.
    if (!shouldHydrate) {
        let warned = false;
        let rootSibling;
        while ((rootSibling = container.lastChild)) {
            if (__DEV__) {
                if (
                    !warned &&
                    rootSibling.nodeType === ELEMENT_NODE &&
                    (rootSibling: any).hasAttribute(ROOT_ATTRIBUTE_NAME)
                ) {
                    warned = true;
                    warningWithoutStack(
                        false,
                        "render(): Target node has markup rendered by React, but there " +
                            "are unrelated nodes as well. This is most commonly caused by " +
                            "white-space inserted around server-rendered markup."
                    );
                }
            }
            container.removeChild(rootSibling);
        }
    }
    if (__DEV__) {
        if (shouldHydrate && !forceHydrate && !warnedAboutHydrateAPI) {
            warnedAboutHydrateAPI = true;
            lowPriorityWarning(
                false,
                "render(): Calling ReactDOM.render() to hydrate server-rendered markup " +
                    "will stop working in React v17. Replace the ReactDOM.render() call " +
                    "with ReactDOM.hydrate() if you want React to attach to the server HTML."
            );
        }
    }
    // Legacy roots are not async by default.
    const isConcurrent = false;
    return new ReactRoot(container, isConcurrent, shouldHydrate);
}
```
