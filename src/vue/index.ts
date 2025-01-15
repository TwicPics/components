import type { Options as BaseOptions, BreakPoint } from "../_/types";
import type { PluginFunction, default as Vue } from "vue";
import { installTwicPics } from "../_/install";
import register from "./register";
import TwicBackground from "./TwicBackground.vue";
import TwicImg from "./TwicImg.vue";
import TwicPicture from "./TwicPicture.vue";
import TwicVideo from "./TwicVideo.vue";
import TwicView from "./TwicView.vue";
import { throwError } from "../_/utils";

interface Options extends BaseOptions {
    TwicBackground?: string,
    TwicImg?: string,
    TwicPicture?: string,
    TwicVideo?: string,
    TwicView?: string,
    [ key: string]: number | boolean | string | { [ key in BreakPoint ]?: number };
}

const componentNames: string[] = [ `TwicImg`, `TwicView`, `TwicVideo`, `TwicPicture` ];

const plugin: PluginFunction< Options > = ( VueObject: typeof Vue, options?: Options ): void => {
    installTwicPics( options );

    for ( let i = 0; i < componentNames.length; i++ ) {
        for ( let j = i + 1; j < componentNames.length; j++ ) {
            if (
                options[ componentNames[ i ] ] &&
                ( options[ componentNames[ i ] ] === options[ componentNames[ j ] ] )
            ) {
                throwError(
                  `${ componentNames[ i ] } and ${ componentNames[ j ] } components must have different names`
                );
            }
        }
    }

    register( VueObject, {
        "component": TwicBackground,
        "componentName": options.TwicBackground || `__BACKGROUND_COMPONENT__`,
    } );
    register( VueObject, {
        "component": TwicImg,
        "componentName": options.TwicImg || `__IMG_COMPONENT__`,
    } );
    register( VueObject, {
        "component": TwicPicture,
        "componentName": options.TwicPicture || `__PICTURE_COMPONENT__`,
    } );
    register( VueObject, {
        "component": TwicVideo,
        "componentName": options.TwicVideo || `__VIDEO_COMPONENT__`,
    } );
    register( VueObject, {
        "component": TwicView,
        "componentName": options.TwicView || `__VIEW_COMPONENT__`,
    } );
};
export default plugin;
