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
    if ( step !== undefined ) {
        attributes[ `data-${ config.class }-step` ] = String( step );
    }
    return attributes;
};

/* eslint-disable dot-notation */
export const computeStyle = (
    mode: Mode,
    position: string,
    transition: boolean,
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
    if ( !transition ) {
        computedStyle[ `transitionDuration` ] = `0ms`;
    } else if ( transitionDuration ) {
        computedStyle[ `transitionDuration` ] = transitionDuration;
    }
    if ( transition && transitionDelay ) {
        computedStyle[ `transitionDelay` ] = transitionDelay;
    }
    if ( transitionTimingFunction ) {
        computedStyle[ `transitionTimingFunction` ] = transitionTimingFunction;
    }
    return computedStyle;
};
/* eslint-enable dot-notation */

export const computeWrapperClass = (
    className?: string
): string => `twic-w${ className ? ` ${ className }` : `` }`;

/* eslint-disable dot-notation */
export const computeWrapperStyle = (
    focus: string,
    mode: Mode,
    placeholder: Placeholder,
    position: string,
    ratio: number,
    src: string,
    placeholderDataHandler: ( ( data: PlaceholderData ) => void )
): Record< string, string > => {
    const computedWrapperStyle: Record< string, string > = {};
    placeholderDataHandler( {
        focus,
        mode,
        placeholder,
        ratio,
        src,
    } );

    if ( mode ) {
        computedWrapperStyle[ `backgroundSize` ] = mode;
    }
    if ( position ) {
        computedWrapperStyle[ `backgroundPosition` ] = position;
    }
    // eslint-disable-next-line no-magic-numbers
    computedWrapperStyle[ `paddingTop` ] = ( ratio === undefined ) ? `` : `${ ratio * 100 }%`;
    return computedWrapperStyle;
};
/* eslint-enable dot-notation */
