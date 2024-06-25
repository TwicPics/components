import React from 'react';
import ReactDOM from 'react-dom/client';
import { installTwicpics, TwicImg } from "@twicpics/components/react";
import "@twicpics/components/style.css";

const queryParams = new URLSearchParams( window.location.search );
const src = queryParams.get("src") || `cat_1x1.jpg`

installTwicpics( {
    "domain": `https://demo.twic.it`,
    "anticipation": 0.5,
    "step": 100,
    "env": `production`,
} );

ReactDOM.createRoot( document.getElementById( `root` ) ).render(
    <React.StrictMode>
      <>
        <TwicImg src={src}/>
      </>
    </React.StrictMode>
);
