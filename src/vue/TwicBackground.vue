<script>
import { computeHostAttributes } from "../_/compute";
import { parseDraggable, parseId } from "../_/parse";
import { rValidId } from "../_/validate";
import TwicMedia from "./TwicMedia.vue";
import { booleanProp, defineStringProp } from "./props";
import { callFactory } from "./utils";
const emits = [ `stateChange` ];
const props = {
    "mediaTag": defineStringProp( undefined, `div` ),
};
const computed = {};
for (
    const [ propName, type, parseMethod ] of [
        [ `draggable`, booleanProp( null, undefined ), parseDraggable ],
        [ `id`, defineStringProp( rValidId ), parseId ],
    ]
) {
    computed[ `p_${ propName }` ] = callFactory( parseMethod, [ `*${ propName }*` ] );
    props[ propName ] = type;
}

for ( const [ propName, func, args ] of [ [ `_hostAttributes`, computeHostAttributes, [ `draggable`, `id` ] ] ]
) {
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
            :media-tag="mediaTag"
            v-bind="{
                ...$attrs,
                class: ``,
            }"
            @stateChange="handleStateChange"
        />
    </div>
</template>

