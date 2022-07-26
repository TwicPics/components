import type { ComponentType, SvelteComponentTyped } from "svelte";
import "../_/style.css";
import type { Anchor, BaseAttributes, Environment, Mode, Placeholder, State, StateEvent } from "./_utils.js";
// eslint-disable-next-line no-duplicate-imports
import { installTwicPics } from "./_utils.js";
import { default as _TwicImg } from "./TwicImg.svelte";
import { default as _TwicVideo } from "./TwicVideo.svelte";
import { default as _TwicView } from "./TwicView.svelte";
export interface Attributes extends BaseAttributes {
    class?: string,
    state?: State,
}
export type { Anchor, Environment, Mode, Placeholder, State, StateEvent };
const installTwicpics = installTwicPics;
const TwicImg = _TwicImg as unknown as ComponentType < SvelteComponentTyped< Attributes > >;
const TwicVideo = _TwicVideo as unknown as ComponentType < SvelteComponentTyped< Attributes > >;
const TwicView = _TwicView as unknown as ComponentType < SvelteComponentTyped >;
export { installTwicpics, installTwicPics, TwicImg, TwicVideo, TwicView };
