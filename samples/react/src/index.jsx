import React from "react";
import { createRoot } from 'react-dom/client';
import Sample from "@twicpics/components-sample/Sample.jsx";

import { installTwicPics } from "@twicpics/components/react";
import "@twicpics/components/style.css";
import "@twicpics/components-sample/Sample.css";

installTwicPics( {
    "domain": `https://demo.twic.pics`,
    "anticipation": 0.5,
    "step": 100,
    "env": `production`,
} );

const container = document.body;
const root = createRoot( container );
root.render(
    <Sample />
);
