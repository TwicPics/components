import type { Options, Environment } from "./types";
import { createElement } from "./dom";
import { isBrowser, isReactNative, logWarning, throwError } from "./utils";
import { rValidEnvironment } from "./validate";
import { VERSION } from "./const";

/**
 * default class used in config object
 */
const defaultClass = `twic`;

export const config: {
    debug: boolean,
    class: string,
    env: Environment,
    domain: string,
    maxDPR: number;
    path: string,
    step: number,
} = {
    "debug": false,
    "class": defaultClass,
    "env": `production`,
    "domain": undefined,
    "maxDPR": undefined,
    "path": ``,
    "step": undefined,
};

export const configBasedStyle = (): string =>
    `.twic-w>.${
        config.class
    }-done+div,.twic-w>.${
        config.class
    }-poster-done+div{opacity:0 !important}.twic-w>.${
        config.class
    }-done,.twic-w>.${
        config.class
    }-poster-done{transform:none !important}`;

export const getDataAttributeName = ( baseName: string ): string => `data-${ config.class }-${ baseName }`;

const rInvalidPath = /\?|^\/*$/;
const rValidDomain = /(^https?:\/\/[^/]+)\/*$/;

export default ( options: Options ): void => {

    if ( !options ) {
        throwError( `install options not provided` );
    }

    const hasPreviousInstall = config && config.domain;
    const { domain, "class": _class, env, path } = options;

    if ( !domain || !rValidDomain.test( domain ) ) {
        throwError( `install domain "${ domain }" is invalid` );
    }

    if ( path && rInvalidPath.test( path ) ) {
        throwError( `install path "${ path }" is invalid` );
    }

    if ( env && !rValidEnvironment.test( env ) ) {
        throwError( `install env "${ env }" is invalid` );
    }

    config.class = _class || defaultClass;
    config.domain = domain.replace( rValidDomain, `$1` );
    config.env = env;
    config.path = path ? path.replace( /^\/*(.+?)\/*$/, `$1/` ) : ``;

    if ( isReactNative ) {
        const { debug, maxDPR, step } = options;
        config.debug = debug;
        config.maxDPR = maxDPR;
        config.step = step;
    }

    // not done in SSR
    if ( isBrowser && !isReactNative ) {
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
