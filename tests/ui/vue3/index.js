import { createApp } from "vue";
import Sample from './Sample.vue';
import TwicPics from "@twicpics/components/vue3";
import "@twicpics/components/style.css";
import "../_/sample.css";
import config from "../_/config";

const app = createApp( Sample );
app.use( TwicPics, config );

app.mount( `body` );
