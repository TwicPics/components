export type Anchor = `bottom` | `bottom-left` | `bottom-right` | `left` | `top` | `top-left` | `top-right` | `right`;
export type Environment = `debug` | `offline` | `production`;
export type Media = HTMLImageElement | HTMLVideoElement;
export type Mode = `contain` | `cover`;
export type Placeholder = `maincolor` | `meancolor` | `none` | `preview`;
export type StateEvent = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target: any,
    state: State
};
export type State = `error` | `done` | `loading` | `new`;
export type Transition = `fade` | `zoom` | `none`;

export interface AnchorObject {
    x: string | undefined,
    y: string | undefined,
}
export interface Attributes {
    alt?: string,
    anchor?: string,
    bot?: string,
    focus?: string,
    intrinsic?: string,
    mode?: Mode,
    eager: boolean,
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
    src: string,
    transitions: Record< string, boolean >
}

