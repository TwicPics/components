/*
 * public API Surface of ngx-components
 */
export type { Anchor, Mode, Placeholder, State, StateEvent } from "../_/types";
export * from "./background.component";
export * from "./img.component";
export * from "./media.component";
export * from "./video.component";
export * from "./view.component";
export * from "./components.module";
import { default as installTwicPics } from "../_/install";
const installTwicpics = installTwicPics;
export { installTwicpics, installTwicPics };
