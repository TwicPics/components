export type Mode = `contain` | `cover`;
export type OptionalNumber = number | string | undefined;
export type OptionalString = string | undefined;
export type Placeholder = `preview` | `meancolor` | `maincolor` | `none`;

export type Attributes = {
    alt?: OptionalString,
    bot?: OptionalString,
    focus?: OptionalString,
    height?: OptionalNumber,
    mode: Mode,
    placeholder?: Placeholder,
    position?: OptionalString,
    ratio?: OptionalString,
    step?: OptionalNumber,
    src: string,
    transition: boolean,
    transitionDelay?: OptionalString,
    transitionDuration?: OptionalString,
    transitionTimingFunction?: OptionalString,
    width?: OptionalNumber,
};

export type Options = {
    anticipation?: OptionalNumber,
    class?: OptionalString,
    domain: string,
    maxDPR?: OptionalNumber,
    path?: OptionalString,
    step?: OptionalNumber,
};
