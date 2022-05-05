import Vue from "vue";

import Main from "@twicpics/components-sample/Sample.vue";
import TwicPics from "@twicpics/components/vue2";
import "@twicpics/components/style.css";

Vue.use( TwicPics, {
    "domain": `https://demo.twic.pics`,
    "anticipation": 0.5,
    "step": 100,
    "env": `production`,
} );

Vue.config.productionTip = false;

new Vue( {
    "render": h => h( Main ),
} ).$mount( `#app` );
