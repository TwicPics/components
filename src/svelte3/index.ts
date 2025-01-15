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
const __INSTALL_FUNCTION__ = installTwicPics;
const __BACKGROUND_COMPONENT__ =
    _TwicBackground as unknown as ComponentType < SvelteComponentTyped< BackgroundAttributes > >;
const __IMG_COMPONENT__ = _TwicImg as unknown as ComponentType < SvelteComponentTyped< ImgAttributes > >;
const __PICTURE_COMPONENT__ = _TwicPicture as unknown as ComponentType < SvelteComponentTyped< PictureAttributes > >;
const __VIDEO_COMPONENT__ = _TwicVideo as unknown as ComponentType < SvelteComponentTyped< VideoAttributes > >;
const __VIEW_COMPONENT__ = _TwicView as unknown as ComponentType < SvelteComponentTyped >;
export {
    __INSTALL_FUNCTION__,
    installTwicPics,
    __BACKGROUND_COMPONENT__,
    __IMG_COMPONENT__,
    __PICTURE_COMPONENT__,
    __VIDEO_COMPONENT__,
    __VIEW_COMPONENT__,
};
