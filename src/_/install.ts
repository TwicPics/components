import type { Options, Environment } from "./types";
import { createElement } from "./dom";
import { isBrowser, isReactNative, logWarning, noop, throwError } from "./utils";
import { rValidEnvironment } from "./validate";
import { VERSION } from "./const";

/**
 * default class used in config object
 */
const defaultClass = `twic`;

export const config: {
    debug: boolean,
    class: string,
    domain: string,
    env: Environment,
    handleShadowDom: ( item?: Element ) => void,
    maxDPR: number;
    path: string,
    step: number,
} = {
    "debug": false,
    "class": defaultClass,
    "domain": undefined,
    "env": `production`,
    "handleShadowDom": noop,
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

const handleShadowDomFactory = ( attributeName: string ) => {
    const marked = new WeakSet();
    return ( item: Element ): void => {
        while ( item && !marked.has( item ) ) {
            marked.add( item );
            const { parentNode } = item;
            const isHost = !parentNode && ( item instanceof ShadowRoot );
            if ( isHost ) {
                if ( ( item as unknown as ShadowRoot ).mode === `closed` ) {
                    throw new Error( `cannot use TwicPics components in closed ShadowRoot` );
                }
                createElement( {
                    "element": item as unknown as ShadowRoot,
                    "value": {
                        "elementName": `style`,
                        "value": `*STYLE*${ configBasedStyle() }`,
                    },
                } );
                // eslint-disable-next-line no-param-reassign
                item = ( item as unknown as ShadowRoot ).host;
                if ( item ) {
                    item.setAttribute( attributeName, `` );
                }
            } else {
                // eslint-disable-next-line no-param-reassign
                item = ( parentNode as Element );
            }
        }
    };
};

const parametersMap = [
    [ `anticipation`, `anticipation` ],
    [ `class`, `class` ],
    [ `maxDPR`, `max-dpr` ],
    [ `step`, `step` ],
];
export default ( options: Options ): void => {

    if ( !options ) {
        throwError( `install options not provided` );
    }

    const hasPreviousInstall = config && config.domain;
    const { domain, "class": _class, env, handleShadowDom, path } = options;

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
    config.handleShadowDom =
        ( handleShadowDom && isBrowser && !isReactNative ) ?
            handleShadowDomFactory( getDataAttributeName( `component` ) ) :
            noop;

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
                        "href": domain,
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
                {
                    "value": configBasedStyle(),
                    "elementName": `style`,
                },
            ],
        } );
    }
};
