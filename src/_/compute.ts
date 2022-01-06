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

export const computeStyle = (
    mode: Mode,
    position: string,
    transition: boolean,
    transitionDelay: string,
    transitionDuration: string,
    transitionTimingFunction: string
): Record< string, string > => ( {
    "objectFit": mode || ``,
    "objectPosition": position || ``,
    "transitionDelay": ( transition && transitionDelay ) || `0`,
    "transitionDuration": ( transition && transitionDuration ) || `0`,
    "transitionTimingFunction": transitionTimingFunction || ``,
} );

export const computeWrapperClass = (
    className?: string
): string => `twic-w${ className ? ` ${ className }` : `` }`;

export const computeWrapperStyle = (
    focus: string,
    mode: Mode,
    placeholder: Placeholder,
    position: string,
    ratio: number,
    src: string,
    placeholderDataHandler: ( ( data: PlaceholderData ) => void )
): Record< string, string > => {
    placeholderDataHandler( {
        focus,
        mode,
        placeholder,
        ratio,
        src,
    } );
    return {
        "backgroundSize": mode || ``,
        "backgroundPosition": position || ``,
        // eslint-disable-next-line no-magic-numbers
        "paddingTop": ( ratio === undefined ) ? `` : `${ ratio * 100 }%`,
    };
};
