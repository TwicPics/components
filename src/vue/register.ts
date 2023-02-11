import type Vue from "vue";
interface Register {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: any,
    componentName: string
}

export default ( VueObject: typeof Vue, options: Register ): void => {
    const { component, componentName } = options;
    const { computed } = component;
    VueObject.component(
        componentName,
        {
            ...component,
            "name": componentName,
            "computed": {
                ...computed,
            },
        }
    );
};
