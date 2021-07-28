import { installTwicPics } from "@twicpics/components/svelte3";
import Sample from "./Sample.svelte";

import "@twicpics/components/svelte3/style.css";

installTwicPics( {
    "domain": `https://demo.twic.pics`,
    "anticipation": 0.5,
    "step": 100,
} );

export default new Sample( {
    "target": document.body,
} );
