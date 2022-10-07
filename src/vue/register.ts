import type Vue from "vue";
interface Register {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: any,
    componantName: string,
    tag?: string,
}

export default ( VueObject: typeof Vue, options: Register ): void => {
    const { component, componantName, tag } = options;
    const { computed } = component;
    VueObject.component(
        componantName,
        {
            ...component,
            "name": componantName,
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
