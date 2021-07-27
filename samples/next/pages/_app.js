import Sample from "@twicpics/components-sample/Sample.jsx";
import { installTwicPics } from "@twicpics/components/react";
import "@twicpics/components/react/style.css";
import "@twicpics/components-sample/Sample.css";

installTwicPics( {
    "domain": `https://demo.twic.pics`,
    "anticipation": 0.5,
    "step": 100,
} );

export default Sample;
