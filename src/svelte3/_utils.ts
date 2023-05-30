export {
    computeAlt,
    computeData,
    computeMagnifierStyle,
    computePlaceholderStyle,
    computeStyle,
    computeWrapperClass,
    computeWrapperStyle,
} from "../_/compute.js";
export { default as installTwicPics, getDataAttributeName } from "../_/install.js";
export {
    parseAlt,
    parseAnchor,
    parseBot,
    parseClassName,
    parseDuration,
    parseFocus,
    parseFrom,
    parseIntrinsic,
    parseMode,
    parseEager,
    parseMediaTag,
    parsePlaceholder,
    parsePosition,
    parsePreTransform,
    parseRatio,
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
    preComputeVideoOptions,
    preComputePlaceholder,
} from "../_/preCompute.js";
export type {
    Attributes as BaseAttributes,
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
export { default as initMagnifier } from "../_/magnifier";
export { Observer } from "../_/Observer.js";

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
