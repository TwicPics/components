/* eslint max-params: off, no-shadow: [ "error", { "allow": [ "focus" ] } ] */
import type { Mode, Placeholder } from "./types";
import type { PlaceholderData } from "./placeholder";

import { config } from "./install";

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
    bot: string,
    focus: string,
    preTransform: string,
    src: string,
    step: number
): Record< string, string > => {
    const attributes: Record< string, string > = {};
    if ( bot ) {
        attributes[ `data-${ config.class }-bot` ] = bot;
    }
    if ( focus ) {
        attributes[ `data-${ config.class }-focus` ] = focus;
    }
    if ( src ) {
        attributes[ `data-${ config.class }-src` ] = src;
    }

    if ( ( config.env === `debug` ) || preTransform ) {
        attributes[ `data-${ config.class }-transform` ] = `${
            preTransform
        }${
            config.env === `debug` ? `debug/` : ``
        }${
            `*/`
        }`;
    }

    if ( step !== undefined ) {
        attributes[ `data-${ config.class }-step` ] = String( step );
    }
    return attributes;
};

/* eslint-disable dot-notation */
export const computeStyle = (
    mode: Mode,
    position: string,
    transitionDelay: string,
    transitionDuration: string,
    transitionTimingFunction: string
): Record< string, string > => {
    const computedStyle: Record< string, string > = {};
    if ( mode ) {
        computedStyle[ `objectFit` ] = mode;
    }
    if ( position ) {
        computedStyle[ `objectPosition` ] = position;
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

/* eslint-disable dot-notation */
export const computeWrapperStyle = (
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
    const computedWrapperStyle: Record< string, string > = {};
    placeholderDataHandler( {
        focus,
        mode,
        placeholder,
        preTransform,
        ratio,
        transitions,
        src,
    } );

    if ( mode ) {
        computedWrapperStyle[ `backgroundSize` ] = mode;
    }
    if ( position ) {
        computedWrapperStyle[ `backgroundPosition` ] = position;
    }

    if ( ratio === 0 ) {
        computedWrapperStyle[ `height` ] = `100%`;
        computedWrapperStyle[ `paddingTop` ] = `0`;
    } else {
        // eslint-disable-next-line no-magic-numbers
        computedWrapperStyle[ `paddingTop` ] = ( ratio === undefined ) ? `` : `${ ratio * 100 }%`;
    }

    return computedWrapperStyle;
};
/* eslint-enable dot-notation */
