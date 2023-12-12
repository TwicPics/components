/* eslint max-lines: "off", no-shadow: [ "error", { "allow": [ "focus" ] } ] */
import { config } from "./config";
import type { AnchorObject, BreakPoint, Environment, Mode, Placeholder, Transition } from "./types";
import { urlInfos } from "./url";
import { isReactNative, regExpFinderFactory, trimRegExpFactory } from "./utils";
import {
    rValidDomain,
    rValidEnvironment,
    rValidIntrinsic,
    rValidMode,
    rValidPath,
    rValidPlaceholder,
    rValidRatio,
    rValidZoom,
} from "./validate";

const isPositiveNumber = ( value: number ) => !isNaN( value ) && ( value > 0 );
const rMedia = /^((image|media|video):)?\/*/;
export const trimOrUndefined = regExpFinderFactory( trimRegExpFactory( `(?:.|\n)+?` ) );
const trimTransformOrUndefined = trimRegExpFactory( `.+?`, {
    "border": `[\\s\\/]`,
} );

const mappingBoolean: { [ key: string ]: boolean; } = {
    "true": true,
    "false": false,
    "": true,
};
const parseBoolean = ( value: boolean | string ): boolean => {
    if ( typeof value === `boolean` ) {
        return value;
    }
    if ( value === undefined ) {
        return false;
    }
    return mappingBoolean[ value.trim() ];
};

const rBreakPoints = /(?:@(?<breakpoint>xs|sm|md|lg|xl|2xl|\d*)\s+)?(?<value>[^@]+)/gm;
const parseBreakpointsFactory = <T = string, U = string>( parse: ( value: string | U ) => T, _default?: U ) =>
    ( value: T | string ) => {
        const parsedBreakPoints: Record<number, T> = {
            "0": parse( _default ),
        };
        const trimmed = trimOrUndefined( ( value || `` ).toString() );
        if ( trimmed ) {
            let match;
            while ( ( match = rBreakPoints.exec( trimmed ) ) !== null ) {
                const { breakpoint, "value": _value } = match.groups || {};
                const numericBreakPoint = Number( breakpoint || `0` );
                parsedBreakPoints[
                    isNaN( numericBreakPoint ) ? config.breakpoints[ breakpoint as BreakPoint ] : numericBreakPoint
                ] = parse(
                    _value ?
                        _value.replace( /\s*,\s*$/g, `` ) :
                        _default
                );
            }
        }
        return parsedBreakPoints;
    };

const parseNumber = ( value: number | string ): number => {
    if ( typeof value !== `number` ) {
        const trimmed = trimOrUndefined( value );
        // eslint-disable-next-line no-param-reassign
        value = trimmed && Number( trimmed );
    }
    return isPositiveNumber( value ) ? value : undefined;
};

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

export const parseAnchors = parseBreakpointsFactory<AnchorObject>( parseAnchor );

export const parseAlt = ( value: string ) => trimOrUndefined( value ) || ``;

export const parseAnticipation = parseNumber;

export const parseBot = ( value: string ) => ( typeof value === `string` ? value.trim() : undefined );

export const parseClass = trimOrUndefined;

export const parseClassName = trimOrUndefined;

export const parseDebug = parseBoolean;

export const parseDomain = ( value: string ) => {
    const domain = trimOrUndefined( value );
    return rValidDomain.test( domain ) ? domain.replace( rValidDomain, `$1` ) : undefined;
};

export const parseDuration = parseNumber;

export const parseEager = parseBoolean;

export const parseEnv = regExpFinderFactory< Environment >( rValidEnvironment );

export const parseFocus = trimOrUndefined;

export const parseFocuses = parseBreakpointsFactory<string>( parseFocus );

export const parseFrom = parseNumber;

export const parseHandleShadowDom = parseBoolean;

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

export const parseMaxDrp = ( value: number | string ): number => {
    const number = parseNumber( value );
    return number >= 1 ? number : undefined;
};

export const parseMediaTag = ( value: string ): string => {
    const trimmed = trimOrUndefined( value );
    return trimmed && trimmed.toLocaleLowerCase();
};

export const parseMode = regExpFinderFactory< Mode >( rValidMode, {
    "defaultValue": `cover`,
} );

export const parsePath = ( value: string ): string => {
    const path = trimOrUndefined( value );
    return path ? path.replace( rValidPath, `$1/` ) : ``;
};

export const parsePlaceholder = ( placeholder: Placeholder ) : Placeholder => {
    if ( ( config.env === `offline` ) || ( placeholder === `none` ) ) {
        return undefined;
    }
    return rValidPlaceholder.test( placeholder ) ? placeholder : `preview`;
};

export const parsePosition = trimOrUndefined;

export const parsePreTransform = regExpFinderFactory(
    trimTransformOrUndefined,
    {
        "filter": p => p && p.replace( /^\/*(.*[^/])\/*$/, `$1` ),
    }
);

export const parseRatio = ( value: number | string ): number => {
    if ( value === `none` ) {
        return 0;
    }
    let number: number;
    if ( value ) {
        if ( typeof value === `number` ) {
            number = 1 / value;
        } else {
            const parsed = rValidRatio.exec( value );
            if ( parsed ) {
                const [ , , width, height ] = parsed;
                number = ( height ? Number( height ) : 1 ) / Number( width );
            } else {
                number = 1;
            }
        }
    }
    return isPositiveNumber( number ) ? number : undefined;
};

export const parseRatios = parseBreakpointsFactory<number, number>( parseRatio, 1 );

export const parseRefit = ( value: boolean | string ): string => {
    const parsedBoolean = parseBoolean( value );
    if ( parsedBoolean === undefined ) {
        const trimmed = trimOrUndefined( ( value || `` ).toString() );
        return trimmed && trimmed.replace( /\s/g, `` );
    }
    return parsedBoolean ? `` : undefined;
};

export const parseSize = ( value: string ) => {
    const trimmed = trimOrUndefined( value );
    return trimmed && trimmed.replace( /\n\s*/g, `` );
};

export const parseSizes = parseBreakpointsFactory<string>( parseSize );

export const parseStep = parseNumber;

export const parseSrc = ( value: string ): string => {
    if ( ( config.env === `offline` ) && !isReactNative ) {
        return ``;
    }
    const src = trimOrUndefined( value ) || `placeholder:red`;
    const { isAbsolute, isSpecial } = urlInfos( src, config.domain );
    // eslint-disable-next-line no-nested-ternary
    return isSpecial ?
        src :
        isAbsolute ?
            `media:${ src.slice( `${ config.domain }/`.length ) }` :
            src.replace( rMedia, `media:${ config.path }` );

};

export const parseTo = parseNumber;

export const parseTitle = ( value: string ): string => value && value.trim();

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
export const parseZoom = ( value: number | string ): boolean | number => {
    if ( typeof value === `string` ) {
        const parsed = rValidZoom.exec( value );
        if ( parsed && parsed[ 3 ] ) {
            return true;
        }
        // eslint-disable-next-line no-param-reassign
        value = parsed && parsed[ 2 ] ? Number( parsed[ 2 ] ) : undefined;
    }
    // eslint-disable-next-line no-nested-ternary
    return isPositiveNumber( value ) ?
        ( value > 1 ? value : undefined ) :
        undefined;
};
