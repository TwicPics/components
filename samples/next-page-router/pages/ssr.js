/* eslint-disable no-console */
// eslint-disable-next-line no-use-before-define
import * as React from "react";
import { TwicImg, TwicPicture } from "@twicpics/components/react";
import { getSampleImage } from "@twicpics/components-sample/fakeServer.js";
import MenuBar from "../components/menuBar";

// eslint-disable-next-line no-shadow
const SSRPage = ( { imgSrc, focus, mode, ratio } ) => (
    <main>
        <MenuBar></MenuBar>
        <h1>Next.js SSR test page</h1>
        <h2>
            { focus ? `focus='auto',` : `` } mode = { mode }
        </h2>
        <div className="samples">
            <div className="item">
                <TwicImg
                    src={ imgSrc }
                    ratio={ ratio }
                    onStateChange={ stateEvent => {
                        console.log( `Image 1, stateEvent = `, stateEvent );
                    } }
                    focus={ focus }
                    mode={ mode }
                    zoom={2}
                />
                <span>ratio = { ratio }</span>
            </div>
            <div className="item">
                <TwicImg
                    src={ imgSrc }
                    ratio={ ratio }
                    onStateChange={ stateEvent => {
                        console.log( `Image 2, stateEvent = `, stateEvent );
                    } }
                    focus={ focus }
                    mode={ mode }
                    transition = "zoom"
                />
                <span>ratio = { ratio }, transition = "zoom"</span>
            </div>
            <div className="item">
                <TwicPicture
                    src="football.jpg"
                    sizes="
                      (max-width: 750px) 100vm,
                      (max-width: 1140px) 400px,
                      350px
                    "
                />
                <span>TwicPicture</span>
            </div>
            <div className="item">
                <TwicPicture
                    src="football.jpg"
                    refit
                    sizes="
                      (max-width: 750px) 100vm,
                      (max-width: 1140px) 400px,
                      350px
                    "
                />
                <span>TwicPicture + refit</span>
            </div>
            <div className="item">
                <TwicPicture
                    src="football.jpg"
                    eager
                    sizes="
                      (max-width: 750px) 100vm,
                      (max-width: 1140px) 400px,
                      350px
                    "
                />
                <span>TwicPicture + eager</span>
            </div>
        </div>
    </main>
);

export async function getServerSideProps( ) {
    const res = await getSampleImage();
    return {
        "props": res,
    };
}

export default SSRPage;
