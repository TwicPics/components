/* eslint no-shadow: [ "error", { "allow": [ "focus" ] } ] */
import type { PlaceholderData, PlaceholderHandler } from "./types";

import { computePlaceholderBackground } from "./compute";
import { config } from "./install";
import { debounce, isBrowser, logWarning } from "./utils";

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
        "setPlaceholderElement": ( placeholderElement: HTMLDivElement ): void => {
            if ( !placeholderElement ) {
                return;
            }
            Object.defineProperty( ( element = placeholderElement ), PRIVATE_KEY, {
                "configurable": true,
                "value": ( refresh = debounce( () => {
                    if ( element && config.domain && savedData ) {
                        const wrapperBackground = computePlaceholderBackground( element, savedData );
                        if ( wrapperBackground && ( wrapperBackground !== savedWrapperBackground ) ) {
                            savedWrapperBackground = wrapperBackground;
                            const backgroundImage = `url(${ JSON.stringify(
                                `${ wrapperBackground }`
                            ) })`;
                            if ( handler ) {
                                handler( backgroundImage );
                            } else {
                                // eslint-disable-next-line no-param-reassign
                                placeholderElement.style.backgroundImage = backgroundImage;
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
