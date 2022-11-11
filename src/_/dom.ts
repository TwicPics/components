
interface CreationData {
    attributes?: Record< string, unknown >,
    element?: HTMLElement | ShadowRoot,
    elementName?: string,
    value?: ( Array< CreationData > | CreationData | string )
}

export const createElement = ( data: CreationData ): HTMLElement | ShadowRoot => {
    if ( !data ) {
        return undefined;
    }
    const { attributes, "element": _element, elementName, value } = data;
    const element = _element || document.createElement( elementName || `div` );
    if ( attributes && ( element instanceof HTMLElement ) ) {
        for ( const [ n, v ] of Object.entries( attributes ) ) {
            element.setAttribute( n, String( v ) );
        }
    }
    if ( value ) {
        if ( typeof value === `string` ) {
            element.innerHTML = value;
        } else {
            for ( const child of ( Array.isArray( value ) ? value : [ value ] ) ) {
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

