import type Vue from "vue";
import Base from "./base.vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { computed } = Base as any;

export default ( VueObject: typeof Vue, componentName: string, tag: string ): void => {
    VueObject.component(
        componentName,
        {
            ...Base,
            "name": componentName,
            "computed": {
                "_is": () => tag,
                ...computed,
            },
        }
    );
};
