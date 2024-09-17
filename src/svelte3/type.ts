
import type {
    Attributes,
    CrossOrigin,
    Decoding,
    Mode,
    ReferrerPolicy,
    ScriptAttributes,
    State,
} from "./_utils";

interface BaseAttributes extends Attributes {
    class?: string,
    state?: State,
    style?: string | Record< string, unknown >,
}

export interface HtmlDivAttributes {
    draggable?: boolean | `true` | `false`,
    id?: string,
    role?: string,
    tabindex?: number,
    [ key: string ]: unknown,
}

interface HtmlImageAttributes {
    crossorigin?: CrossOrigin,
    decoding?: Decoding,
    referrerpolicy?: ReferrerPolicy,
}

export interface ImgAttributes extends BaseAttributes, HtmlDivAttributes, HtmlImageAttributes, ScriptAttributes {
    refit?: boolean | string,
    zoom?: number | string,
}

export interface BackgroundAttributes extends BaseAttributes, HtmlDivAttributes, ScriptAttributes {
    refit?: boolean | string,
    mediaTag?: string,
}

export interface PictureAttributes extends BaseAttributes, HtmlDivAttributes, HtmlImageAttributes {
    fetchpriority?: string,
    mode?: Mode,
    refit?: boolean | string,
    sizes?: string
}

export interface VideoAttributes extends BaseAttributes, HtmlDivAttributes, ScriptAttributes {
    crossorigin?: CrossOrigin,
    duration?: number | string,
    from?: number | string,
    posterFrom?: number | string,
    to?: number | string,
}
