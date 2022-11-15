import { default as installTwicPics } from "../_/install";
import imgVideo from "./img-video";
import View from "./View";
const installTwicpics = installTwicPics;
export const TwicImg = imgVideo( `img`, true );
export const TwicVideo = imgVideo( `video` );
export { installTwicpics, installTwicPics, View as TwicView };
