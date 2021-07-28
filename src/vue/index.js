import { default as install } from "../_/install.js";
import register from "./register.js";

export default {
    install( Vue, config ) {
        install( config );
        register( Vue, `TwicImg`, `img`, true );
        register( Vue, `TwicVideo`, `video` );
    },
};
