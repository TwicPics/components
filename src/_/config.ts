import type { Config } from "./types";
import { isBrowser, noop } from "./utils";

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
