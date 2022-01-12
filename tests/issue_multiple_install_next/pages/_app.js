import '../styles/globals.css';
import { installTwicPics } from "@twicpics/components/react";
import "@twicpics/components/style.css";

installTwicPics( {
    "domain": `https://demo.twic.pics`,
    "anticipation": 0.5,
    "step": 100,
} );

function MyApp( { Component, pageProps } ) {
    return <Component {...pageProps} />;
}

export default MyApp;
