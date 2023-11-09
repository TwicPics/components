import type { Options as BaseOptions } from "../_/types";
import type { PluginFunction, default as Vue } from "vue";
import { installTwicPics } from "../_/install";
import register from "./register";
import TwicBackground from "./TwicBackground.vue";
import TwicImg from "./TwicImg.vue";
import TwicVideo from "./TwicVideo.vue";
import TwicView from "./TwicView.vue";
import { throwError } from "../_/utils";

interface Options extends BaseOptions {
    TwicBackground?: string,
    TwicImg?: string,
    TwicVideo?: string,
    TwicView?:string,
}

const plugin: PluginFunction< Options > = ( VueObject: typeof Vue, options?: Options ): void => {
    installTwicPics( options );
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
        "component": TwicBackground,
        "componentName": options.TwicBackground || `TwicBackground`,
    } );
    register( VueObject, {
        "component": TwicImg,
        "componentName": options.TwicImg || `TwicImg`,
    } );
    register( VueObject, {
        "component": TwicVideo,
        "componentName": options.TwicVideo || `TwicVideo`,
    } );
    register( VueObject, {
        "component": TwicView,
        "componentName": options.TwicView || `TwicView`,
    } );
};

export default plugin;
