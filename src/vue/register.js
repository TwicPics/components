import Base from "./base.vue";
import { computeAlt } from "../_/compute.js";

const { props, computed } = Base;

export default ( Vue, componentName, tagName, hasAlt ) => Vue.component( componentName, {
    ...Base,
    "name": componentName,
    "props": hasAlt ? {
        ...props,
        "alt": {
            "type": String,
            "default": undefined,
        },
    } : props,
    "computed": {
        ...computed,
        _alt() {
            return hasAlt ? computeAlt( this ) : undefined;
        },
        "_is": () => tagName,
    },
} );
