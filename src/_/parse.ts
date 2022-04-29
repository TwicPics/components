/* eslint max-lines: "off", no-shadow: [ "error", { "allow": [ "focus" ] } ] */
import type { Mode, Placeholder, Transition } from "./types";
import { logWarning, trimRegExpFactory } from "./utils";
import { config } from "./install";
import { rValidMode, rValidPlaceholder, rValidRatio } from "./validation";

const rImage = /^(image:)?\/?/;

const regExpFinderFactory = < T = string >( regExp: RegExp, filter: ( ( value: T ) => T ) = undefined ) =>
    ( value: T | string ): T => {
        let found;
        if ( value ) {
            ( value as string ).replace( regExp, ( _, v ) => ( found = v ) );
        }
        return filter ? filter( found ) : found;
    };

const isPositiveNumber = ( value: number ) => !isNaN( value ) && ( value > 0 );
const trimOrUndefined = regExpFinderFactory( trimRegExpFactory( `.+?` ) );

export const parseAlt = trimOrUndefined;

export const parseBot = trimOrUndefined;

export const parseClassName = trimOrUndefined;

export const parseFocus = trimOrUndefined;

export const parseMode = regExpFinderFactory< Mode >( rValidMode );

export const parsePlaceholder = ( placeholder: Placeholder, src:string ) : Placeholder => {
    if ( ( config.mode === `offline` ) || !trimOrUndefined( src ) || ( placeholder === `none` ) ) {
        return undefined;
    }
    return rValidPlaceholder.test( placeholder ) ? placeholder : `preview`;
};

export const parsePosition = trimOrUndefined;

export const parseRatio = ( value: number | string ): number => {
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

export const parseSrc = ( value: string ): string => {
    // eslint-disable-next-line no-param-reassign
    value = trimOrUndefined( value );
    if ( !value ) {
        logWarning( `src is not provided` );
    }
    // eslint-disable-next-line no-nested-ternary
    return config.mode === `offline` ?
        `` : ( value ? value.replace( rImage, `image:${ config.path }` ) : `placeholder:red` );
};

export const parseTransition = ( value: boolean | string ): Transition[] => {
    const mapping: { [ key: string ]: Transition; } = {
        "true": `fade`,
        "false": `none`,
        "fade": `fade`,
        "zoom": `zoom`,
        "none": `none`,
    };

    if ( typeof value !== `boolean` ) {
        // eslint-disable-next-line no-param-reassign
        value = trimOrUndefined( value ) || true;
    }

    let parsedTransition:Transition[] = String( value )
        .split( /\s+(?!\+)|\s*\+\s*/ )
        .map( transition => mapping[ transition ] || `fade` );

    if ( parsedTransition.includes( `none` ) ) {
        // if `none` is present, any other values are not considered
        parsedTransition = [ `none` ];
    }

    return parsedTransition;
};

export const parseTransitionDelay = trimOrUndefined;

export const parseTransitionDuration = trimOrUndefined;

// eslint-disable-next-line id-length
export const parseTransitionTimingFunction = trimOrUndefined;
