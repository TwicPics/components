import { createApp } from "vue";

import Main from "../_/Sample.vue";
import Twicpics from "@twicpics/components/vue3";
import "@twicpics/components/vue3/style.css";

const app = createApp( Main );

app.use( Twicpics, {
    "domain": `https://demo.twic.pics`,
    "anticipation": 0.5,
    "step": 100,
} );

app.mount( `body` );
