// eslint-disable-next-line no-use-before-define
import * as React from "react";
import { TwicImg } from "@twicpics/components/react";
import { getSampleImage } from "@twicpics/components-sample/fakeServer.js";
import Menu from "../components/menu";

const SSRPage = ( { serverData } ) => (
    <main>
        <Menu></Menu>
        <h1>Gatsby SSR test page</h1>
        <h2>
            { serverData.focus ? `focus='auto',` : `` } mode = { serverData.mode }
        </h2>
        <div className="samples">
            <div className="item">
                <TwicImg
                    src={ serverData.imgSrc }
                    ratio={ serverData.ratio }
                    focus={ serverData.focus }
                    mode={ serverData.mode }
                />
                <span>ratio = { serverData.ratio }</span>
            </div>
            <div className="item">
                <TwicImg
                    src={ serverData.imgSrc }
                    ratio={ serverData.ratio }
                    focus={ serverData.focus }
                    mode={ serverData.mode }
                    transition = "zoom"
                />
                <span>ratio = { serverData.ratio }, transition = "zoom"</span>
            </div>
        </div>

    </main>
);
export default SSRPage;
export async function getServerData() {
    const res = await getSampleImage();
    return {
        "props": res,
    };
}
