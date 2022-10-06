import "../_/style.css";
export { default as installTwicPics } from "../_/install";
import factory from "./factory";
import twicView from "./twicView";
export const TwicImg = factory( `img` );
export const TwicVideo = factory( `video` );
export const TwicView = twicView();
