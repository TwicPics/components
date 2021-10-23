import type { Options as BaseOptions } from "../_/types";
import type { PluginFunction, default as Vue } from "vue";
import { default as install } from "../_/install";
import register from "./register";
import { throwError } from "../_/utils";

interface Options extends BaseOptions {
    TwicImg?: string,
    TwicVideo?: string,
}

const plugin: PluginFunction< Options > = ( VueObject: typeof Vue, options?: Options ): void => {
    install( options );
    if ( options.TwicImg && ( options.TwicImg === options.TwicVideo ) ) {
        throwError( `TwicImg and TwicVideo components must have different names` );
    }
    register( VueObject, options.TwicImg || `TwicImg`, `img` );
    register( VueObject, options.TwicVideo || `TwicVideo`, `video` );
};

export default plugin;
