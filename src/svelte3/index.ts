import "../_/style.css";
export { default as installTwicPics } from "../_/install";
import imgVideo from "./img-video";
import view from "./view";
export const TwicImg = imgVideo( `img` );
export const TwicVideo = imgVideo( `video` );
export const TwicView = view();
