/* eslint-disable no-nested-ternary */
/* eslint max-lines: "off", no-shadow: [ "error", { "allow": [ "focus" ] } ] */
import type { AnchorObject, Mode, Placeholder, Transition } from "./types";
import { isReactNative, logWarning, regExpFinderFactory, trimRegExpFactory } from "./utils";
import { config } from "./install";
import { rValidIntrinsic, rValidMode, rValidPlaceholder, rValidRatio } from "./validate";

const rImage = /^(image:)?\/*/;

const isPositiveNumber = ( value: number ) => !isNaN( value ) && ( value > 0 );
const trimOrUndefined = regExpFinderFactory( trimRegExpFactory( `.+?` ) );
const trimTransformOrUndefined = trimRegExpFactory( `.+?`, `[\\s\\/]` );

const rAnchor = /\b(?:(left|right)|(bottom|top))\b/g;

export const parseAnchor = ( anchor: string ) : AnchorObject => {
    const trimmed = trimOrUndefined( anchor );
    let x;
    let y;
    if ( trimmed ) {
        let tmp;
        while ( ( tmp = rAnchor.exec( trimmed ) ) ) {
            if ( tmp[ 1 ] ) {
                // eslint-disable-next-line prefer-destructuring
                x = tmp[ 1 ];
            } else {
                // eslint-disable-next-line prefer-destructuring
                y = tmp[ 2 ];
            }
        }
    }
    return {
        x,
        y,
    };
};

export const parseAlt = trimOrUndefined;

export const parseBot = ( value: string ) => ( typeof value === `string` ? value.trim() : undefined );

export const parseClassName = trimOrUndefined;

export const parseFocus = trimOrUndefined;

export const parseIntrinsic = ( value: string ): string => {
    if ( !value ) {
        return undefined;
    }
    let parsedIntrinsic: string;
    const parsed = rValidIntrinsic.exec( value );
    if ( parsed ) {
        const [ , , width, height ] = parsed;
        parsedIntrinsic = `${ width }x${ height }`;
    }
    return parsedIntrinsic;
};

const mappingEager: { [ key: string ]: boolean; } = {
    "true": true,
    "false": false,
    "": true,
};
export const parseEager = ( value: boolean | string ): boolean => {
    if ( typeof value === `boolean` ) {
        return value;
    }
    if ( value === undefined ) {
        return false;
    }
    return mappingEager[ value.trim() ] || false;
};

export const parseMediaTag = trimOrUndefined;

export const parseMode = regExpFinderFactory< Mode >( rValidMode );

export const parsePlaceholder = ( placeholder: Placeholder ) : Placeholder => {
    if ( ( config.env === `offline` ) || ( placeholder === `none` ) ) {
        return undefined;
    }
    return rValidPlaceholder.test( placeholder ) ? placeholder : `preview`;
};

export const parsePosition = trimOrUndefined;

export const parsePreTransform = regExpFinderFactory( trimTransformOrUndefined, p => p && `${ p }/` );

export const parseRatio = ( value: number | string ): number => {
    if ( value === `none` ) {
        return 0;
    }
    let number: number;
    if ( typeof value === `number` ) {
        number = value;
    } else if ( value ) {
        const parsed = rValidRatio.exec( value );
        if ( parsed ) {
            const [ , , width, height ] = parsed;
            number = ( height ? Number( height ) : 1 ) / Number( width );
        } else {
            number = 1;
        }
    }
    return isPositiveNumber( number ) ? number : undefined;
};

export const parseStep = ( value: number | string ): number => {
    if ( typeof value !== `number` ) {
        const trimmed = trimOrUndefined( value );
        // eslint-disable-next-line no-param-reassign
        value = trimmed && Number( trimmed );
    }
    return isPositiveNumber( value ) ? value : undefined;
};

const computeSrc = ( value:string ) =>
    ( value ? value.replace( rImage, `image:${ config.path }` ) : `placeholder:red` );
export const parseSrc = ( value: string ): string => {
    // eslint-disable-next-line no-param-reassign
    value = trimOrUndefined( value );
    if ( !value ) {
        logWarning( `src is not provided` );
    }

    if ( isReactNative ) {
        return computeSrc( value );
    }
    // eslint-disable-next-line no-nested-ternary
    return config.env === `offline` ? `` : computeSrc( value );
};

const mappingTransition: { [ key: string ]: Transition; } = {
    "true": `fade`,
    "false": `none`,
    "fade": `fade`,
    "zoom": `zoom`,
    "none": `none`,
};

export const parseTransition = ( value: boolean | string ): Record< string, boolean > => {

    if ( typeof value !== `boolean` ) {
        // eslint-disable-next-line no-param-reassign
        value = trimOrUndefined( value ) || true;
    }

    const parsedTransition:Record< string, boolean > = {};

    String( value )
        .split( /\s*\+\s*|\s+/ )
        // eslint-disable-next-line no-return-assign
        .forEach( t => parsedTransition[ `${ mappingTransition[ t ] || `fade` }` ] = true );

    return parsedTransition;
};

export const parseTransitionDelay = trimOrUndefined;

export const parseTransitionDuration = trimOrUndefined;

// eslint-disable-next-line id-length
export const parseTransitionTimingFunction = trimOrUndefined;

export const parseZoom = ( value: number | string ): number => {
    if ( typeof value !== `number` ) {
        const trimmed = trimOrUndefined( value );
        // eslint-disable-next-line no-param-reassign
        value = trimmed && Number( trimmed );
    }
    return isPositiveNumber( value ) ?
        ( value > 1 ? value : undefined ) :
        undefined;
};
