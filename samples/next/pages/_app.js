import { installTwicPics } from "@twicpics/components/react";
import "@twicpics/components/style.css";
import "@twicpics/components-sample/Sample.css";

installTwicPics( {
    "domain": `https://demo.twic.pics`,
    "anticipation": 0.5,
    "step": 100,
    "env": `production`,
} );

function MyApp( { Component, pageProps } ) {
    return <Component {...pageProps} />;
}

export default MyApp;
