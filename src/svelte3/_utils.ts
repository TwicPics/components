export {
    computeAlt,
    computeData,
    computeHostAttributes,
    computeMagnifierStyle,
    computePicture,
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
    parseDraggable,
    parseDuration,
    parseFetchPriority,
    parseFocus,
    parseFocuses,
    parseFrom,
    parseIntrinsic,
    parseMode,
    parseModes,
    parseEager,
    parseMediaTag,
    parsePlaceholder,
    parsePosition,
    parsePositions,
    parsePreTransform,
    parsePreTransforms,
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
    ScriptAttributes,
    State,
    StateEvent,
    VideoOptions,
} from "../_/types.js";
export { isBrowser, isWebComponents } from "../_/utils.js";
import { get_current_component as getCurrentComponent } from "svelte/internal";
export { getCurrentComponent };

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
