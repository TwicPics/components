import type { Options as BaseOptions } from "../_/types";
import type { PluginFunction, default as Vue } from "vue";
import { default as install } from "../_/install";
import register from "./register";
import ImgVideo from "./img-video.vue";
import View from "./View.vue";
import { throwError } from "../_/utils";

interface Options extends BaseOptions {
    TwicImg?: string,
    TwicVideo?: string,
    TwicView?:string,
}

const plugin: PluginFunction< Options > = ( VueObject: typeof Vue, options?: Options ): void => {
    install( options );
    if ( options.TwicImg && ( options.TwicImg === options.TwicVideo ) ) {
        throwError( `TwicImg and TwicVideo components must have different names` );
    }
    if ( options.TwicView && ( options.TwicView === options.TwicImg ) ) {
        throwError( `TwicView and TwicImg components must have different names` );
    }
    if ( options.TwicView && ( options.TwicView === options.TwicVideo ) ) {
        throwError( `TwicView and TwicVideo components must have different names` );
    }
    register( VueObject, {
        "component": ImgVideo,
        "componantName": options.TwicImg || `TwicImg`,
        "tag": `img`,
    } );
    register( VueObject, {
        "component": ImgVideo,
        "componantName": options.TwicVideo || `TwicVideo`,
        "tag": `video`,
    } );
    register( VueObject, {
        "component": View,
        "componantName": options.TwicView || `TwicView`,
    } );
};

export default plugin;
