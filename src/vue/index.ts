import type { Options } from "../_/types";
import type { PluginFunction, default as Vue } from "vue";
import { default as install } from "../_/install";
import register from "./register";

const plugin: PluginFunction< Options > = ( VueObject: typeof Vue, options: Options ): void => {
    install( options );
    register( VueObject, `TwicImg`, `img` );
    register( VueObject, `TwicVideo`, `video` );
};

export default plugin;
