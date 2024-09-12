import type React from "react";
import type {
    Attributes,
    CrossOrigin,
    Decoding,
    Mode,
    ReferrerPolicy,
    ScriptAttributes,
    StateEvent,
    VideoOptions,
} from "../_/types";

export type onStateChangeType = ( stateEvent: StateEvent ) => void;

export interface HtmlDivAttributes {
    draggable?: boolean,
    id?: string,
    role?: React.AriaRole,
    style?: React.CSSProperties,
    tabIndex?: number,
}

interface HtmlImageAttributes {
    crossOrigin?: CrossOrigin;
    decoding?: Decoding,
    referrerPolicy?: ReferrerPolicy,
}

export interface BaseAttributes extends Attributes {
    className?: string;
    onStateChange?: onStateChangeType;
}

export interface ImgAttributes extends BaseAttributes, HtmlDivAttributes, HtmlImageAttributes, ScriptAttributes {
    refit?: boolean | string,
    zoom?: number | string,
}

export interface BackgroundAttributes extends BaseAttributes, HtmlDivAttributes, ScriptAttributes {
    refit?: boolean | string,
    mediaTag?: string;
}

export interface MediaAttributes extends BaseAttributes, ScriptAttributes, HtmlImageAttributes {
    mediaTag: string,
    refit?: boolean | string,
    videoOptions?: VideoOptions,
}

export interface PictureAttributes extends BaseAttributes, HtmlDivAttributes, HtmlImageAttributes {
    fetchpriority?: string,
    mode?: Mode,
    refit?: boolean | string,
    sizes?: string
}

export interface VideoAttributes extends BaseAttributes, HtmlDivAttributes, ScriptAttributes {
    crossOrigin?: CrossOrigin,
    duration?: number | string,
    from?: number | string,
    posterFrom?: number | string,
    to?: number | string,
}
