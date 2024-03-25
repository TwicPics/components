/* eslint-disable no-undef */
import { setConfig } from "../_/config";
import { validate } from "../_/install";
import { parseDomain, parsePath } from "../_/parse";

export default ():void => {
    validate( {
        "domain": process.env.NEXT_PUBLIC_TWICPICS_DOMAIN,
        "path": process.env.NEXT_PUBLIC_TWICPICS_PATH,
    } );
    setConfig( {
        "domain": parseDomain( process.env.NEXT_PUBLIC_TWICPICS_DOMAIN ),
        "path": parsePath( process.env.NEXT_PUBLIC_TWICPICS_PATH ),
    } );
};
