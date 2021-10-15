<script lang="ts">
import { callWithThis, defineProp, defineStringProp, numberProp, requiredStringProp, stringProp } from "./utils";
import {
    computeAlt,
    computeData,
    computeStyle,
    computeWrapperData,
    computeWrapperStyle,
} from "../_/compute";

export default {
    "props": {
        "alt": stringProp,
        "bot": stringProp,
        "focus": stringProp,
        "height": numberProp,
        "mode": defineStringProp( /^(?:contain|cover)$/ ),
        "placeholder": defineStringProp( /^(?:maincolor|meancolor|none|preview)$/, `preview` ),
        "position": stringProp,
        "ratio": defineStringProp( /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/ ),
        "src": requiredStringProp,
        "step": numberProp,
        "transition": defineProp( Boolean ),
        "transitionDuration": stringProp,
        "transitionTimingFunction": stringProp,
        "transitionDelay": stringProp,
        "width": numberProp,
    },
    "computed": {
        "_alt": callWithThis( computeAlt ),
        "_dataAttributes": callWithThis( computeData ),
        "_style": callWithThis( computeStyle ),
        "_wrapperData": callWithThis( computeWrapperData ),
        "_wrapperStyle": callWithThis( computeWrapperStyle ),
    },
};
</script>
<template>
    <div
        class="twic-w"
        :style="_wrapperStyle"
        v-bind="{ ..._wrapperData }"
    >
        <component
            :is="_is"
            :alt="_alt"
            :style="_style"
            :width="_width"
            :height="_height"
            v-bind="{ ..._dataAttributes }"
        />
    </div>
</template>
<style src="../_/style.css"></style>
