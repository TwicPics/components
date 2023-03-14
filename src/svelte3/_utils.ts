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
    parseFocus,
    parseIntrinsic,
    parseMode,
    parseEager,
    parsePlaceholder,
    parsePosition,
    parsePreTransform,
    parseRatio,
    parseSrc,
    parseStep,
    parseTransition,
    parseTransitionDelay,
    parseTransitionDuration,
    parseTransitionTimingFunction,
    parseZoom,
} from "../_/parse.js";
export type {
    Attributes as BaseAttributes,
    Anchor,
    Environment,
    Mode,
    Options,
    Placeholder,
    State,
    StateEvent,
} from "../_/types.js";
export { isBrowser, isWebComponents } from "../_/utils.js";
export { Observer } from "../_/Observer.js";
export { Magnifier } from "../_/Magnifier.js";

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