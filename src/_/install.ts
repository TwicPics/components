import type { OptionalString, Options } from "./types";
import { isBrowser, isWebComponents } from "./utils";

export const config: {
    domain: OptionalString,
    class: string,
} = {
    "domain": undefined,
    "class": `twic`,
};

export const configBasedStyle = (): string => `.twic-t-fade>.${ config.class }-done{opacity:1}`;
export const markComponentsChain = ( item: Element ): undefined => {
    const attributeName = `data-${ config.class }-component`;
    while ( item ) {
        const { parentNode } = item;
        const isHost = !parentNode && ( item instanceof ShadowRoot );
        if ( isHost ) {
            if ( ( item as unknown as ShadowRoot ).mode === `closed` ) {
                throw new Error( `cannot use TwicPics components in closed ShadowRoot` );
            }
            // eslint-disable-next-line no-param-reassign
            item = ( item as unknown as ShadowRoot ).host;
        } else {
            // eslint-disable-next-line no-param-reassign
            item = ( parentNode as Element );
        }
        if ( isHost && item ) {
            if ( item.hasAttribute( attributeName ) ) {
                return;
            }
            item.setAttribute( attributeName, `` );
        }
    }
};

const rDomain = /^https?:\/\/[^/]+$/;

export const installError = ( msg: string ): never => {
    throw new Error( `impossible to install TwicPics: ${ msg }` );
};

export default ( options: Options ): void => {
    if ( config.domain ) {
        installError( `install function already called` );
    }

    const { domain } = options;

    if ( !domain || !rDomain.test( domain ) ) {
        installError( `invalid domain "${ domain }"` );
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

        if ( !isWebComponents ) {
            const style = document.createElement( `style` );
            style.innerText = configBasedStyle();
            document.head.appendChild( style );
        }
    }
};
