import type { Options as BaseOptions, OptionalString } from "../_/types";
import type { PluginFunction, default as Vue } from "vue";
import { default as install, installError } from "../_/install";
import register from "./register";

interface Options extends BaseOptions {
    TwicImg?: OptionalString,
    TwicVideo?: OptionalString,
}

const plugin: PluginFunction< Options > = ( VueObject: typeof Vue, options?: Options ): void => {
    if ( !options ) {
        installError( `no option provided` );
    }
    if ( options.TwicImg && ( options.TwicImg === options.TwicVideo ) ) {
        installError( `TwicImg and TwicVideo components must have different names` );
    }
    install( options );
    register( VueObject, options.TwicImg || `TwicImg`, `img` );
    register( VueObject, options.TwicVideo || `TwicVideo`, `video` );
};

export default plugin;
