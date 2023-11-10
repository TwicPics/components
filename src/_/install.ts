import { config, configBasedStyle, setConfig } from "./config";
import { VERSION } from "./const";
import { createElement } from "./dom";
import { parseDomain, parseEnv, parsePath } from "./parse";
import type { Options } from "./types";
import { isBrowser, isReactNative, throwError } from "./utils";
import { rInvalidPath, rValidDomain, rValidEnvironment } from "./validate";

const parametersMap = [
    [ `anticipation`, `anticipation` ],
    [ `class`, `class` ],
    [ `maxDPR`, `max-dpr` ],
    [ `step`, `step` ],
];
const registerScript = ( options: Options ): void => {
    if ( isBrowser && !isReactNative ) {
        const parts = [ `${ config.domain }/?${ VERSION }` ];
        parametersMap.forEach( p => {
            const [ key, actualKey ] = p;
            if ( options.hasOwnProperty( key ) ) {
                const value = options[ key as keyof Options ];
                if ( value ) {
                    parts.push( `${ actualKey }=${ options[ key as keyof Options ] }` );
                }
            }
        } );
        createElement( {
            "element": document.head,
            "value": [
                {
                    "attributes": {
                        "rel": `preconnect`,
                        "href": config.domain,
                    },
                    "elementName": `link`,
                },
                {
                    "attributes": {
                        "async": ``,
                        "defer": ``,
                        "src": parts.join( `&` ),
                    },
                    "elementName": `script`,
                },
            ],
        } );
    }
};

const registerStyle = (): void => {
    const style = createElement( {
        "attributes": {
            "rel": `stylesheet`,
            "href": `data:text/css;base64,${ btoa( configBasedStyle() ) }`,
        },
        "elementName": `link`,
    } );
    document.head.appendChild( style );

    // re-register styles during astro view-transition
    document.addEventListener( `astro:after-swap`, () => document.head.appendChild( style ) );
};

export const register = ( options: Options ): void => {
    if ( isBrowser && !isReactNative ) {
        registerScript( options );
        registerStyle();
    }
};

export const installTwicPics = ( options: Options ): void => {
    if ( !options ) {
        throwError( `install options not provided` );
    }
    const { domain, env, path } = options;
    if ( !domain || !rValidDomain.test( domain ) ) {
        throwError( `install domain "${ domain }" is invalid` );
    }
    if ( path && rInvalidPath.test( path ) ) {
        throwError( `install path "${ path }" is invalid` );
    }
    if ( env && !rValidEnvironment.test( env ) ) {
        throwError( `install env "${ env }" is invalid` );
    }
    setConfig( {
        ...options,
        ...{
            "domain": parseDomain( domain ),
            "env": parseEnv( env ),
            "path": parsePath( path ),
        },
    } );

    register( options );
};
