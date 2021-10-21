export type Mode = `contain` | `cover`;
export type Placeholder = `maincolor` | `meancolor` | `none` | `preview`;

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


export interface Config {
    class: string,
    domain: OptionalString,
}
export const rValidMode = /^(?:contain|cover)$/;
export const isValidMode = ( value: Mode | string ): boolean => rValidMode.test( value );

export const rValidPlaceholder = /^(?:maincolor|meancolor|none|preview)$/;
export const isValidPlaceholder = ( value: Placeholder | string ): boolean => rValidPlaceholder.test( value );

