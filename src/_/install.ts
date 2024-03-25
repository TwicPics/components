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

export const register = ( options: Options ): void => {
    if ( isBrowser && !isReactNative ) {
        // register script
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
        const { scriptElementId } = options;
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
                        ...( scriptElementId && {
                            "id": scriptElementId,
                        } ),
                        "src": parts.join( `&` ),
                    },
                    "elementName": `script`,
                },
            ],
        } );

        // register style
        const style = createElement( {
            "elementName": `style`,
            "value": configBasedStyle(),
        } );
        document.head.appendChild( style );

        // re-register styles during astro view-transition
        document.addEventListener( `astro:after-swap`, () => document.head.appendChild( style ) );
    }
};

export const validate = ( options: Options ) => {
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
};

export const installTwicPics = ( options: Options ): void => {
    validate( options );
    const { domain, env, path } = options;
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
