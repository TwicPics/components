import type { VideoOptions } from "./types";

export const preComputeVideoOptions = (
    duration: number,
    from: number,
    posterFrom: number,
    to: number
): VideoOptions => ( {
    "videoTransform": `${
            from ? `from=${ from }/` : ``
        }${
            to ? `to=${ to }/` : ``
        }${
            duration ? `duration=${ duration }/` : ``
        }`,
    "posterTransform": `${
            ( posterFrom || from ) ? `from=${ posterFrom || from }/` : ``
        }`,
} );
