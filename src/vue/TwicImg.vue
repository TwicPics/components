<script>
import { defineNumberProp, defineStringProp } from "./props";
import { callFactory } from "./utils";
import TwicMedia from "./TwicMedia.vue";
import { computeMagnifierStyle } from "../_/compute";
import initMagnifier from "../_/magnifier";
import { parseRole, parseZoom } from "../_/parse";
import { rValidZoom } from "../_/validate";
const emits = [ `stateChange` ];
const props = {};
const computed = {};
for (
    const [ propName, type, parseMethod ] of [
        [ `zoom`, defineNumberProp( rValidZoom ), parseZoom ],
        [ `role`, defineStringProp( undefined, `img` ), parseRole ],
    ]
) {
    computed[ `p_${ propName }` ] = callFactory( parseMethod, [ `*${ propName }*` ] );
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
        :role="p_role"
        :style="_magnifierStyle"
    >
        <TwicMedia
            v-if="p_zoom"
            media-tag="div"
            v-bind="{
                ...$attrs,
                className: `twic-m`,
                mode: `cover`,
            }"
        />
        <TwicMedia
            media-tag="img"
            v-bind="{
                ...$attrs,
                className: ``,
            }"
            @stateChange="handleStateChange"
        />
    </div>
</template>
