export {
    computeAlt,
    computeData,
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
} from "../_/parse.js";
export type {
    Attributes as BaseAttributes,
    Anchor,
    Environment,
    Media,
    Mode,
    Placeholder,
    State,
    StateEvent,
} from "../_/types.js";
export { isBrowser, isWebComponents } from "../_/utils.js";
export { Observer } from "../_/Observer.js";

export const styleToString = ( properties: Record< string, string > ): string =>
    Object.entries( properties )
        .flatMap( ( [ p, v ] ) => (
            v ?
                [ `${ p.replace( /([a-z]|(?=[A-Z]))([A-Z])/g, `$1-$2` ).toLowerCase() }:${ v };` ] :
                []
        ) )
        .join( `` );
