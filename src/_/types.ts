export type Anchor = `bottom` | `bottom-left` | `bottom-right` | `left` | `top` | `top-left` | `top-right` | `right`;
export type Mode = `contain` | `cover`;
export type Placeholder = `maincolor` | `meancolor` | `none` | `preview`;
export type Transition = `fade` | `zoom` | `none`;
export type Environment = `debug` | `offline` | `production`;

export interface AnchorObject {
    x: string | undefined,
    y: string | undefined,
}
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

export interface PlaceholderData {
    anchor: AnchorObject,
    focus: string,
    mode: Mode,
    placeholder: Placeholder,
    preTransform: string,
    ratio: number,
    transitions: Record< string, boolean >,
    src: string
}

export interface PlaceholderHandler {
    delete: () => void,
    setData: ( data: PlaceholderData ) => void,
    setPlaceholderElement: ( placeholderElement: HTMLDivElement ) => void,
}

