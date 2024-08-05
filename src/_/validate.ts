import type {
    Anchor,
    Mode,
    Placeholder,
    Environment,
    FetchPriority,
    CrossOrigin,
    Decoding,
    ReferrerPolicy,
} from "./types";
import { trimRegExpFactory } from "./utils";

export const validAnchors: Array< Anchor > = [ `center` ];
for ( const y of [ ``, `bottom`, `top` ] ) {
    for ( const x of [ ``, `left`, `right` ] ) {
        if ( x || y ) {
            // eslint-disable-next-line no-nested-ternary
            validAnchors.push( ( y ? ( x ? `${ y }-${ x }` : y ) : x ) as Anchor );
        }
    }
}
export const rInvalidPath = /\?|^\/*$/;
export const rValidAnchor = trimRegExpFactory( validAnchors );
export const validCrossOrigins: Array< CrossOrigin > = [ `anonymous`, `none`, `use-credentials` ];
export const rValidCrossOrigin = trimRegExpFactory( validCrossOrigins );
export const validDecodings: Array< Decoding > = [ `async`, `auto`, `none`, `sync` ];
export const rValidDecoding = trimRegExpFactory( validDecodings );
export const rValidDomain = /(^https?:\/\/[^/]+)\/*$/;
export const validEnvironment: Array< Environment > = [ `debug`, `offline`, `production` ];
export const rValidEnvironment = trimRegExpFactory( validEnvironment );
export const validFetchPriorities: Array< FetchPriority > = [ `high`, `low`, `auto` ];
export const rValidFetchPriority = trimRegExpFactory( validFetchPriorities );
export const rValidId = trimRegExpFactory( `[^\\s]*` );
export const rValidIntrinsic = trimRegExpFactory( `\\s*(\\d+)\\s*[x]\\s*(\\d+)\\s*` );
export const validModes: Array< Mode > = [ `contain`, `cover` ];
export const rValidMode = trimRegExpFactory( validModes );
export const validPlaceholders: Array< Placeholder > = [ `maincolor`, `meancolor`, `none`, `preview` ];
export const rValidPlaceholder = trimRegExpFactory( validPlaceholders );
export const rValidPath = /^\/*(.+?)\/*$/;
export const rValidRatio = trimRegExpFactory( `(\\d+(?:\\.\\d+)?)(?:\\s*[\\/:]\\s*(\\d+(?:\\.\\d+)?))?|(none)` );
export const validReferrerPolicies: Array< ReferrerPolicy > = [
    `no-referrer`,
    `no-referrer-when-downgrade`,
    `none`,
    `origin`,
    `origin-when-cross-origin`,
    `same-origin`,
    `strict-origin`,
    `strict-origin-when-cross-origin`,
    `unsafe-url`,
];
export const rValidReferrerPolicy = trimRegExpFactory( validReferrerPolicies );
export const rValidTabIndex = trimRegExpFactory( `\\d*` );
export const rValidZoom = trimRegExpFactory( `(\\d+\\.?\\d*)|(css)`, {
    "regExpFlags": `i`,
} );
