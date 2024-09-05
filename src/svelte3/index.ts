import type { ComponentType, SvelteComponentTyped } from "svelte";
import "../_/style.css";
import type {
    Anchor,
    Environment,
    Mode,
    Placeholder,
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
import type { BackgroundAttributes, ImgAttributes, PictureAttributes, VideoAttributes } from "./type";
export type { Anchor, Environment, Mode, Placeholder, State, StateEvent };
const installTwicpics = installTwicPics;
const TwicBackground = _TwicBackground as unknown as ComponentType < SvelteComponentTyped< BackgroundAttributes > >;
const TwicImg = _TwicImg as unknown as ComponentType < SvelteComponentTyped< ImgAttributes > >;
const TwicPicture = _TwicPicture as unknown as ComponentType < SvelteComponentTyped< PictureAttributes > >;
const TwicVideo = _TwicVideo as unknown as ComponentType < SvelteComponentTyped< VideoAttributes > >;
const TwicView = _TwicView as unknown as ComponentType < SvelteComponentTyped >;
export { installTwicpics, installTwicPics, TwicBackground, TwicImg, TwicPicture, TwicVideo, TwicView };
