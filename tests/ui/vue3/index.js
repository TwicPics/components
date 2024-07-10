import { createApp } from "vue";
import Sample from './Sample.vue';
import TwicPics from "@twicpics/components/vue3";
import "@twicpics/components/style.css";
import config from '../_/config';
import "../_/sample.css";

const app = createApp( Sample );
app.use( TwicPics, config );

app.mount( `body` );
