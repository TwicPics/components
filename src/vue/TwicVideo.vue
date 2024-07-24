<script>
import TwicMedia from "./TwicMedia.vue";
import { booleanProp, defineStringProp, floatProp } from "./props";
import { callFactory } from "./utils";
import {
    parseDraggable,
    parseDuration,
    parseFrom,
    parseId,
    parseTo,
} from "../_/parse";
import {
    preComputeVideoOptions,
} from "../_/preCompute";
import { computeHostAttributes } from "../_/compute";
import { rValidId } from "../_/validate";
const emits = [ `stateChange` ];
const props = {};
const computed = {};
for (
    const [ propName, type, parseMethod ] of
    [
        [ `draggable`, booleanProp( null, undefined ), parseDraggable ],
        [ `duration`, floatProp, parseDuration ],
        [ `from`, floatProp, parseFrom ],
        [ `id`, defineStringProp( rValidId ), parseId ],
        [ `posterFrom`, floatProp, parseFrom ],
        [ `to`, floatProp, parseTo ],
    ]
) {
    computed[ `p_${ propName }` ] = callFactory( parseMethod, [ `*${ propName }*` ] );
    props[ propName ] = type;
}
for ( const [ propName, func, args ] of [
    [ `_hostAttributes`, computeHostAttributes, [ `draggable`, `id` ] ],
    [ `_videoOptions`, preComputeVideoOptions, [ `duration`, `from`, `posterFrom`, `to` ] ],
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
        v-bind="{ ..._hostAttributes }"
    >
        <TwicMedia
            media-tag="video"
            v-bind="{
                ...$attrs,
                class: ``,
            }"
            :refit="false"
            :video-options="_videoOptions"
            @stateChange="handleStateChange"
        />
    </div>
</template>

