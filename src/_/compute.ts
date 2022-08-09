/* eslint-disable no-nested-ternary */
/* eslint max-params: off, no-shadow: [ "error", { "allow": [ "focus" ] } ] */
import type { Anchor, Mode, Placeholder, PlaceholderData } from "./types";

import { config } from "./install";
import { cssWithoutPx } from "./dom";
import { parseMode } from "./parse";

const anchorToFocus = ( { x, y }: Anchor ): string => ( y ? ( x ? `${ y }-${ x }` : y ) : x );
const anchorToPosition = ( { x, y }: Anchor ): string => ( y ? ( x ? `${ x } ${ y }` : y ) : x );

const computeFocus = ( anchor: Anchor, focus: string, mode: Mode, preTransform: string ): string => (
    preTransform ?
        focus :
        ( mode !== `contain` ) && ( focus || anchorToFocus( anchor ) )
);

const computePosition = ( anchor: Anchor, mode: Mode, position: string ): string =>
    ( mode === `contain` ) && ( position || anchorToPosition( anchor ) );

const computePreTransform = ( anchor: Anchor, preTransform: string ): string => preTransform && `${
    preTransform
}${
    ( anchor.x || anchor.y ) ? `focus=${ anchorToFocus( anchor ) }/` : ``
}`;

const rAlt = /\/?([^/?#.]+)(?:\.[^/?#]*)?(?:[?#].*)?$/;

export const computeAlt =
    ( alt: string, src: string ): string => {
        if ( !alt ) {
            const tmp = rAlt.exec( src );
            // eslint-disable-next-line no-param-reassign
            alt = ( tmp && tmp[ 1 ] ) || `image`;
        }
        return alt;
    };

export const computeData = (
    anchor: Anchor,
    bot: string,
    focus: string,
    mode: Mode,
    preTransform: string,
    src: string,
    step: number
): Record< string, string > => {
    const attributes: Record< string, string > = {};
    if ( bot ) {
        attributes[ `data-${ config.class }-bot` ] = bot;
    }
    const actualFocus = computeFocus( anchor, focus, mode, preTransform );
    if ( actualFocus ) {
        attributes[ `data-${ config.class }-focus` ] = actualFocus;
    }
    if ( src ) {
        attributes[ `data-${ config.class }-src` ] = src;
    }
    const actualPreTransform = computePreTransform( anchor, preTransform );
    if ( ( config.env === `debug` ) || actualPreTransform ) {
        attributes[ `data-${ config.class }-transform` ] = `${
            actualPreTransform
        }${
            config.env === `debug` ? `debug/` : ``
        }${
            `*`
        }`;
    }
    if ( step !== undefined ) {
        attributes[ `data-${ config.class }-step` ] = String( step );
    }
    return attributes;
};

/* eslint-disable dot-notation */
export const computePlaceholderStyle = (
    anchor: Anchor,
    focus: string,
    mode: Mode,
    placeholder: Placeholder,
    position: string,
    preTransform: string,
    ratio: number,
    src: string,
    transitions: Record< string, boolean >,
    placeholderDataHandler: ( ( data: PlaceholderData ) => void )
): Record< string, string > => {
    const placeholderStyle: Record< string, string > = {};
    placeholderDataHandler( {
        anchor,
        focus,
        mode,
        placeholder,
        preTransform,
        ratio,
        transitions,
        src,
    } );

    if ( mode ) {
        placeholderStyle[ `backgroundSize` ] = mode;
    }

    const actualPosition = computePosition( anchor, mode, position );
    if ( actualPosition ) {
        placeholderStyle[ `backgroundPosition` ] = actualPosition;
    }

    return placeholderStyle;
};
/* eslint-enable dot-notation */

/* eslint-disable dot-notation */
export const computeStyle = (
    anchor: Anchor,
    mode: Mode,
    position: string,
    transitionDelay: string,
    transitionDuration: string,
    transitionTimingFunction: string
): Record< string, string > => {
    const computedStyle: Record< string, string > = {};
    const actualPosition = computePosition( anchor, mode, position );
    if ( actualPosition ) {
        computedStyle[ `objectPosition` ] = actualPosition;
    }
    if ( mode ) {
        computedStyle[ `objectFit` ] = mode;
    }
    if ( transitionDuration ) {
        computedStyle[ `transitionDuration` ] = transitionDuration;
    }
    if ( transitionDelay ) {
        computedStyle[ `transitionDelay` ] = transitionDelay;
    }
    if ( transitionTimingFunction ) {
        computedStyle[ `transitionTimingFunction` ] = transitionTimingFunction;
    }
    return computedStyle;
};
/* eslint-enable dot-notation */

const PLACEHOLDER_DIM = 1000;

// eslint-disable-next-line id-length
export const computePlaceholderBackground = (
    element: Element,
    { anchor, focus, mode, placeholder, preTransform, ratio, transitions, src }: PlaceholderData
): string => {
    if ( !placeholder || !src || ( transitions.hasOwnProperty( `zoom` ) ) ) {
        return ``;
    }

    const computedStyle = getComputedStyle( element );

    const actualMode = mode || parseMode( computedStyle.backgroundSize ) || `cover`;

    let _ratio;

    if ( ratio === 0 ) {
        _ratio = actualMode === `contain` ?
            1 : cssWithoutPx( computedStyle.height ) / Math.max( 1, cssWithoutPx( computedStyle.width ) );
    } else {
        _ratio = ratio ?? cssWithoutPx( computedStyle.fontSize );
    }

    let height = PLACEHOLDER_DIM;
    let width = PLACEHOLDER_DIM;

    if ( _ratio < 1 ) {
        height *= _ratio;
    } else {
        width /= _ratio;
    }

    height = Math.max( 1, Math.round( height ) );
    width = Math.max( 1, Math.round( width ) );

    const actualFocus = computeFocus( anchor, focus, mode, preTransform );
    const actualPreTransform = computePreTransform( anchor, preTransform );

    return `${
        ( actualFocus ? `focus=${ actualFocus }/` : `` )
    }${
        actualPreTransform
    }${
        actualMode
    }=${
        width
    }x${
        height
    }/output=${
        placeholder
    }/${
        src
    }`;
};

export const computeWrapperClass = (
    src: string,
    transitions: Record< string, boolean >
): string => {

    const wrapperClass = [ `twic-w` ];

    if ( !transitions.hasOwnProperty( `none` ) ) {
        if ( transitions.hasOwnProperty( `fade` ) ) {
            wrapperClass.push( `twic-tf` );
        }

        if ( transitions.hasOwnProperty( `zoom` ) ) {
            wrapperClass.push( `twic-tz` );
        }
    }

    if ( config.env === `offline` ) {
        wrapperClass.push( `twic-offline` );
        if ( !src ) {
            wrapperClass.push( `twic-nosrc` );
        }
    }

    return wrapperClass.join( ` ` );
};

export const computeWrapperStyle = ( ratio: number ): Record< string, string > => (
    ( ratio === 0 ) ? {
        "height": `100%`,
        "paddingTop": `0`,
    } : {
        // eslint-disable-next-line no-magic-numbers
        "paddingTop": ( ratio === undefined ) ? `` : `${ ratio * 100 }%`,
    }
);
