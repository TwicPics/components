export {
    computeAlt,
    computeData,
    computePlaceholderStyle,
    computeStyle,
    computeWrapperClass,
    computeWrapperStyle,
} from "../_/compute";
export { default as installTwicPics, getDataAttributeName } from "../_/install";
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
} from "../_/parse";
export type {
    Attributes as BaseAttributes,
    Anchor,
    Environment,
    Media,
    Mode,
    Placeholder,
    State,
    StateEvent,
} from "../_/types";
export { isBrowser, isWebComponents } from "../_/utils";
export { Observer } from "../_/Observer";

export const styleToString = ( properties: Record< string, string > ): string =>
    Object.entries( properties )
        .flatMap( ( [ p, v ] ) => (
            v ?
                [ `${ p.replace( /([a-z]|(?=[A-Z]))([A-Z])/g, `$1-$2` ).toLowerCase() }:${ v };` ] :
                []
        ) )
        .join( `` );
