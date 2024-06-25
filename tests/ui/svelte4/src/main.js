import { installTwicpics } from "@twicpics/components/svelte4";
import Sample from "./components/Sample.svelte";

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
