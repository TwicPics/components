import { trimRegExpFactory } from "./utils";

export type Mode = `contain` | `cover`;

export type Placeholder = `maincolor` | `meancolor` | `none` | `preview`;
export type Transition = `fade` | `zoom` | `none`;

export interface Attributes {
    alt?: string,
    bot?: string,
    focus?: string,
    mode?: Mode,
    placeholder?: Placeholder,
    position?: string,
    ratio?: number | string,
    step?: number | string,
    src: string,
    transition?: boolean | string,
    transitionDelay?: string,
    transitionDuration?: string,
    transitionTimingFunction?: string,
}

export interface Options {
    anticipation?: number,
    class?: string,
    domain: string,
    maxDPR?: number,
    path?: string,
    step?: number,
}

export const validModes: Array< Mode > = [ `contain`, `cover` ];
export const rValidMode = trimRegExpFactory( validModes );

export const validPlaceholders: Array< Placeholder > = [ `maincolor`, `meancolor`, `none`, `preview` ];
export const rValidPlaceholder = trimRegExpFactory( validPlaceholders );

export const rValidRatio = trimRegExpFactory( `(\\d+(?:\\.\\d+)?)(?:\\s*\\/\\s*(\\d+(?:\\.\\d+)?))?` );
