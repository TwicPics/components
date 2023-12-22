/* eslint-disable no-console */
// eslint-disable-next-line no-use-before-define
import * as React from "react";
import { TwicImg, TwicPicture } from "@twicpics/components/react";
import { getSampleImage } from "@twicpics/components-sample/fakeServer.js";
import MenuBar from "../components/menuBar";

const SSRPage = ( { serverData } ) => (
    <main>
        <MenuBar></MenuBar>
        <h1>Gatsby SSR test page</h1>
        <h2>
            { serverData.focus ? `focus='auto',` : `` } mode = { serverData.mode }
        </h2>
        <div className="samples">
            <div className="item">
                <TwicImg
                    src={ serverData.imgSrc }
                    ratio={ serverData.ratio }
                    onStateChange={ stateEvent => {
                        console.log( `Image 1, stateEvent = `, stateEvent );
                    } }
                    focus={ serverData.focus }
                    mode={ serverData.mode }
                />
                <span>ratio = { serverData.ratio }</span>
            </div>
            <div className="item">
                <TwicImg
                    src={ serverData.imgSrc }
                    ratio={ serverData.ratio }
                    onStateChange={ stateEvent => {
                        console.log( `Image 2, stateEvent = `, stateEvent );
                    } }
                    focus={ serverData.focus }
                    mode={ serverData.mode }
                    transition = "zoom"
                />
                <span>ratio = { serverData.ratio }, transition = "zoom"</span>
            </div>
            <div className="item">
                <TwicPicture
                    eager
                    src="football.jpg"
                    sizes="
                      (max-width: 750px) 100vm,
                      (max-width: 1140px) 400px,
                      350px
                    "
                />
                <span>TwicPicture</span>
            </div>
        </div>
    </main> );

export default SSRPage;
export async function getServerData() {
    const res = await getSampleImage();
    return {
        "props": res,
    };
}
