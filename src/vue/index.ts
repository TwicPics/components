import type { Config } from "../_/types";
import { ComponentFactory, default as register } from "./register";
import { default as install } from "../_/install";

export default {
    "install": ( Vue: ComponentFactory, config: Config ): void => {
        install( config );
        register( Vue, `TwicImg`, `img` );
        register( Vue, `TwicVideo`, `video` );
    },
};
