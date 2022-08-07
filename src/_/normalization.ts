import type { Anchor, Mode } from "./types";

const normalizePosition = ( anchor:Anchor, position: string ):string => {
    if ( position ) {
        return position;
    }
    if ( anchor ) {
        const { x, y } = anchor;
        // eslint-disable-next-line no-nested-ternary
        return y ? ( x ? `${ x } ${ y }` : y ) : x;
    }
    return undefined;
};

// eslint-disable-next-line no-shadow
const normalizeFocus = ( anchor:Anchor, focus?: string ):string => {
    if ( focus ) {
        return focus;
    }
    if ( anchor ) {
        const { x, y } = anchor;
        // eslint-disable-next-line no-nested-ternary
        return y ? ( x ? `${ y }-${ x }` : y ) : x;
    }
    return undefined;
};

export const actualPosition = ( anchor:Anchor, mode: Mode, position: string ):string =>
    ( ( mode === `contain` ) && normalizePosition( anchor, position ) ) || undefined;

export const actualFocus = (
    anchor: Anchor,
    // eslint-disable-next-line no-shadow
    focus: string,
    mode:Mode,
    preTransform:string
) : string => (
    preTransform ?
        focus :
        ( mode === `cover` ) && ( focus || anchor ) && normalizeFocus( anchor, focus )
);

export const actualPreTransform = ( anchor:Anchor, preTransform:string ) : string => (
    ( preTransform && anchor ) ?
        `${
            preTransform
        }focus=${
            normalizeFocus( anchor )
        }/` :
        preTransform
);
