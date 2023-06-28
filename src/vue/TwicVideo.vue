<script>
import TwicMedia from "./TwicMedia.vue";
import { floatProp } from "./props";
import { callFactory } from "./utils";
import {
    parseDuration,
    parseFrom,
    parseTo,
} from "../_/parse";
import {
    preComputeVideoOptions,
} from "../_/preCompute";
const emits = [ `stateChange` ];
const props = {};
const computed = {};
for (
    const [ propName, type, parseMethod ] of
    [
        [ `duration`, floatProp, parseDuration ],
        [ `from`, floatProp, parseFrom ],
        [ `posterFrom`, floatProp, parseFrom ],
        [ `to`, floatProp, parseTo ],
    ]
) {
    computed[ `p_${ propName }` ] = callFactory( parseMethod, [ `*${ propName }*` ] );
    props[ propName ] = type;
}
for ( const [ propName, func, args ] of
    [ [ `_videoOptions`, preComputeVideoOptions, [ `duration`, `from`, `posterFrom`, `to` ] ] ] ) {
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
    <div class="twic-i">
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

