import { TwicInstall } from "@twicpics/components/react";
import "@twicpics/components/style.css";
import './app.css';

function MyApp( { Component, pageProps } ) {
    return (
        <>
            <TwicInstall
                domain="https://demo.twic.it"
                anticipation="0.5"
                step="100"
                env="production"
            />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
