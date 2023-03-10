import type { Anchor, Mode, Placeholder, Environment } from "./types";
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
export const rValidAnchor = trimRegExpFactory( validAnchors );
export const rValidIntrinsic = trimRegExpFactory( `\\s*(\\d+)\\s*[x]\\s*(\\d+)\\s*` );
export const validModes: Array< Mode > = [ `contain`, `cover` ];
export const rValidMode = trimRegExpFactory( validModes );
export const validPlaceholders: Array< Placeholder > = [ `maincolor`, `meancolor`, `none`, `preview` ];
export const rValidPlaceholder = trimRegExpFactory( validPlaceholders );
export const rValidRatio = trimRegExpFactory( `(\\d+(?:\\.\\d+)?)(?:\\s*[\\/:]\\s*(\\d+(?:\\.\\d+)?))?|(none)` );
export const validEnvironment: Array< Environment > = [ `debug`, `offline`, `production` ];
export const rValidEnvironment = trimRegExpFactory( validEnvironment );
export const rValidZoom = trimRegExpFactory( `(\\d+\\.?\\d*)|(css)` );
