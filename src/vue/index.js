import { default as install } from "../_/install.js";
import { default as TwicImg } from "./img.vue";
import { default as TwicVideo } from "./video.vue";

export default {
    install( Vue, config ) {
        install( config );
        Vue.component( `TwicImg`, TwicImg );
        Vue.component( `TwicVideo`, TwicVideo );
    },
};
