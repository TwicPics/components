export type Mode = `contain` | `cover`;
export type Placeholder = `preview` | `meancolor` | `maincolor` | `none`;
export type OptionalBoolean = boolean | undefined;
export type OptionalMode = Mode | undefined;
export type OptionalNumber = number | string | undefined;
export type OptionalPlaceholder = Placeholder | undefined;
export type OptionalString = string | undefined;

export interface Attributes {
    alt?: OptionalString,
    bot?: OptionalString,
    focus?: OptionalString,
    height?: OptionalNumber,
    mode?: OptionalMode,
    placeholder?: OptionalPlaceholder,
    position?: OptionalString,
    ratio?: OptionalString,
    step?: OptionalNumber,
    src: string,
    transition?: OptionalBoolean,
    transitionDelay?: OptionalString,
    transitionDuration?: OptionalString,
    transitionTimingFunction?: OptionalString,
    width?: OptionalNumber,
}

export interface Options {
    anticipation?: OptionalNumber,
    class?: OptionalString,
    domain: string,
    maxDPR?: OptionalNumber,
    path?: OptionalString,
    step?: OptionalNumber,
}

export interface Config {
    class: string,
    domain: OptionalString,
}
