import Vue from "vue";
import TwicPics from "@twicpics/components/vue2";
import "@twicpics/components/style.css";
import "../_/sample.css";

Vue.use( TwicPics, {
    "domain": `https://demo.twic.it`,
    "anticipation": 0.5,
    "step": 100,
    "env": `production`,
} );

import Sample from './Sample.vue';

Vue.config.productionTip = false;

new Vue( {
    "render": h => h( Sample ),
} ).$mount( `#app` );
