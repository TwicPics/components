import type { Options, Config } from "./types";
import { createElement } from "./dom";
import { isBrowser, isWebComponents, logWarning, throwError } from "./utils";

const getDefaultConfig = (): Config => ( {
    "domain": undefined,
    "class": `twic`,
} );

export let config = getDefaultConfig();

export const configBasedStyle = (): string => `.twic-w>.${ config.class }-done{opacity:1 !important}`;
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

export default ( options: Options ): void => {

    if ( !options ) {
        throwError( `install options not provided` );
    }

    const hasPreviousInstall = config.domain;

    const { domain, "class": _class } = options;

    if ( !domain || !rDomain.test( domain ) ) {
        throwError( `install domain "${ domain }" is invalid` );
    }

    config = getDefaultConfig();
    config.domain = domain;
    config.class = _class || config.class;

    // not done in SSR
    if ( isBrowser ) {

        if ( hasPreviousInstall ) {
            logWarning( `install function called multiple times` );
            return;
        }

        const parts = [ `${ domain }/?v1` ];
        Object.entries( options ).forEach( ( [ key, value ] ) => {
            if ( value != null ) {
                let actualKey = key;
                if ( key === `class` ) {
                    config.class = `{ $value }`;
                } else if ( key === `maxDPR` ) {
                    actualKey = `max-dpr`;
                }
                if ( key !== `domain` ) {
                    parts.push( `${ actualKey }=${ value }` );
                }
            }
        } );

        createElement( [
            document.head,
            0,
            [
                [
                    `link`,
                    {
                        "rel": `preconnect`,
                        "href": domain,
                    },
                ],
                [
                    `script`,
                    {
                        "async": ``,
                        "defer": ``,
                        "src": parts.join( `&` ),
                    },
                ],
                isWebComponents ? undefined : [ `style`, 0, configBasedStyle() ],
            ],
        ] );
    }
};
