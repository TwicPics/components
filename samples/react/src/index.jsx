import React from "react";
import { createRoot } from 'react-dom/client';
import Sample from "@twicpics/components-sample/Sample.jsx";
import { installTwicpics } from "@twicpics/components/react";
import "@twicpics/components/style.css";
import "@twicpics/components-sample/Sample.css";

installTwicpics( {
    "domain": `https://demo.twic.it`,
    "anticipation": 0.5,
    "step": 100,
    "env": `production`,
} );

const container = document.body;
const root = createRoot( container );
root.render(
    <Sample />
);
