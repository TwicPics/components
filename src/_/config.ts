import { createElement } from "./dom";
import type { Config, Options } from "./types";
import { isBrowser, isReactNative, noop } from "./utils";

const defaultConfig: Config = {
    "debug": false,
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

export const setConfig = ( options: Options ): void => {
    const { debug, domain, "class": _class, env, handleShadowDom, path } = options;
    config.class = _class || config.class;
    config.domain = domain;
    config.env = debug ? `debug` : env;
    config.path = path;
    config.handleShadowDom = ( handleShadowDom && isBrowser && !isReactNative ) ?
        handleShadowDomFactory( getDataAttributeName( `component` ) ) :
        noop;
    if ( isReactNative ) {
        const { maxDPR, step } = options;
        config.debug = debug;
        config.maxDPR = maxDPR;
        config.step = step;
    }
};
