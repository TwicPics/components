import React from 'react';
import ReactDOM from 'react-dom/client';
import { installTwicpics } from "@twicpics/components/react";
import "@twicpics/components/style.css";
import "../../_/Sample.css";
import Sample from './Sample';

installTwicpics( {
    "domain": `https://demo.twic.it`,
    "anticipation": 0.5,
    "step": 100,
    "env": `production`,
} );

ReactDOM.createRoot( document.getElementById( `root` ) ).render(
    <React.StrictMode>
      <>
        <Sample/>
      </>
    </React.StrictMode>
);
