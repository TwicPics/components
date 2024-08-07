import Vue from "vue";
import TwicPics from "@twicpics/components/vue2";
import "@twicpics/components/style.css";
import config from '../_/config';
import "../_/sample.css";

Vue.use( TwicPics, config );

import Sample from './Sample.vue';

Vue.config.productionTip = false;

new Vue( {
    "render": h => h( Sample ),
} ).$mount( `#app` );
