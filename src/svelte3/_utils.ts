export {
    computeAlt,
    computeData,
    computeMagnifierStyle,
    computePictureData,
    computePlaceholderStyle,
    computeStyle,
    computeWrapperClass,
    computeWrapperStyle,
} from "../_/compute.js";
export { getDataAttributeName } from "../_/config.js";
export { installTwicPics } from "../_/install.js";
export { default as initMagnifier } from "../_/magnifier";
export { Observer } from "../_/Observer.js";
export {
    parseAlt,
    parseAnchor,
    parseAnchors,
    parseBot,
    parseClassName,
    parseDuration,
    parseFocus,
    parseFocuses,
    parseFrom,
    parseIntrinsic,
    parseMode,
    parseEager,
    parseMediaTag,
    parsePlaceholder,
    parsePosition,
    parsePreTransform,
    parseRatio,
    parseRatios,
    parseRefit,
    parseSizes,
    parseTo,
    parseSrc,
    parseStep,
    parseTitle,
    parseTransition,
    parseTransitionDelay,
    parseTransitionDuration,
    parseTransitionTimingFunction,
    parseZoom,
} from "../_/parse.js";
export {
    preComputeArtDirectives,
    preComputePlaceholder,
    preComputeVideoOptions,
} from "../_/preCompute.js";
export type {
    Attributes,
    Anchor,
    Environment,
    Mode,
    Options,
    Placeholder,
    State,
    StateEvent,
    VideoOptions,
} from "../_/types.js";
export { isBrowser, isWebComponents } from "../_/utils.js";

export const styleToString = ( properties: Record< string, string > ): string => (
    Object.keys( properties ).length ?
        Object.entries( properties ).flatMap(
            ( [ p, v ] ) => (
                v ?
                    [ `${ p.replace( /([a-z]|(?=[A-Z]))([A-Z])/g, `$1-$2` ).toLowerCase() }:${ v };` ] :
                    []
            )
        ).join( `` ) :
        undefined
);
