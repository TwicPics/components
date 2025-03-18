/*
 * public API Surface of ngx-components
 */
export type {
    Anchor,
    CrossOrigin,
    Decoding,
    Environment,
    Mode,
    Placeholder,
    ReferrerPolicy,
    State,
    StateEvent,
} from "../_/types";
export * from "./background.component";
export * from "./img.component";
export * from "./media.component";
export * from "./picture.component";
export * from "./video.component";
export * from "./view.component";
export * from "./components.module";
import { installTwicPics } from "../_/install";
const __INSTALL_FUNCTION__ = installTwicPics;
export {
    __INSTALL_FUNCTION__,
    installTwicPics,
};
