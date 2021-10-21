import { getElementData, getFirstChild, getLastChild, getParent } from "./dom";
import { isBrowser } from "./utils";

type Observer = Array< ( element: Element ) => void >;

const loadingObserver: Observer = isBrowser ? ( ( Constructor: typeof MutationObserver ) => {
    if ( !Constructor ) {
        return undefined;
    }
    const rLoading = /loading/;
    const callback = ( records: Array< MutationRecord > ): void => {
        for ( const { target, oldValue } of records ) {
            if ( !rLoading.test( oldValue ) ) {
                const bg = getElementData( getParent( target ) ).bg as ( () => void );
                if ( bg ) {
                    bg();
                }
                return;
            }
        }
    };
    const options = {
        "attributeFilter": [ `class` ],
        "attributeOldValue": true,
        "attributes": true,
    };
    return [
        ( element: Element ) => {
            const elementData = getElementData( element );
            if ( !elementData.mo ) {
                const observer = new Constructor( callback );
                observer.observe( element, options );
                elementData.mo = observer;
            }
        },
        ( element: Element ) => {
            const elementData = getElementData( element );
            const observer = elementData.mo as MutationObserver;
            if ( observer ) {
                observer.disconnect();
                delete elementData.mo;
            }
        },
    ];
} )( window.MutationObserver ) : undefined;

const resizeObserver: Observer = isBrowser ? ( ( Constructor: typeof ResizeObserver ) => {
    if ( !Constructor ) {
        return undefined;
    }
    const observer = new ResizeObserver( ( records: Array< ResizeObserverEntry > ): void => {
        for ( const { target } of records ) {
            const bg = getElementData( getParent( getParent( target ) ) ).bg as ( () => void );
            if ( bg ) {
                bg();
            }
        }
    } );
    return [ observer.observe.bind( observer ), observer.unobserve.bind( observer ) ];
} )( window.ResizeObserver ) : undefined;

const factory = ( method: 0 | 1 ) => ( element: HTMLDivElement ): void => {
    if ( loadingObserver ) {
        loadingObserver[ method ]( getFirstChild( element ) );
    }
    if ( resizeObserver ) {
        resizeObserver[ method ]( getFirstChild( getLastChild( element ) ) );
    }
};

export const observe = ( loadingObserver || resizeObserver ) ? factory( 0 ) : undefined;
export const unobserve = ( loadingObserver || resizeObserver ) ? factory( 1 ) : undefined;
