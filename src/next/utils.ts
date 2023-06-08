/* eslint-disable no-undef */
import { config } from "../_/config";
import { throwError } from "../_/utils";
import { rInvalidPath, rValidDomain, rValidPath } from "../_/validate";

export default ():void => {
    const domain = process.env.NEXT_PUBLIC_TWICPICS_DOMAIN;
    const path = process.env.NEXT_PUBLIC_TWICPICS_PATH;
    if ( !domain || !rValidDomain.test( domain ) ) {
        throwError( `NEXT_PUBLIC_TWICPICS_DOMAIN "${ domain }" is invalid` );
    }
    if ( path && rInvalidPath.test( path ) ) {
        throwError( `NEXT_PUBLIC_TWICPICS_PATH "${ path }" is invalid` );
    }
    config.domain = domain.replace( rValidDomain, `$1` );
    config.path = path ? path.replace( rValidPath, `$1/` ) : ``;
};
