import type { Anchor, Mode, Placeholder, Environment } from "./types";
import { trimRegExpFactory } from "./utils";

export const validAnchors: Array< Anchor > = [];
for ( const y of [ ``, `bottom`, `top` ] ) {
    for ( const x of [ ``, `left`, `right` ] ) {
        if ( x || y ) {
            // eslint-disable-next-line no-nested-ternary
            validAnchors.push( ( y ? ( x ? `${ y }-${ x }` : y ) : x ) as Anchor );
        }
    }
}
export const rValidAnchors = trimRegExpFactory( validAnchors );

export const validModes: Array< Mode > = [ `contain`, `cover` ];
export const rValidMode = trimRegExpFactory( validModes );

export const validPlaceholders: Array< Placeholder > = [ `maincolor`, `meancolor`, `none`, `preview` ];
export const rValidPlaceholder = trimRegExpFactory( validPlaceholders );

export const rValidRatio = trimRegExpFactory( `(\\d+(?:\\.\\d+)?)(?:\\s*[\\/:]\\s*(\\d+(?:\\.\\d+)?))?|(none)` );

export const validEnvironment: Array< Environment > = [ `debug`, `offline`, `production` ];
export const rValidEnvironment = trimRegExpFactory( validEnvironment );