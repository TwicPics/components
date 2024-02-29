import { installTwicpics } from "@twicpics/components/svelte5";
import { mount } from 'svelte';
import Sample from "./components/Sample.svelte";

import "@twicpics/components/style.css";

installTwicpics( {
    "domain": `https://demo.twic.it`,
    "anticipation": 0.5,
    "step": 100,
    "env": `production`,
} );

const app = mount( Sample, {
    "target": document.body,
} );

export default app;
