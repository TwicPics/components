import { createApp } from "vue";
import Sample from './Sample.vue';
import TwicPics from "@twicpics/components/vue3";
import "@twicpics/components/style.css";
import "../_/sample.css";

const app = createApp( Sample );
app.use( TwicPics, {
    "domain": `https://demo.twic.it`,
    "anticipation": 0.5,
    "step": 100,
    "env": `production`,
} );

app.mount( `body` );
