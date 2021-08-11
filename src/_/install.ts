import type { OptionalString, Options } from "./types";

export const config: {
    domain: OptionalString,
    class: string,
} = {
    "domain": undefined,
    "class": `twic`,
};

const rDomain = /^https?:\/\/[^/]+$/;

export default ( options: Options ): void => {
    if ( config.domain ) {
        throw new Error( `cannot install TwicPics script twice` );
    }

    const { domain } = options;

    if ( !domain || !rDomain.test( domain ) ) {
        throw new Error( `invalid domain "${ domain }": cannot install TwicPics script` );
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
    if ( typeof document !== `undefined` ) {
        const link = document.createElement( `link` );
        link.rel = `preconnect`;
        link.href = domain;

        const script = document.createElement( `script` );
        script.async = true;
        script.defer = true;
        script.src = parts.join( `&` );

        const style = document.createElement( `style` );
        style.innerText = `.twic-t-fade>.${ config.class }-done{opacity:1}`;

        document.head.appendChild( link );
        document.head.appendChild( script );
        document.head.appendChild( style );
    }
};
