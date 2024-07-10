import { TwicInstall } from "@twicpics/components/react";
import "@twicpics/components/style.css";
import '../../_/sample.css';
import config from '../../_/config';

function MyApp( { Component, pageProps } ) {
    return (
        <>
            <TwicInstall { ...config } />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
