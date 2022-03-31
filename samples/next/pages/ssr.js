// eslint-disable-next-line no-use-before-define
import * as React from "react";
import { TwicImg } from "@twicpics/components/react";
import { getSampleImage } from "@twicpics/components-sample/fakeServer.js";
import Menu from "../components/menu";

// eslint-disable-next-line no-shadow
const SSRPage = ( { imgSrc, focus, mode, ratio } ) => (
    <main>
        <Menu></Menu>
        <h1>Next.js SSR test page</h1>
        <h2>
            { focus ? `focus='auto',` : `` } mode = { mode }
        </h2>
        <div className="samples">
            <div className="item">
                <TwicImg
                    src={ imgSrc }
                    ratio={ ratio }
                    focus={ focus }
                    mode={ mode }
                />
                <span>ratio = { ratio }</span>
            </div>
            <div className="item">
                <TwicImg
                    src={ imgSrc }
                    ratio={ ratio }
                    focus={ focus }
                    mode={ mode }
                    transition = "zoom"
                />
                <span>ratio = { ratio }, transition = "zoom"</span>
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
