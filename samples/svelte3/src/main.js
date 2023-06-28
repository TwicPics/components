import { installTwicpics } from "@twicpics/components/svelte3";
import Sample from "@twicpics/components-sample/Sample.svelte";

import "@twicpics/components/style.css";

installTwicpics( {
    "domain": `https://demo.twic.it`,
    "anticipation": 0.5,
    "step": 100,
    "env": `production`,
} );

export default new Sample( {
    "target": document.body,
} );
