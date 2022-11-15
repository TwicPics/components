import "../_/style.css";
import { default as installTwicPics } from "../_/install";
import imgVideo from "./img-video";
import view from "./view";
const installTwicpics = installTwicPics;
export { installTwicpics, installTwicPics };
export const TwicImg = imgVideo( `img` );
export const TwicVideo = imgVideo( `video` );
export const TwicView = view();
