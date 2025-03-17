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
    __BACKGROUND_COMPONENT__?: string,
    __IMG_COMPONENT__?: string,
    __PICTURE_COMPONENT__?: string,
    __VIDEO_COMPONENT__?: string,
    __VIEW_COMPONENT__?: string,
    [ key: string]: number | boolean | string | { [ key in BreakPoint ]?: number };
}

const componentNames: string[] = [
    `__IMG_COMPONENT__`,
    `__VIEW_COMPONENT__`,
    `__VIDEO_COMPONENT__`,
    `__PICTURE_COMPONENT__`,
];

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
        "componentName": options.__BACKGROUND_COMPONENT__ || `__BACKGROUND_COMPONENT__`,
    } );
    register( VueObject, {
        "component": TwicImg,
        "componentName": options.__IMG_COMPONENT__ || `__IMG_COMPONENT__`,
    } );
    register( VueObject, {
        "component": TwicPicture,
        "componentName": options.__PICTURE_COMPONENT__ || `__PICTURE_COMPONENT__`,
    } );
    register( VueObject, {
        "component": TwicVideo,
        "componentName": options.__VIDEO_COMPONENT__ || `__VIDEO_COMPONENT__`,
    } );
    register( VueObject, {
        "component": TwicView,
        "componentName": options.__VIDEO_COMPONENT__ || `__VIEW_COMPONENT__`,
    } );
};
export default plugin;
