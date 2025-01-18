import { parseRole } from "../_/parse.js";
export {
    computeData,
    computeMagnifierStyle,
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
// eslint-disable-next-line no-duplicate-imports
export {
    parseAlt,
    parseAnchor,
    parseAnchors,
    parseBot,
    parseClassName,
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
    parseStyle,
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
export { parseRole };
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
    Mode,
    Options,
    Placeholder,
    ReferrerPolicy,
    ScriptAttributes,
    State,
    StateEvent,
    VideoOptions,
} from "../_/types.js";
export { isBrowser, isWebComponents } from "../_/utils.js";
import { get_current_component as getCurrentComponent } from "svelte/internal";
import type { HtmlDivAttributes } from "./type.js";
export { getCurrentComponent };

export const styleToString = ( style: Record< string, unknown > ): string | undefined => {
    if ( ( !style ) || ( Object.keys( style ).length === 0 ) ) {
        return undefined;
    }
    return Object.entries( style )
        .filter( ( [ , v ] ) => v )
        .map( ( [ p, v ] ) => `${ p.replace( /([a-z])([A-Z])/g, `$1-$2` ).toLowerCase() }:${ v };` )
        .join( `` );
};

export const splitProperties = < T extends HtmlDivAttributes >(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { id, "class": _class, draggable, role, tabindex, ...props }: T
) => (
        {
            "hostProps": {
                ...Object.fromEntries(
                    Object.entries( props )
                        .filter( ( [ key ] ) => key.startsWith( `aria-` ) )
                ),
                id,
                draggable,
                "role": parseRole( role ),
                tabindex,
            },
            "mediaProps": {
                ...props,
            },
        }
    );
