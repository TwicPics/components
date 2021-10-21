import { TWICPICS_COMPONENTS_NAME } from "./utils";

interface Creation {
    [ `.` ]?: HTMLElement | string,
    [ `@` ]?: string,
    [ `>` ]?: Creation | Array< Creation >,
}

const rSpecial = /^[.@>]$/;

export const createElement = ( data: Record< string, unknown > ): HTMLElement => {
    if ( !data ) {
        return undefined;
    }
    const { ".": elementOrTagName, "@": innerText, ">": children } = data as unknown as Creation;
    const element =
        elementOrTagName instanceof HTMLElement ?
            elementOrTagName :
            document.createElement( elementOrTagName || `div` );
    for ( const [ aName, aValue ] of Object.entries( data ) ) {
        if ( !rSpecial.test( aName ) ) {
            element.setAttribute( aName, `${ aValue }` );
        }
    }
    if ( innerText !== undefined ) {
        element.innerText = innerText;
    }
    if ( children ) {
        for ( const child of ( Array.isArray( children ) ? children : [ children ] ) ) {
            const actualChild = createElement( child as unknown as Record< string, unknown > );
            if ( actualChild ) {
                element.appendChild( actualChild );
            }
        }
    }
    return element;
};

const rPx = /px$/;
export const cssWithoutPx = ( css: string ): number => Number( css.replace( rPx, `` ) );

export let deleteElementData: ( element: Element ) => void;
export let getElementData: ( element: Element ) => Record< string, unknown >;

if ( typeof Map === `undefined` ) {
    const PRIVATE_INDEX = ` ${ TWICPICS_COMPONENTS_NAME } ${ Math.random() } ${ Date.now() } `;
    deleteElementData = ( element: Element ): void => {
        // eslint-disable-next-line no-param-reassign
        delete ( element as unknown as Record< string, string > )[ PRIVATE_INDEX ];
    };
    getElementData = ( element: Element ): Record< string, unknown > => {
        let object = ( element as unknown as Record< string, Record< string, unknown > > )[ PRIVATE_INDEX ];
        if ( !object ) {
            Object.defineProperty( element, PRIVATE_INDEX, {
                "configurable": true,
                "value": ( object = {} ),
            } );
        }
        return object;
    };
} else {
    const map: Map< Element, Record< string, unknown > > = new Map();
    deleteElementData = map.delete.bind( map );
    getElementData = ( element: Element ): Record< string, unknown > => {
        let object = map.get( element );
        if ( !object ) {
            map.set( element, ( object = {} ) );
        }
        return object;
    };
}

export const getFirstChild = ( element: Element ): Element => element.firstElementChild;
export const getLastChild = ( element: Element ): Element => element.lastElementChild;
export const getParent = ( element: Node ): Element => element.parentElement;
