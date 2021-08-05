import type { Config } from "../_/types";
import type { PluginFunction, default as Vue } from "vue";
import { default as install } from "../_/install";
import register from "./register";

const plugin: PluginFunction< Config > = ( VueObject: typeof Vue, config: Config ): void => {
    install( config );
    register( VueObject, `TwicImg`, `img` );
    register( VueObject, `TwicVideo`, `video` );
};

export default plugin;
