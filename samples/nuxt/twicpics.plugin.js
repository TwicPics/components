import Vue from "vue";

import Twicpics from "@twicpics/components/vue2";
import "@twicpics/components/vue2/style.css";

Vue.use( Twicpics, {
    "domain": `https://demo.twic.pics`,
    "anticipation": 0.5,
    "step": 100,
} );
