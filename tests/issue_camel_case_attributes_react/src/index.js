// eslint-disable-next-line no-use-before-define
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { installTwicPics } from "@twicpics/components/react";
import "@twicpics/components/style.css";

installTwicPics( {
    "domain": `https://demo.twic.it`,
    "anticipation": 0.5,
    "step": 100,
} );

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById( `root` )
);

// if you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
