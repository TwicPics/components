<script>
import { booleanProp, defineNumberProp, defineStringProp, intProp } from "./props";
import { callFactory } from "./utils";
import TwicMedia from "./TwicMedia.vue";
import { computeHostAttributes, computeHostStyle } from "../_/compute";
import initMagnifier from "../_/magnifier";
import { parseDraggable, parseId, parseTabIndex, parseZoom } from "../_/parse";
import { rValidId, rValidZoom } from "../_/validate";
const emits = [ `stateChange` ];
const props = {};
const computed = {};
for (
    const [ propName, type, parseMethod ] of [
        [ `draggable`, booleanProp( null, undefined ), parseDraggable ],
        [ `id`, defineStringProp( rValidId ), parseId ],
        [ `tabIndex`, intProp, parseTabIndex ],
        [ `zoom`, defineNumberProp( rValidZoom ), parseZoom ],
    ]
) {
    computed[ `p_${ propName }` ] = callFactory( parseMethod, [ `*${ propName }*` ] );
    props[ propName ] = type;
}

for ( const [ propName, func, args ] of [
    [ `_hostAttributes`, computeHostAttributes, [ [ `draggable`, `id`, `tabIndex` ] ] ],
    [ `_hostStyle`, computeHostStyle, [ [ `zoom` ] ] ],
] ) {
    computed[ propName ] = callFactory( func, args );
}

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
        :style="_hostStyle"
        v-bind="{ ..._hostAttributes }"
    >
        <TwicMedia
            v-if="p_zoom"
            media-tag="div"
            v-bind="{
                ...$attrs,
                class: `twic-m`,
                mode: `cover`,
            }"
        />
        <TwicMedia
            media-tag="img"
            v-bind="{
                ...$attrs,
                class: ``,
            }"
            @stateChange="handleStateChange"
        />
    </div>
</template>
