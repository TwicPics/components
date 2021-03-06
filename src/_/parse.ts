/* eslint max-lines: "off", no-shadow: [ "error", { "allow": [ "focus" ] } ] */
import type { Mode, Placeholder, Transition } from "./types";
import { logWarning, trimRegExpFactory } from "./utils";
import { config } from "./install";
import { rValidMode, rValidPlaceholder, rValidRatio } from "./validation";

const rImage = /^(image:)?\/?/;

const rPreTransform = /(\/*)(.*[^/])(\/*)/;

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
    if ( ( config.env === `offline` ) || !trimOrUndefined( src ) || ( placeholder === `none` ) ) {
        return undefined;
    }
    return rValidPlaceholder.test( placeholder ) ? placeholder : `preview`;
};

export const parsePosition = trimOrUndefined;

export const parsePreTransform = ( value = `` ): string => (
    rPreTransform.test( value ) ? value.replace( rPreTransform, `$2/` ) : ``
);

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

export const parseSrc = ( value: string ): string => {
    // eslint-disable-next-line no-param-reassign
    value = trimOrUndefined( value );
    if ( !value ) {
        logWarning( `src is not provided` );
    }
    // eslint-disable-next-line no-nested-ternary
    return config.env === `offline` ?
        `` : ( value ? value.replace( rImage, `image:${ config.path }` ) : `placeholder:red` );
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
