import { installTwicPics } from "@twicpics/components/react";
import "@twicpics/components/style.css";

export const wrapRootElement = ( _, options ) => {
    const { twicpics } = options;
    if ( twicpics && twicpics.domain ) {
        installTwicPics( twicpics );
    } else {
        // eslint-disable-next-line no-console
        console.warn( `twicpics gatsby module : domain has not been configured. Please check gatsby-config.js file` );
    }
};
