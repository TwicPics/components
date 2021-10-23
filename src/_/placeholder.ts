/* eslint no-shadow: [ "error", { "allow": [ "focus" ] } ] */
import type { Mode, Placeholder } from "./types";

import { config } from "./install";
import { cssWithoutPx, getFirstChild, getLastChild } from "./dom";
import { debounce, isBrowser, logWarning } from "./utils";
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
    element: Element,
    { focus, mode, placeholder, ratio, src }: PlaceholderData
): string => {
    if ( !placeholder || !src ) {
        return ``;
    }
    const computedStyle = getComputedStyle( element );
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
    const actualMode = mode || parseMode( computedStyle.backgroundSize ) || `cover`;
    return `${
        ( ( actualMode === `cover` ) && focus ) ? `focus=${ focus }/` : ``
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

const PRIVATE_KEY = ` TPCWBG ${ Math.random() } ${ Date.now() } `;

const resizeObserver: false | ResizeObserver =
    isBrowser &&
    ( typeof ResizeObserver !== `undefined` ) &&
    new ResizeObserver( ( records: Array< ResizeObserverEntry > ): void => {
        for ( const { target } of records ) {
            ( target as unknown as Record< string, () => void > )[ PRIVATE_KEY ]();
        }
    } );

if ( isBrowser && !resizeObserver ) {
    logWarning( `ResizeObserver not found` );
}

export interface PlaceholderHandler {
    delete: () => void,
    setData: ( data: PlaceholderData ) => void,
    setWrapper: ( wrapper: HTMLDivElement ) => void,
}
export const createPlaceholderHandler = (
    handler: ( backgroundImage: string ) => void = undefined
): PlaceholderHandler => {
    let element: Element;
    let savedWrapperBackground: string;
    let savedData: PlaceholderData;
    let refresh: () => void;
    return {
        "delete": (): void => {
            if ( element ) {
                if ( resizeObserver ) {
                    resizeObserver.unobserve( element );
                }
                delete ( element as unknown as Record< string, unknown > )[ PRIVATE_KEY ];
            }
        },
        "setData": ( data: PlaceholderData ): void => {
            savedData = data;
            if ( refresh ) {
                refresh();
            }
        },
        "setWrapper": ( wrapper: HTMLDivElement ): void => {
            Object.defineProperty( ( element = getFirstChild( getLastChild( wrapper ) ) ), PRIVATE_KEY, {
                "configurable": true,
                "value": ( refresh = debounce( () => {
                    if ( element && savedData ) {
                        const wrapperBackground = computeWrapperBackground( element, savedData );
                        if ( wrapperBackground !== savedWrapperBackground ) {
                            savedWrapperBackground = wrapperBackground;
                            const backgroundImage = `url(${ JSON.stringify(
                                `${ config.domain }/v1/${ wrapperBackground }`
                            ) })`;
                            if ( handler ) {
                                handler( backgroundImage );
                            } else {
                                // eslint-disable-next-line no-param-reassign
                                wrapper.style.backgroundImage = backgroundImage;
                            }
                        }
                    }
                } ) ),
            } );
            if ( resizeObserver ) {
                resizeObserver.observe( element );
            }
        },
    };
};
