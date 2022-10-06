export { default as installTwicPics } from "../_/install";
import factory from "./factory";
import TwicView from "./twicView";
export const TwicImg = factory( `img`, true );
export const TwicVideo = factory( `video` );
export { TwicView };
