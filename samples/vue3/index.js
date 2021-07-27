import { createApp } from "vue";

import Main from "../Sample.vue";
import Twicpics from "../../dist/vue3/esm.js";
import "../../dist/vue3/style.css";

const app = createApp( Main );

app.use( Twicpics, {
    "domain": `https://demo.twic.pics`,
    "anticipation": 0.5,
    "step": 100,
} );

app.mount( `body` );
