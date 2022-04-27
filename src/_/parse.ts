/* eslint max-lines: "off", no-shadow: [ "error", { "allow": [ "focus" ] } ] */
import { Mode, Placeholder, Transition, rValidMode, rValidPlaceholder, rValidRatio } from "./types";
import { logError, regExpFinderFactory, trimRegExpFactory } from "./utils";
import { config } from "./install";

const rImage = /^(image:)?\/?/;

const isPositiveNumber = ( value: number ) => !isNaN( value ) && ( value > 0 );
const trimOrUndefined = regExpFinderFactory( trimRegExpFactory( `.+?` ) );

export const parseAlt = trimOrUndefined;

export const parseBot = trimOrUndefined;

export const parseClassName = trimOrUndefined;

export const parseFocus = trimOrUndefined;

export const parseMode = regExpFinderFactory< Mode >( rValidMode );

export const parsePlaceholder = regExpFinderFactory< Placeholder >(
    rValidPlaceholder,
    // eslint-disable-next-line no-nested-ternary
    ( value: Placeholder ) => ( value ? ( ( value === `none` ) ? undefined : value ) : `preview` )
);

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
        logError( `src is mandatory` );
        return undefined;
    }
    return value.replace( rImage, `image:${ config.path }` );
};

export const parseTransition = ( value: boolean | string ): Transition[] => {
    const mapping: { [key: string]: Transition; } = {
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
        .split( `+` )
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
