/* eslint no-shadow: [ "error", { "allow": [ "focus" ] } ] */
import type { Mode, OptionalNumber, OptionalString, Placeholder } from "./types";

import { config } from "./install.js";

const MIN_CONTAIN_AREA = 12000;

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

// eslint-disable-next-line id-length
const _computePlaceholderTransform =
    ( mode: Mode, ratio: Array< number > ): string => {
        if ( mode === `cover` ) {
            return `cover=${ ratio.join( `:` ) }`;
        }
        let [ w, h ] = ratio;
        const area = w * h;
        if ( area < MIN_CONTAIN_AREA ) {
            const mult = Math.ceil( MIN_CONTAIN_AREA / area );
            w *= mult;
            h *= mult;
        }
        return `contain=${ w }x${ h }`;
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
    ( bot: OptionalString ): Record< string, string > => ( {
        [ `data-${ config.class }-bot` ]: bot || undefined,
    } );
export const computeDataBot =
    ( { bot }: { bot?: OptionalString } ): Record< string, string > =>
        _computeDataBot( bot );

export const _computeDataFocus =
    ( focus: OptionalString, mode: Mode ): Record< string, string > => ( {
        [ `data-${ config.class }-focus` ]: mode === `contain` ? undefined : _computeFocus( focus, mode ),
    } );
export const computeDataFocus =
    ( { focus, mode }: { focus?: OptionalString, mode: Mode } ): Record< string, string > =>
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
    transitionDelay?: OptionalString,
    transitionDuration?: OptionalString,
    transitionTimingFunction?: OptionalString,
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
    backgroundImage: OptionalString,
    backgroundPosition: string,
    backgroundSize: Mode,
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
        const { domain } = config;
        const focusPoint = _computeFocus( focus, mode );
        styles.backgroundImage = `url(${
            domain
        }/${
            src.replace( rImage, `` )
        }?twic=v1${
            focusPoint ? `/focus=${ focusPoint }` : ``
        }/${
            _computePlaceholderTransform( mode, computedRatio )
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
