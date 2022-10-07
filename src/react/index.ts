export { default as installTwicPics } from "../_/install";
import imgVideo from "./img-video";
import View from "./View";
export const TwicImg = imgVideo( `img`, true );
export const TwicVideo = imgVideo( `video` );
export { View as TwicView };
