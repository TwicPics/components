export type Anchor =
    `bottom` | `bottom-left` | `bottom-right` | `center` | `left` | `top` | `top-left` | `top-right` | `right`;
export type Environment = `debug` | `offline` | `production`;
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
    eager?: boolean | string,
    placeholder?: Placeholder,
    position?: string,
    preTransform?:string,
    ratio?: number | string,
    step?: number | string,
    src: string,
    title?: string,
    transition?: boolean | string,
    transitionDelay?: string,
    transitionDuration?: string,
    transitionTimingFunction?: string,
}

export interface Config {
    class: string,
    domain: string,
    env: Environment,
    handleShadowDom: ( item?: Element ) => void,
    maxDPR: number;
    path: string,
    step: number,
}

export interface CreateUrlData {
    domain: string,
    output?: string,
    quality?: number,
    src: string,
    transform?: string
}

export interface Options {
    anticipation?: number,
    class?: string,
    debug?: boolean,
    domain: string,
    env?: Environment,
    handleShadowDom?: boolean,
    maxDPR?: number,
    path?: string,
    step?: number,
}

export interface PreTransformData {
    anchor?: AnchorObject,
    debug?: boolean,
    focus?: string,
    mode?: Mode,
    preTransform?: string,
    refit?: Refit,
    videoTransform?: string
}
export interface PlaceholderData {
    anchor: AnchorObject,
    focus: string,
    mode: Mode,
    placeholder: Placeholder,
    preTransform: string,
    ratio: number,
    refit?: Refit,
    src: string,
    transitions: Record< string, boolean >,
    videoOptions?: VideoOptions
}

export interface Refit {
  height?: number,
  padding: string,
  width?: number,
}

export interface VideoOptions {
    videoTransform?: string,
    posterTransform?: string,
}

