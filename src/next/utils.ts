/* eslint-disable no-undef */
import { rMedia, trimOrUndefined } from "../_/parse";
import { isAbsolute } from "../_/url";
import { throwError } from "../_/utils";
import { rInvalidPath, rValidDomain, rValidPath } from "../_/validate";

export const getDomain = () => {
    const domain = process.env.NEXT_PUBLIC_TWICPICS_DOMAIN;
    if ( !domain || !rValidDomain.test( domain ) ) {
        throwError( `NEXT_PUBLIC_TWICPICS_DOMAIN "${ domain }" is invalid` );
    }
    return domain.replace( rValidDomain, `$1` );

};
export const getPath = () => {
    const path = process.env.NEXT_PUBLIC_TWICPICS_PATH;
    if ( path && rInvalidPath.test( path ) ) {
        throwError( `NEXT_PUBLIC_TWICPICS_PATH "${ path }" is invalid` );
    }
    return path ? path.replace( rValidPath, `$1/` ) : ``;

};

export const parseSrc = ( value: string ): string => {
    // eslint-disable-next-line no-param-reassign
    const src = trimOrUndefined( value );
    // eslint-disable-next-line no-nested-ternary
    return src ?
        ( isAbsolute( src, getDomain() ) ?
        `media:${ src.slice( `${ getDomain() }/`.length ) }` :
            src.replace( rMedia, `media:${ getPath() }` )
        ) :
    `placeholder:red`;
};
