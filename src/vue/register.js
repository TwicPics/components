/* eslint-disable prefer-object-spread */
import Base from "./base.vue";

const { props, computed } = Base;

const propsWithAlt = Object.assign( {
    "alt": {
        "type": String,
        "default": undefined,
    },
}, props );

export default ( Vue, componentName, tagName, hasAlt ) => Vue.component( componentName, {
    ...Base,
    "name": componentName,
    "props": hasAlt ? propsWithAlt : props,
    "computed": Object.assign( {
        "_is": () => tagName,
    }, computed ),
} );
