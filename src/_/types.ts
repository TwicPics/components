export type Anchor =
    `bottom` | `bottom-left` | `bottom-right` | `center` | `left` | `top` | `top-left` | `top-right` | `right`;
export type BreakPoint = `xs` | `sm` | `md` | `lg` | `xl` | `2xl`;
export type Environment = `debug` | `offline` | `production`;
export type FetchPriority = `high` | `low` | `auto`;
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
export interface ArtDirective {
    breakpoint: number,
    anchor?: AnchorObject,
    focus?: string;
    height?: string;
    media?: string,
    ratio?: number;
    resolutions?: number[];
    sizes?: string;
    width?: number;
    [ key: string ]: AnchorObject | number | number[] | string;
}
export interface Attributes {
    alt?: string,
    anchor?: string,
    focus?: string,
    mode?: Mode,
    eager?: boolean | string,
    position?: string,
    preTransform?:string,
    ratio?: number | string,
    src: string,
    title?: string,
}

export interface ScriptAttributes {
  bot?: string,
  intrinsic?: string,
  placeholder?: Placeholder,
  step?: number | string,
  transition?: boolean | string,
  transitionDelay?: string,
  transitionDuration?: string,
  transitionTimingFunction?: string,
}

export interface Config {
    anticipation?: number,
    breakpoints: { [ key in BreakPoint ]: number },
    class: string,
    domain: string,
    env: Environment,
    handleShadowDom: ( item?: Element ) => void,
    maxDPR: number;
    path: string,
    step: number,
}

export interface Context {
  height?: number,
  mode: string,
  width?: number,
}

export interface CreateUrlData {
    domain: string,
    context?: Context,
    inspect?: boolean,
    output?: string,
    quality?: number,
    transform?: string,
    src: string,
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
    mode?:Mode,
    preTransform?: string,
    refit?: string,
}
export interface PlaceholderData {
    anchor: AnchorObject,
    focus: string,
    mode: Mode,
    placeholder: Placeholder,
    preTransform: string,
    ratio: number,
    refit: string,
    src: string,
    transitions: Record< string, boolean >,
    videoOptions?: VideoOptions
}

export interface VideoOptions {
    videoTransform?: string,
    posterTransform?: string,
}

