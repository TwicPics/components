import Base from "./base.vue";

const { computed } = Base as any;

export interface ComponentFactory {
    component( name: string, config: Record< string, unknown > ): unknown,
}

export default ( Vue: ComponentFactory, name: string, tag: string ): void => {
    Vue.component(
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
