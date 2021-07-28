<script>
import { callWithThis, defineProp, defineStringProp } from "./utils.js";
import {
    computeAlt,
    computeDataBot,
    computeDataFocus,
    computeDataSrc,
    computeDataStep,
    computeHeight,
    computeStyle,
    computeWidth,
    computeWrapperClass,
    computeWrapperStyle,
} from "../_/compute.js";

const numberProp = defineProp( [ Number, String ], /^\d+$/ );
const stringProp = defineStringProp();

export default {
    "props": {
        "bot": stringProp,
        "focus": stringProp,
        "height": numberProp,
        "mode": defineStringProp( /^(?:contain|cover)$/, `cover` ),
        "placeholder": defineStringProp( /^(?:maincolor|meancolor|none|preview)$/, `preview` ),
        "position": defineStringProp( undefined, `center` ),
        "ratio": defineStringProp( /^\d+\/\d+$/ ),
        // eslint-disable-next-line vue/require-prop-types
        "src": {
            ...stringProp,
            "required": true,
        },
        "step": numberProp,
        "transition": defineProp( Boolean, undefined, true ),
        "transitionDuration": stringProp,
        "transitionTimingFunction": stringProp,
        "transitionDelay": stringProp,
        "width": numberProp,
    },
    "computed": {
        "_alt": callWithThis( computeAlt ),
        "_dataBot": callWithThis( computeDataBot ),
        "_dataFocus": callWithThis( computeDataFocus ),
        "_dataSrc": callWithThis( computeDataSrc ),
        "_dataStep": callWithThis( computeDataStep ),
        "_height": callWithThis( computeHeight ),
        "_style": callWithThis( computeStyle ),
        "_width": callWithThis( computeWidth ),
        "_wrapperClass": callWithThis( computeWrapperClass ),
        "_wrapperStyle": callWithThis( computeWrapperStyle ),
    },
};

</script>

<template>
    <div
        :class="_wrapperClass"
        :style="_wrapperStyle"
    >
        <!-- eslint-disable-next-line vue/require-component-is -->
        <component
            :is="_is"
            :alt="_alt"
            :style="_style"
            :width="_width"
            :height="_height"
            v-bind="{
                ..._dataBot,
                ..._dataFocus,
                ..._dataSrc,
                ..._dataStep,
            }"
        />
    </div>
</template>

<style src="../_/style.css"></style>
