export {
    computeData,
    computeHostAttributes,
    computeHostStyle,
    computeMediaAttributes,
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
    parseCrossOrigin,
    parseDecoding,
    parseDraggable,
    parseDuration,
    parseFetchPriority,
    parseFocus,
    parseFocuses,
    parseFrom,
    parseId,
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
    parseReferrerPolicy,
    parseRefit,
    parseSizes,
    parseStyle,
    parseTabIndex,
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
    CrossOrigin,
    Decoding,
    Environment,
    HtmlElementAttributes,
    HtmlImageAttributes,
    Mode,
    Options,
    Placeholder,
    ReferrerPolicy,
    ScriptAttributes,
    State,
    StateEvent,
    VideoOptions,
} from "../_/types.js";
export { isBrowser, isWebComponents, sanitize } from "../_/utils.js";
import { get_current_component as getCurrentComponent } from "svelte/internal";
export { getCurrentComponent };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setAttributes = ( attributes: Record< string, unknown >, hostElement: any ): void => {
    Object.entries( attributes ).forEach( ( [ attribute, value ] ) => {
        if (
            ( value === undefined ) ||
            (
                ( typeof value === `object` ) &&
                ( Object.keys( value || {} ).length === 0 )
            )
        ) {
            hostElement.removeAttribute( attribute );
        } else {
            hostElement.setAttribute( attribute, value );
        }
    } );
};

export const styleToString = ( properties: Record< string, unknown > ): string => (
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
