import type { ComponentType, SvelteComponentTyped } from "svelte";
import "../_/style.css";
import type { Anchor, Attributes, Environment, Mode, Placeholder, Refit, State, StateEvent } from "./_utils.js";
// eslint-disable-next-line no-duplicate-imports
import { installTwicPics } from "./_utils.js";
import { default as _TwicBackground } from "./TwicBackground.svelte";
import { default as _TwicImg } from "./TwicImg.svelte";
import { default as _TwicVideo } from "./TwicVideo.svelte";
import { default as _TwicView } from "./TwicView.svelte";
export interface BaseAttributes extends Attributes {
    class?: string,
    state?: State,
}

interface BackgroundAttributes extends BaseAttributes {
    mediaTag?: string,
}

export interface ImgAttributes extends BaseAttributes {
    refit?: boolean | string,
    zoom?: number | string,
}
export interface MediaAttributes extends BaseAttributes {
    mediaTag: string,
    refit?: Refit,
}
export interface VideoAttributes extends BaseAttributes {
    duration?: number | string,
    from?: number | string,
    posterFrom?: number | string,
    to?: number | string,
}

export type { Anchor, Environment, Mode, Placeholder, State, StateEvent };
const installTwicpics = installTwicPics;
const TwicBackground = _TwicBackground as unknown as ComponentType < SvelteComponentTyped< BackgroundAttributes > >;
const TwicImg = _TwicImg as unknown as ComponentType < SvelteComponentTyped< ImgAttributes > >;
const TwicVideo = _TwicVideo as unknown as ComponentType < SvelteComponentTyped< VideoAttributes > >;
const TwicView = _TwicView as unknown as ComponentType < SvelteComponentTyped >;
export { installTwicpics, installTwicPics, TwicBackground, TwicImg, TwicVideo, TwicView };
