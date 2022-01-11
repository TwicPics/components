export type CreationData = [
    HTMLElement | string,
    Record< string, unknown > | 0,
    ( Array< CreationData > | CreationData | string )?,
];

export const createElement = ( data: CreationData ): HTMLElement => {
    if ( !data ) {
        return undefined;
    }
    const [ elementOrTagName, attributes, children ] = data;
    const element =
        elementOrTagName instanceof HTMLElement ?
            elementOrTagName :
            document.createElement( elementOrTagName || `div` );
    if ( attributes ) {
        for ( const [ n, v ] of Object.entries( attributes ) ) {
            element.setAttribute( n, String( v ) );
        }
    }
    if ( children ) {
        if ( typeof children === `string` ) {
            element.innerHTML = children;
        } else {
            for ( const child of ( Array.isArray( children ) ? children : [ children ] ) ) {
                const actualChild = createElement( child as CreationData );
                if ( actualChild ) {
                    element.appendChild( actualChild );
                }
            }
        }
    }
    return element;
};

const rPx = /px$/;
export const cssWithoutPx = ( css: string ): number => Number( css.replace( rPx, `` ) );
