import type { Options, Environment } from "./types";
import { createElement } from "./dom";
import { isBrowser, logWarning, throwError } from "./utils";
import { rValidEnvironment } from "./validate";
import { VERSION } from "./const";

/**
 * default class used in config object
 */
const defaultClass = `twic`;

export const config: {
    class: string,
    env: Environment,
    domain: string,
    path: string,
} = {
    "class": defaultClass,
    "env": `production`,
    "domain": undefined,
    "path": ``,
};

export const configBasedStyle = (): string =>
    // eslint-disable-next-line max-len
    `.twic-w>.${ config.class }-done+div{opacity:0 !important}.twic-w>.${ config.class }-done{transform:none !important;}.twic-w>.${ config.class }-poster-done+div{opacity:0 !important}.twic-w>.${ config.class }-poster-done{transform:none !important;}`;

const rInvalidPath = /\?/;
const rValidDomain = /(^https?:\/\/[^/]+)\/?$/;

export default ( options: Options ): void => {

    if ( !options ) {
        throwError( `install options not provided` );
    }

    const hasPreviousInstall = config && config.domain;

    const { domain, "class": _class, env, path } = options;

    if ( !domain || !rValidDomain.test( domain ) ) {
        throwError( `install domain "${ domain }" is invalid` );
    }

    if ( path ) {
        if ( rInvalidPath.test( path ) ) {
            throwError( `install path "${ path }" is invalid` );
        }
        config.path = path.replace( /^\/?(.+?)\/?$/, `$1/` );
    }

    if ( env && !rValidEnvironment.test( env ) ) {
        throwError( `install env "${ env }" is invalid` );
    }

    config.env = env;
    config.domain = domain.replace( rValidDomain, `$1` );
    config.class = _class || defaultClass;

    // not done in SSR
    if ( isBrowser ) {
        if ( hasPreviousInstall ) {
            logWarning( `install function called multiple times` );
            return;
        }

        const parts = [ `${ config.domain }/?${ VERSION }` ];
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
                [ `style`, 0, configBasedStyle() ],
            ],
        ] );
    }
};
