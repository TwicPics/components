/* eslint-disable no-undef */
import { config } from "../_/config";
import { parseDomain, parsePath } from "../_/parse";
import { throwError } from "../_/utils";
import { rInvalidPath, rValidDomain } from "../_/validate";

export default ():void => {
    const domain = process.env.NEXT_PUBLIC_TWICPICS_DOMAIN;
    const path = process.env.NEXT_PUBLIC_TWICPICS_PATH;
    if ( !rValidDomain.test( domain ) ) {
        throwError( `NEXT_PUBLIC_TWICPICS_DOMAIN "${ domain }" is invalid` );
    }
    if ( path && rInvalidPath.test( path ) ) {
        throwError( `NEXT_PUBLIC_TWICPICS_PATH "${ path }" is invalid` );
    }
    config.domain = parseDomain( domain );
    config.path = parsePath( path );
};
