import type Vue from "vue";
interface Register {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: any,
    componentName: string,
    tag?: string,
}

export default ( VueObject: typeof Vue, options: Register ): void => {
    const { component, componentName, tag } = options;
    const { computed } = component;
    VueObject.component(
        componentName,
        {
            ...component,
            "name": componentName,
            "computed": {
                ...computed,
                ...(
                    tag ? {
                        "_is": () => tag,
                    } : {}
                ),
            },
        }
    );
};
