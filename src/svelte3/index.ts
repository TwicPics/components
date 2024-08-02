import type { ComponentType, SvelteComponentTyped } from "svelte";
import "../_/style.css";
import type {
    Anchor,
    Attributes,
    CrossOrigin,
    Decoding,
    Environment,
    HtmlElementAttributes,
    HtmlImageAttributes,
    Mode,
    Placeholder,
    ScriptAttributes,
    State,
    StateEvent,
} from "./_utils.js";
// eslint-disable-next-line no-duplicate-imports
import { installTwicPics } from "./_utils.js";
import { default as _TwicBackground } from "./TwicBackground.svelte";
import { default as _TwicImg } from "./TwicImg.svelte";
import { default as _TwicPicture } from "./TwicPicture.svelte";
import { default as _TwicVideo } from "./TwicVideo.svelte";
import { default as _TwicView } from "./TwicView.svelte";
export interface BaseAttributes extends Attributes {
    class?: string,
    state?: State,
}

interface BackgroundAttributes extends BaseAttributes {
    mediaTag?: string,
}

export interface ImgAttributes extends BaseAttributes, HtmlElementAttributes, HtmlImageAttributes, ScriptAttributes {
    refit?: boolean | string,
    zoom?: number | string,
}

export interface MediaAttributes extends BaseAttributes, ScriptAttributes {
    crossorigin?: CrossOrigin,
    mediaTag: string,
    refit?: boolean | string,
}

export interface PictureAttributes extends BaseAttributes, HtmlElementAttributes, HtmlImageAttributes {
    fetchpriority?: string,
    refit?: boolean | string,
    sizes?: string
}

export interface VideoAttributes extends BaseAttributes, HtmlElementAttributes, ScriptAttributes {
    crossorigin?: CrossOrigin,
    duration?: number | string,
    from?: number | string,
    posterFrom?: number | string,
    to?: number | string,
}

export type { Anchor, Decoding, CrossOrigin, Environment, Mode, Placeholder, State, StateEvent };
const installTwicpics = installTwicPics;
const TwicBackground = _TwicBackground as unknown as ComponentType < SvelteComponentTyped< BackgroundAttributes > >;
const TwicImg = _TwicImg as unknown as ComponentType < SvelteComponentTyped< ImgAttributes > >;
const TwicPicture = _TwicPicture as unknown as ComponentType < SvelteComponentTyped< PictureAttributes > >;
const TwicVideo = _TwicVideo as unknown as ComponentType < SvelteComponentTyped< VideoAttributes > >;
const TwicView = _TwicView as unknown as ComponentType < SvelteComponentTyped >;
export { installTwicpics, installTwicPics, TwicBackground, TwicImg, TwicPicture, TwicVideo, TwicView };
