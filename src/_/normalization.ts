import type { Mode } from "./types";

const splitAnchor = ( anchor: string ):string[] => anchor.split( /\s*-\s*|\s+/ );

const mappingFocus = ( anchors: string[], mapArray : { [ key: string ]: string } ) : string => (
    // eslint-disable-next-line no-shadow
    anchors.map( anchor => mapArray[ anchor ] ).filter( focus => focus )[ 0 ] || `50p`
);

// eslint-disable-next-line no-shadow
const normalizeFocus = ( anchor:string, focus?: string ):string => {
    if ( focus ) {
        return focus;
    }
    if ( anchor ) {
        const anchors = splitAnchor( anchor );
        const focusX = mappingFocus( anchors, {
            "left": `0p`,
            "right": `100p`,
        } );
        const focusY = mappingFocus( anchors, {
            "top": `0p`,
            "bottom": `100p`,
        } );
        return `${ focusX }x${ focusY }`;
    }
    return undefined;
};

export const actualPosition = ( anchor:string, mode: Mode, position: string ):string => {
    if ( ( mode === `contain` ) && ( position || anchor ) ) {
        return position || splitAnchor( anchor ).join( ` ` );
    }
    return undefined;
};

export const actualFocus = (
    anchor: string,
    // eslint-disable-next-line no-shadow
    focus: string,
    mode:Mode,
    preTransform:string
) : string => (
    preTransform ?
        focus :
        ( mode === `cover` ) && ( focus || anchor ) && normalizeFocus( anchor, focus )
);

export const actualPreTransform = ( anchor:string, preTransform:string ) : string => (
    ( preTransform && anchor ) ?
        `${
            preTransform
        }focus=${
            normalizeFocus( anchor )
        }/` :
        preTransform
);
