import "../style.css";

import Sample, { installTwicPics } from "../esm.js";

installTwicPics( {
    "domain": `https://demo.twic.pics`,
    "anticipation": 0.5,
    "step": 100,
} );

export default Sample;
