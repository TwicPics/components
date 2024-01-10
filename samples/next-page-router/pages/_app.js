import { TwicInstall } from "@twicpics/components/react";
import "@twicpics/components/style.css";
import "@twicpics/components-sample/Sample.css";

const breakpoints = {
  "2xl": 4000,
  "md": 666,
}

function MyApp( { Component, pageProps } ) {
    return (
        <>
            <TwicInstall
                domain="https://demo.twic.it"
                anticipation="0.5"
                breakpoints={breakpoints}
                step="100"
                env="production"
            />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
