import type React from "react";
import type { Attributes, ScriptAttributes, StateEvent, VideoOptions } from "../_/types";

export type onStateChangeType = ( stateEvent: StateEvent ) => void;

export interface HtmlElementAttributes {
    draggable?: boolean,
    id?: string,
    role?: React.AriaRole,
    style?: React.CSSProperties,
    tabIndex?: number,
}

export interface BaseAttributes extends Attributes {
    className?: string;
    onStateChange?: onStateChangeType;
}

export interface ImgAttributes extends BaseAttributes, HtmlElementAttributes, ScriptAttributes {
    refit?: boolean | string,
    zoom?: number | string,
}

export interface BackgroundAttributes extends BaseAttributes, HtmlElementAttributes, ScriptAttributes {
    refit?: boolean | string,
    mediaTag?: string;
}

export interface MediaAttributes extends BaseAttributes, ScriptAttributes {
    mediaTag: string,
    refit?: boolean | string,
    videoOptions?: VideoOptions,
}

export interface PictureAttributes extends BaseAttributes, HtmlElementAttributes {
    fetchpriority?: string,
    mode?: string,
    refit?: boolean | string,
    sizes?: string
}

export interface VideoAttributes extends BaseAttributes, HtmlElementAttributes, ScriptAttributes {
    duration?: number | string,
    from?: number | string,
    posterFrom?: number | string,
    to?: number | string,
}
