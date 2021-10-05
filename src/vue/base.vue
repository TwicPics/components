<script lang="ts">
import { callWithThis, defineProp, defineStringProp, numberProp, requiredStringProp, stringProp } from "./utils";
import {
    computeAlt,
    computeDataBot,
    computeDataFocus,
    computeDataSrc,
    computeDataStep,
    computeHeight,
    computeNoScriptSrc,
    computeStyle,
    computeWidth,
    computeWrapperClass,
    computeWrapperStyle,
} from "../_/compute";
import { isBrowser } from "../_/utils";

export default {
    "props": {
        "alt": stringProp,
        "bot": stringProp,
        "focus": stringProp,
        "height": numberProp,
        "mode": defineStringProp( /^(?:contain|cover)$/, `cover` ),
        "placeholder": defineStringProp( /^(?:maincolor|meancolor|none|preview)$/, `preview` ),
        "position": defineStringProp( undefined, `center` ),
        "ratio": defineStringProp( /^\d+\/\d+$/ ),
        "src": requiredStringProp,
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
        "_noScriptSrc": isBrowser ? ( () => undefined ) : callWithThis( computeNoScriptSrc ),
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
        <component
            :is="`noscript`"
            v-if="_noScriptSrc"
        >
            <component
                :is="_is"
                :alt="_alt"
                :src="_noScriptSrc"
                :style="_style"
                :width="_width"
                :height="_height"
                loading="lazy"
            />
        </component>
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
