/* eslint max-lines: "off", no-shadow: [ "error", { "allow": [ "focus" ] } ] */
import { isValidMode, isValidPlaceholder, Mode, Placeholder } from "./types";
import { logError } from "./utils";

const rImage = /^(image:)?\/?/;

const isPositiveNumber = ( value: number ) => !isNaN( value ) && ( value > 0 );
const trimOrUndefined = ( value: string ): string => ( value && value.trim() ) || undefined;

export const parseAlt = trimOrUndefined;

export const parseBot = trimOrUndefined;

export const parseClassName = trimOrUndefined;

export const parseFocus = trimOrUndefined;

export const parseMode = ( value: Mode | string ): Mode => {
    const trimmed = trimOrUndefined( value );
    return trimmed && isValidMode( trimmed ) ? trimmed as Mode : undefined;
};

export const parsePlaceholder = ( value: Placeholder | string ): Placeholder => {
    const trimmed = trimOrUndefined( value );
    return trimmed && isValidPlaceholder( trimmed ) ? trimmed as Placeholder : `preview`;
};

export const parsePosition = trimOrUndefined;

export const parseRatio = ( value: number | string ): number => {
    let number: number;
    if ( typeof value === `number` ) {
        number = value;
    } else if ( value ) {
        const [ width, height ] = value.split( `/` ).map( Number );
        number = ( ( height === undefined ) ? 1 : height ) / width;
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
        return ``;
    }
    return value.replace( rImage, `image:` );
};

export const parseTransition = ( value: boolean | string ): boolean => {
    if ( typeof value !== `boolean` ) {
        const trimmed = trimOrUndefined( value );
        // eslint-disable-next-line no-param-reassign
        value = !trimmed || Boolean( trimmed );
    }
    return value;
};

export const parseTransitionDelay = trimOrUndefined;

export const parseTransitionDuration = trimOrUndefined;

// eslint-disable-next-line id-length
export const parseTransitionTimingFunction = trimOrUndefined;
