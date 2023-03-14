<script>
import { defineNumberProp } from "./props";
import { callFactory } from "./utils";
import TwicMedia from "./TwicMedia.vue";
import { computeMagnifierStyle } from "../_/compute";
import { Magnifier } from "../_/Magnifier";
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

computed._magnifiedStyle = callFactory( computeMagnifierStyle, [ `zoom` ] );

export default {
    "components": {
        TwicMedia,
    },
    props,
    emits,
    computed,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    mounted() {
        if ( this.$refs.magnifiedContainer ) {
            this.magnifier = new Magnifier( this.$refs.magnifiedContainer );
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
        class="twic-i"
        :class="{ 'twic-z': p_zoom }"
    >
        <TwicMedia
            media-tag="img"
            v-bind="$attrs"
            @stateChange="handleStateChange"
        />
        <div
            v-if="p_zoom"
            ref="magnifiedContainer"
            class="twic-m"
            :style="_magnifiedStyle"
        >
            <TwicMedia
                media-tag="div"
                v-bind="$attrs"
            />
        </div>
    </div>
</template>
