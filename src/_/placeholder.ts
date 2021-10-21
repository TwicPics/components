/* eslint no-shadow: [ "error", { "allow": [ "focus" ] } ] */
import type { Mode, Placeholder } from "./types";

import { config } from "./install";
import { createElement, cssWithoutPx, deleteElementData, getElementData, getFirstChild, getLastChild } from "./dom";
import { debounce } from "./utils";
import { observe, unobserve } from "./observers";
import { parseMode } from "./parse";

const PLACEHOLDER_DIM = 1000;

export interface PlaceholderData {
    focus: string,
    mode: Mode,
    placeholder: Placeholder,
    ratio: number,
    src: string
}

const computeWrapperBackground = (
    element: HTMLDivElement,
    { focus, mode, placeholder, ratio, src }: PlaceholderData
): string => {
    if ( placeholder === `none` ) {
        return undefined;
    }
    const computedStyle = window.getComputedStyle( getFirstChild( getLastChild( element ) ) );
    let height = PLACEHOLDER_DIM;
    let width = PLACEHOLDER_DIM;
    if ( ratio === undefined ) {
        height = Math.min( height, cssWithoutPx( computedStyle.height ) );
        width = Math.min( width, cssWithoutPx( computedStyle.width ) );
    } else if ( ratio < 1 ) {
        height *= ratio;
    } else {
        width /= ratio;
    }
    height = Math.max( 1, Math.round( height ) );
    width = Math.max( 1, Math.round( width ) );
    const actualMode = mode || parseMode( computedStyle.backgroundSize );
    return `${
        ( ( actualMode !== `contain` ) && focus ) ? `focus=${ focus }/` : ``
    }${
        actualMode || `cover`
    }=${
        width
    }x${
        height
    }/output=${
        placeholder || `preview`
    }/${
        src
    }`;
};

const bgFactory = ( element: HTMLDivElement ) => {
    let oldWrapperBackground = ``;
    return debounce( () => {
        const data = getElementData( element ).bgd as PlaceholderData;
        if ( data ) {
            const wrapperBackground = computeWrapperBackground( element, data );
            if ( wrapperBackground !== oldWrapperBackground ) {
                oldWrapperBackground = wrapperBackground;
                // eslint-disable-next-line no-param-reassign
                element.style.backgroundImage = wrapperBackground ? `url(${ JSON.stringify(
                    `${ config.domain }/v1/${ wrapperBackground }`
                ) })` : `none`;
            }
        }
    } );
};

export const setPlaceholderData = ( element: HTMLDivElement, data: PlaceholderData ): void => {
    const elementData = getElementData( element );
    elementData.bgd = data;
    const bg = elementData.bg as ( () => void );
    if ( bg ) {
        bg();
    }
};

export const handlePlaceholder = ( element: HTMLDivElement, data?: PlaceholderData ): void => {
    if ( observe ) {
        const elementData = getElementData( element );
        if ( data ) {
            elementData.bgd = data;
        }
        if ( !elementData.bg ) {
            createElement( {
                ".": element,
                ">": {
                    ">": {},
                },
            } );
            const bg: () => void = bgFactory( element );
            elementData.bg = bg;
            observe( element );
            bg();
        }
    }
};

export const unhandlePlaceholder = ( element: HTMLDivElement ): void => {
    if ( unobserve ) {
        unobserve( element );
        deleteElementData( element );
    }
};
