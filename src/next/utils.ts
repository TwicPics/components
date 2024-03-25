/* eslint-disable no-undef */
import { setConfig } from "../_/config";
import { validate } from "../_/install";

export default ():void => {
    const options = {
        "domain": process.env.NEXT_PUBLIC_TWICPICS_DOMAIN,
        "path": process.env.NEXT_PUBLIC_TWICPICS_PATH,
    };
    validate( options );
    setConfig( options );
};
