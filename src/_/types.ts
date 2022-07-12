import type { PlaceholderData } from "./placeholder";

export type Mode = `contain` | `cover`;
export type Placeholder = `maincolor` | `meancolor` | `none` | `preview`;
export type Transition = `fade` | `zoom` | `none`;
export type Environment = `debug` | `offline` | `production`;

export interface Attributes {
    alt?: string,
    anchor?: string,
    bot?: string,
    focus?: string,
    mode?: Mode,
    placeholder?: Placeholder,
    position?: string,
    preTransform?:string,
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
    debug?: boolean,
    domain: string,
    maxDPR?: number,
    env?: Environment,
    path?: string,
    step?: number,
}

export interface PlaceholderHandler {
    delete: () => void,
    setData: ( data: PlaceholderData ) => void,
    setPlaceholderElement: ( placeholderElement: HTMLDivElement ) => void,
}

