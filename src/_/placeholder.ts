/* eslint no-shadow: [ "error", { "allow": [ "focus" ] } ] */
import type { Mode, Placeholder, PlaceholderHandler, Transition } from "./types";

import { config } from "./install";
import { cssWithoutPx } from "./dom";
import { debounce, isBrowser, logWarning } from "./utils";
import { parseMode } from "./parse";

const PLACEHOLDER_DIM = 1000;

export interface PlaceholderData {
    focus: string,
    mode: Mode,
    placeholder: Placeholder,
    preTransform: string,
    ratio: number,
    transitions: Transition[],
    src: string
}

const computeWrapperBackground = (
    element: Element,
    { focus, mode, placeholder, preTransform, ratio, transitions = [], src }: PlaceholderData
): string => {
    if ( !placeholder || !src || ( transitions.includes( `zoom` ) ) ) {
        return ``;
    }

    const computedStyle = getComputedStyle( element );
    // trick to get ratio easily from css :
    // we use fontSize (an otherwise unusable property in this context)
    // to store the result of the calculation tha ratio through a css variable.
    const _ratio = ratio ?? cssWithoutPx( computedStyle.fontSize );

    let height = PLACEHOLDER_DIM;
    let width = PLACEHOLDER_DIM;

    if ( _ratio < 1 ) {
        height *= _ratio;
    } else {
        width /= _ratio;
    }

    height = Math.max( 1, Math.round( height ) );
    width = Math.max( 1, Math.round( width ) );

    const actualMode = mode || parseMode( computedStyle.backgroundSize ) || `cover`;

    return `${
        ( ( actualMode === `cover` ) && focus ) ? `focus=${ focus }/` : ``
    }${
        preTransform
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

export const createPlaceholderHandler = (
    handler: ( backgroundImage: string ) => void = undefined
): PlaceholderHandler => {
    if ( !config.domain ) {
        logWarning( `domain has not been configured ` );
    }
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
            Object.defineProperty( ( element = wrapper ), PRIVATE_KEY, {
                "configurable": true,
                "value": ( refresh = debounce( () => {
                    if ( element && config.domain && savedData ) {
                        const wrapperBackground = computeWrapperBackground( element, savedData );
                        if ( wrapperBackground && ( wrapperBackground !== savedWrapperBackground ) ) {
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
