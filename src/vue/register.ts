import type Vue from "vue";
import Base from "./base.vue";

const { computed } = Base as any;

export default ( VueObject: typeof Vue, name: string, tag: string ): void => {
    VueObject.component(
        name,
        {
            ...Base,
            name,
            "computed": {
                "_is": () => tag,
                ...computed,
            },
        }
    );
};
