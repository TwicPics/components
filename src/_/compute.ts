/* eslint max-lines: "off", no-shadow: [ "error", { "allow": [ "focus" ] } ] */
import type { Mode, OptionalNumber, OptionalString, Placeholder } from "./types";

import { config } from "./install.js";

const rAlt = /\/?([^/?#.]+)(?:\.[^/?#]*)?(?:[?#].*)?$/;
const rImage = /^(image:)?\/?/;

const _computeFocus =
    ( focus: OptionalString, mode: Mode ): OptionalString =>
        ( ( mode === `cover` ) && focus ) || undefined;

const _computeRatio =
    ( height: OptionalNumber, ratio: OptionalString, width: OptionalNumber ): Array< number > =>
        // eslint-disable-next-line no-nested-ternary
        ( ratio ? ratio.split( `/` ) : ( ( width && height ) ? [ width, height ] : [ 1, 1 ] ) )
            .map( x => Number( x ) );

const TARGET_SIZE = 800;

// eslint-disable-next-line id-length
const _computePlaceholderTransform =
    ( computedRatio: Array< number >, mode: Mode ): string => {
        let [ w, h ] = computedRatio;
        const mult = TARGET_SIZE / Math.max( w, h );
        w = Math.max( 1, Math.round( w * mult ) );
        h = Math.max( 1, Math.round( h * mult ) );
        return `${ mode }=${ w }x${ h }`;
    };

const _computePosition =
    ( mode: Mode, position: OptionalString ): string =>
        ( ( ( mode === `contain` ) && position ) || `center` );

export const _computeAlt =
    ( alt: OptionalString, src: string ): string => {
        if ( !alt ) {
            const tmp = rAlt.exec( src );
            // eslint-disable-next-line no-param-reassign
            alt = ( tmp && tmp[ 1 ] ) || `image`;
        }
        return alt;
    };
export const computeAlt =
    ( { alt, src }: { alt?: OptionalString, src: string } ): string =>
        _computeAlt( alt, src );

export const _computeDataBot =
    ( bot: OptionalString ): Record< string, OptionalString > => ( {
        [ `data-${ config.class }-bot` ]: bot || undefined,
    } );
export const computeDataBot =
    ( { bot }: { bot?: OptionalString } ): Record< string, OptionalString > =>
        _computeDataBot( bot );

export const _computeDataFocus =
    ( focus: OptionalString, mode: Mode ): Record< string, OptionalString > => ( {
        [ `data-${ config.class }-focus` ]: mode === `contain` ? undefined : _computeFocus( focus, mode ),
    } );
export const computeDataFocus =
    ( { focus, mode }: { focus?: OptionalString, mode: Mode } ): Record< string, OptionalString > =>
        _computeDataFocus( focus, mode );

export const _computeDataSrc =
    ( src: string ): Record< string, string > => ( {
        [ `data-${ config.class }-src` ]: src.replace( rImage, `image:` ),
    } );
export const computeDataSrc =
    ( { src }: { src: string } ): Record< string, string > =>
        _computeDataSrc( src );

export const _computeDataStep =
    ( step: OptionalNumber ): Record< string, OptionalNumber > => ( {
        [ `data-${ config.class }-step` ]: step || undefined,
    } );
export const computeDataStep =
    ( { step }: { step?: OptionalNumber } ): Record< string, OptionalNumber > =>
        _computeDataStep( step );

export const _computeHeight =
    ( height: OptionalNumber ): OptionalNumber =>
        ( height || undefined );
export const computeHeight =
    ( { height }: { height?: OptionalNumber } ): OptionalNumber =>
        _computeHeight( height );

const __computeNoScriptSrc = (
    computedRatio: Array< number >,
    focus: OptionalString,
    mode: Mode,
    src: string
): string => {
    const { domain } = config;
    const focusPoint = _computeFocus( focus, mode );
    return `${
        domain
    }/${
        src.replace( rImage, `` )
    }?twic=v1${
        focusPoint ? `/focus=${ focusPoint }` : ``
    }/${
        _computePlaceholderTransform( computedRatio, mode )
    }`;
};

export const _computeNoScriptSrc = (
    focus: OptionalString,
    height: OptionalNumber,
    mode: Mode,
    ratio: OptionalString,
    src: string,
    width: OptionalNumber
// eslint-disable-next-line max-params
): string => __computeNoScriptSrc(
    _computeRatio( height, ratio, width ),
    focus,
    mode,
    src
);

export const computeNoScriptSrc = ( component: {
    focus?: OptionalString,
    height?: OptionalNumber,
    mode: Mode,
    ratio?: OptionalString,
    src: string,
    width?: OptionalNumber
} ): string => _computeNoScriptSrc(
    component.focus,
    component.height,
    component.mode,
    component.ratio,
    component.src,
    component.width
);

export const _computeStyle = (
    mode: Mode,
    position: OptionalString,
    transition: boolean,
    transitionDelay: OptionalString,
    transitionDuration: OptionalString,
    transitionTimingFunction: OptionalString
): {
    objectFit: Mode,
    objectPosition: string,
    transitionDelay?: string,
    transitionDuration?: string,
    transitionTimingFunction?: string,
// eslint-disable-next-line max-params
} => ( {
    "objectFit": mode,
    "objectPosition": _computePosition( mode, position ),
    ...(
        transition ?
            {
                transitionDelay,
                transitionDuration,
                transitionTimingFunction,
            } :
            {}
    ),
} );
export const computeStyle = ( component: {
    mode: Mode,
    position?: OptionalString,
    transition: boolean,
    transitionDelay?: OptionalString,
    transitionDuration?: OptionalString,
    transitionTimingFunction?: OptionalString
} ): Record< string, string > => _computeStyle(
    component.mode,
    component.position,
    component.transition,
    component.transitionDelay,
    component.transitionDuration,
    component.transitionTimingFunction
);

export const _computeWidth =
    ( width: OptionalNumber ): OptionalNumber =>
        ( width || undefined );
export const computeWidth =
    ( { width }: { width?: OptionalNumber } ): OptionalNumber =>
        _computeWidth( width );

export const _computeWrapperClass =
    ( transition: boolean ): string =>
        `twic-w${ transition ? ` twic-t-fade` : `` }`;
export const computeWrapperClass =
    ( { transition }: { transition: boolean } ): string =>
        _computeWrapperClass( transition );

export const _computeWrapperStyle = (
    focus: OptionalString,
    height: OptionalNumber,
    mode: Mode,
    placeholder: Placeholder | undefined,
    position: OptionalString,
    ratio: OptionalString,
    src: string,
    width: OptionalNumber
): {
    backgroundImage?: string,
    backgroundPosition: string,
    backgroundSize?: string,
    paddingTop: string,
// eslint-disable-next-line max-params
} => {
    const computedRatio = _computeRatio( height, ratio, width );
    const styles: {
        backgroundImage: OptionalString,
        backgroundPosition: string,
        backgroundSize: Mode,
        paddingTop: string,
    } = {
        "backgroundImage": undefined,
        "backgroundPosition": _computePosition( mode, position ),
        "backgroundSize": mode,
        // eslint-disable-next-line no-magic-numbers
        "paddingTop": `${ ( ( computedRatio[ 1 ] * 100 ) / computedRatio[ 0 ] ).toFixed( 10 ) }%`,
    };
    const apiOutput = ( placeholder !== `none` ) && placeholder;
    if ( apiOutput ) {
        styles.backgroundImage = `url(${
            __computeNoScriptSrc( computedRatio, focus, mode, src )
        }/output=${
            apiOutput
        })`;
    }
    return styles;
};
export const computeWrapperStyle = ( component: {
    focus?: OptionalString,
    height?: OptionalNumber,
    mode: Mode,
    placeholder?: Placeholder,
    position?: OptionalString,
    ratio?: OptionalString,
    src: string,
    width?: OptionalNumber
} ): Record< string, string > => _computeWrapperStyle(
    component.focus,
    component.height,
    component.mode,
    component.placeholder,
    component.position,
    component.ratio,
    component.src,
    component.width
);
