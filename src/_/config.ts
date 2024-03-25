import { createElement } from "./dom";
import { parseDomain, parseEnv, parsePath } from "./parse";
import type { Config, Options } from "./types";
import { isBrowser, isReactNative, noop } from "./utils";

const defaultConfig: Config = {
    "breakpoints": {
        "xs": 320,
        "sm": 640,
        "md": 768,
        "lg": 1024,
        "xl": 1280,
        "2xl": 1536,
    },
    "class": `twic`,
    "domain": undefined,
    "env": `production`,
    "handleShadowDom": noop,
    "maxDPR": undefined,
    "path": ``,
    "step": undefined,
};
const w = isBrowser && window as unknown as Record< string, Config >;
export const config: Config = isBrowser ?
    (
        w[ `~ TPCC` ] || ( w[ `~ TPCC` ] = defaultConfig )
    ) :
    defaultConfig;

export const configBasedStyle = (): string =>
    `.twic-w>.${
        config.class
    }-background-done+div,.twic-w>.${
        config.class
    }-done+div,.twic-w>.${
        config.class
    }-poster-done+div{opacity:0 !important}.twic-w>.${
        config.class
    }-done,.twic-w>.${
        config.class
    }-poster-done{transform:none !important}`;

export const getDataAttributeName = ( baseName: string ): string => `data-${ config.class }-${ baseName }`;

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

const DEFAULT_MAX_DPR = 2;
export const setConfig = ( options: Options ): void => {
    const { breakpoints = {}, debug, domain, "class": _class, env, handleShadowDom, maxDPR, path } = options;
    config.breakpoints = {
        ...config.breakpoints,
        ...breakpoints,
    };
    config.class = _class || config.class;
    config.domain = parseDomain( domain );
    config.env = debug ? `debug` : parseEnv( env );
    config.maxDPR = Math.max( 1, maxDPR || DEFAULT_MAX_DPR );
    config.path = parsePath( path );
    config.handleShadowDom = ( handleShadowDom && isBrowser && !isReactNative ) ?
        handleShadowDomFactory( getDataAttributeName( `component` ) ) :
        noop;
    if ( isReactNative ) {
        const { step } = options;
        config.step = step;
    }
};
