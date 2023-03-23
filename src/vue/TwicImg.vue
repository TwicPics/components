<script>
import { defineNumberProp } from "./props";
import { callFactory } from "./utils";
import TwicMedia from "./TwicMedia.vue";
import { computeMagnifierStyle } from "../_/compute";
import initMagnifier from "../_/magnifier";
import { rValidZoom } from "../_/validate";
import {
    parseZoom,
} from "../_/parse";
const emits = [ `stateChange` ];
const props = {};
const computed = {};
for (
    const [ propName, type, parseMethod ] of
    [ [ `zoom`, defineNumberProp( rValidZoom ), parseZoom ] ]
) {
    computed[ `p_${ propName }` ] = callFactory( parseMethod, [ propName ], true );
    props[ propName ] = type;
}

computed._magnifierStyle = callFactory( computeMagnifierStyle, [ `zoom` ] );

export default {
    "components": {
        TwicMedia,
    },
    props,
    emits,
    computed,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    mounted() {
        if ( this.p_zoom ) {
            initMagnifier( this.$refs.hostElement );
        }
    },
    "methods": {
        // eslint-disable-next-line no-shadow
        handleStateChange( event ) {
            const { state } = event;
            this.$emit( `stateChange`, {
                "target": this,
                state,
            } );
        },
    },
};
</script>
<template>
    <div
        ref="hostElement"
        class="twic-i"
        :class="{ 'twic-z': p_zoom }"
        :style="_magnifierStyle"
    >
        <TwicMedia
            media-tag="img"
            v-bind="{
                ...$attrs,
                class: ``,
            }"
            @stateChange="handleStateChange"
        />
        <TwicMedia
            v-if="p_zoom"
            media-tag="div"
            v-bind="{
                ...$attrs,
                class: `twic-m`,
                mode: `cover`,
            }"
        />
    </div>
</template>
