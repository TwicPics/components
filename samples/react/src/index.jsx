import React from "react";
import ReactDOM from "react-dom";
import Sample from "../../Sample.jsx";

import { installTwicPics } from "../../../dist/react/esm.js";

installTwicPics( {
    "domain": `https://demo.twic.pics`,
    "anticipation": 0.5,
    "step": 100,
} );

ReactDOM.render(
    <React.StrictMode>
        <Sample />
    </React.StrictMode>,
    document.body
);
