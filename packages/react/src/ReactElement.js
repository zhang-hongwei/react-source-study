// import { Children } from "react";

const hasOwnProperty = Object.prototype.hasOwnProperty;

// 预留属性， key，ref
const RESERVED_PROPS = {
    key: true,
    ref: true,
    __self: true,
    __source: true
};

function createElement(type, config, children) {
    let propName;
    const props = {};

    let key = null;
    let ref = null;
    let self = null;
    let source = null;

    // 提取除了预留属性外的其他属性
    for (propName in config) {
        if (
            hasOwnProperty.call(config, propName) &&
            !RESERVED_PROPS.hasOwnProperty(propName)
        ) {
            props[propName] = config[propName];
        }
    }

    // 提取children, children可以为多个，从第三个开始
    const childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
        props.children = children;
    } else if (childrenLength > 1) {
        const childrenAry = Array(childrenLength);
        for (let i = 0; i < childrenLength; i++) {
            childrenAry[i] = arguments[i + 2];
        }

        props.children = childrenAry;
    }

    // 处理defaultProps,  type可以为字符串，函数组件，class组件，class时可以有默认属性
    if (type && type.defaultProps) {
        const defaultProps = type.defaultProps;
        for (propName in defaultProps) {
            if (props[propName] === undefined) {
                props[propName] = defaultProps[propName];
            }
        }
    }

    return ReactElement(type, key, ref, self, source, {}, props);
}

function ReactElement(type, key, ref, self, source, owner, props) {
    const element = {
        $$typeof: "fsdfsfsdf",

        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,

        // Record the component responsible for creating this element.
        _owner: owner
    };

    return element;
}
