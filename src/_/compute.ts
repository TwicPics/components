/* eslint max-params: off, no-shadow: [ "error", { "allow": [ "focus" ] } ] */
import type { Mode, Placeholder } from "./types";

import { config } from "./install";
import { isBrowser } from "./utils";
import { PlaceholderData, setPlaceholderData } from "./placeholder";

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
): Record< string, string > => ( {
    [ `data-${ config.class }-bot` ]: ( bot && bot.trim() ) || undefined,
    [ `data-${ config.class }-focus` ]: ( focus && focus.trim() ) || undefined,
    [ `data-${ config.class }-src` ]: src,
    [ `data-${ config.class }-step` ]: ( step && ( step > 0 ) && `${ step }` ) || undefined,
} );

export const computeStyle = (
    mode: Mode,
    position: string,
    transition: boolean,
    transitionDelay: string,
    transitionDuration: string,
    transitionTimingFunction: string
): Record< string, string > => {
    const style: Record< string, string > = {};
    if ( mode !== undefined ) {
        style.objectFit = mode;
    }
    if ( position !== undefined ) {
        style.objectPosition = position;
    }
    if ( transition === false ) {
        style.transitionDelay = `0`;
        style.transitionDuration = `0`;
    } else {
        if ( transitionDelay !== undefined ) {
            style.transitionDelay = transitionDelay;
        }
        if ( transitionDuration !== undefined ) {
            style.transitionDuration = transitionDuration;
        }
        if ( transitionTimingFunction !== undefined ) {
            style.transitionTimingFunction = transitionTimingFunction;
        }
    }
    return style;
};

export const computeWrapperClass = (
    className?: string
): string => `twic-w${ className ? ` ${ className }` : `` }`;

export const computeWrapperStyle = (
    element: HTMLDivElement | ( ( data: PlaceholderData ) => void ),
    focus: string,
    mode: Mode,
    placeholder: Placeholder,
    position: string,
    ratio: number,
    src: string
): Record< string, string > => {
    const style: Record< string, string > = {};
    if ( mode !== undefined ) {
        style.backgroundSize = mode;
    }
    if ( position !== undefined ) {
        style.backgroundPosition = position;
    }
    if ( ( ratio !== undefined ) ) {
        // eslint-disable-next-line no-magic-numbers
        style.paddingTop = `${ ratio * 100 }%`;
    }
    if ( isBrowser && element ) {
        const data = {
            focus,
            mode,
            placeholder,
            ratio,
            src,
        };
        if ( element instanceof HTMLDivElement ) {
            setPlaceholderData( element, data );
        } else {
            element( data );
        }
    }
    return style;
};
