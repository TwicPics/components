import type { OptionalString, Options } from "./types";
import { installerError, isBrowser } from "./utils";

declare const FRAMEWORK: string;

export const config: {
    domain: OptionalString,
    class: string,
} = {
    "domain": undefined,
    "class": `twic`,
};

export const classBasedStyle = (): string => `.twic-t-fade>.${ config.class }-done{opacity:1}`;

const rDomain = /^https?:\/\/[^/]+$/;

export default ( options: Options ): void => {
    if ( config.domain ) {
        installerError( `install function already called` );
    }

    const { domain } = options;

    if ( !domain || !rDomain.test( domain ) ) {
        installerError( `invalid domain "${ domain }"` );
    }

    config.domain = domain;

    const parts = [ `${ domain }/?v1` ];

    Object.entries( options ).forEach( ( [ key, value ] ) => {
        if ( value != null ) {
            let actualKey = key;
            if ( key === `class` ) {
                config.class = `{ $value }`;
            } else if ( key === `maxDPR` ) {
                actualKey = `max-dpr`;
            }
            parts.push( `${ actualKey }=${ value }` );
        }
    } );

    Object.freeze( config );

    // not done in SSR
    if ( isBrowser ) {

        const link = document.createElement( `link` );
        link.rel = `preconnect`;
        link.href = domain;

        const script = document.createElement( `script` );
        script.async = true;
        script.defer = true;
        script.src = parts.join( `&` );

        document.head.appendChild( link );
        document.head.appendChild( script );

        if ( FRAMEWORK !== `webcomponent` ) {
            const style = document.createElement( `style` );
            style.innerText = classBasedStyle();
            document.head.appendChild( style );
        }
    }
};
