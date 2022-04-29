import type { Options, TwicMode } from "./types";
import { createElement } from "./dom";
import { isBrowser, isWebComponents, logWarning, throwError } from "./utils";
import { rValidTwicMode } from "./validation";

/**
 * default class used in config object
 */
const defaultClass = `twic`;

export const config: {
    class: string,
    mode:TwicMode,
    domain: string,
    path: string,
} = {
    "class": defaultClass,
    "mode": `production`,
    "domain": undefined,
    "path": ``,
};

export const configBasedStyle = (): string =>
    `.twic-w>.${ config.class }-done{opacity:1 !important;transform: none !important;}`;
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

const rInvalidPath = /\?/;
const rValidDomain = /^https?:\/\/[^/]+$/;

export default ( options: Options ): void => {

    if ( !options ) {
        throwError( `install options not provided` );
    }

    const hasPreviousInstall = config && config.domain;

    const { domain, "class": _class, mode, path } = options;

    if ( !domain || !rValidDomain.test( domain ) ) {
        throwError( `install domain "${ domain }" is invalid` );
    }

    if ( path ) {
        if ( rInvalidPath.test( path ) ) {
            throwError( `install path "${ path }" is invalid` );
        }
        config.path = path.replace( /^\/?(.+?)\/?$/, `$1/` );
    }

    if ( mode && !rValidTwicMode.test( mode ) ) {
        throwError( `install mode "${ mode }" is invalid` );
    }

    config.mode = mode;
    config.domain = domain;
    config.class = _class || defaultClass;

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
                if ( key === `maxDPR` ) {
                    actualKey = `max-dpr`;
                }
                if ( ( key !== `domain` ) && ( key !== `path` ) && ( key !== `mode` ) ) {
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
