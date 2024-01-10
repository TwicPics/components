"use client";
/* eslint-disable react/react-in-jsx-scope */

import { TwicImg, TwicPicture, TwicVideo } from "@twicpics/components/react";
import MenuBar from "../../components/menuBar";

export default function Home() {
    const handleStateChange = ( stateEvent: any ) => {
        // eslint-disable-next-line no-console
        console.log( `React - TwicImg emits new stateEvent`, stateEvent );
    };
    return (
        <main>
            <MenuBar/>
            <div className="samples">
                <div className="item">
                    <TwicImg
                        onStateChange={handleStateChange}
                        src="football.jpg"
                        zoom="2"
                    />
                </div>
                <div className="item">
                    <TwicImg
                        src="football.jpg"
                        ratio="4/3"
                        zoom="2"
                    />
                </div>
                <div className="item">
                    <TwicImg
                        src="football.jpg"
                        refit
                        ratio="4/3"
                        mode="contain"
                    />
                </div>
                <div className="item">
                    <TwicVideo
                        src="video/skater.mp4"
                    />
                </div>
                <div className="item">
                    <TwicVideo
                        src="video/purple-shirt.mp4"
                        preTransform="focus=50px30p/crop=300x300"
                        to={9}
                    />
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
                </div>
            </div>
        </main>
    );
}
