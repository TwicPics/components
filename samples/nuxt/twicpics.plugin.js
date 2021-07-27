import Vue from "vue";

import Twicpics from "../../dist/vue2/esm.js";
import "../../dist/vue2/style.css";

Vue.use( Twicpics, {
    "domain": `https://demo.twic.pics`,
    "anticipation": 0.5,
    "step": 100,
} );
