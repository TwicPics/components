import { createApp } from "vue";

import Main from "@twicpics/components-sample/Sample.vue";
import TwicPics from "@twicpics/components/vue3";
import "@twicpics/components/style.css";

const app = createApp( Main );

app.use( TwicPics, {
    "domain": `https://demo.twic.pics`,
    "anticipation": 0.5,
    "step": 100,
    "env": `production`,
} );

app.mount( `body` );
