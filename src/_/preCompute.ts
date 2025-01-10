
/* eslint max-params: off */
import type { Placeholder, VideoOptions } from "./types";
import { urlInfos } from "./url";

export const preComputeVideoOptions = (
    duration: number,
    from: number,
    posterFrom: number,
    to: number
): VideoOptions => ( {
    "videoTransform": `${
            from ? `/from=${ from }` : ``
        }${
            to ? `/to=${ to }` : ``
        }${
            duration ? `/duration=${ duration }` : ``
        }`,
    "posterTransform": `${
            ( posterFrom || from ) ? `/from=${ posterFrom === undefined ? from : posterFrom }` : ``
        }`,
} );

export const preComputePlaceholder = ( placeholder: Placeholder, src: string ) =>
    ( urlInfos( src ).isSpecial ? undefined : placeholder );
