import type { Attributes, Mode, ScriptAttributes, State } from "./_utils";

interface BaseAttributes extends Attributes {
    class?: string,
    state?: State,
    style?: string | Record< string, unknown >,
}

export interface HtmlElementAttributes {
    draggable?: boolean | `true` | `false`,
    id?: string,
    role?: string,
    tabindex?: number,
    [ key: string ]: unknown,
}

export interface ImgAttributes extends BaseAttributes, HtmlElementAttributes, ScriptAttributes {
    refit?: boolean | string,
    zoom?: number | string,
}

export interface BackgroundAttributes extends BaseAttributes, HtmlElementAttributes, ScriptAttributes {
    refit?: boolean | string,
    mediaTag?: string,
}

export interface PictureAttributes extends BaseAttributes, HtmlElementAttributes {
    fetchpriority?: string,
    mode?: Mode,
    refit?: boolean | string,
    sizes?: string
}

export interface VideoAttributes extends BaseAttributes, HtmlElementAttributes, ScriptAttributes {
    duration?: number | string,
    from?: number | string,
    posterFrom?: number | string,
    to?: number | string,
}
