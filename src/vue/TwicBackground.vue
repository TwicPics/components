<script>
import { parseRole } from "../_/parse";
import TwicMedia from "./TwicMedia.vue";
import { defineStringProp } from "./props";
import { callFactory } from "./utils";
const emits = [ `stateChange` ];
const computed = {};
const props = {
    "mediaTag": defineStringProp( undefined, `div` ),
};

for (
    const [ propName, type, parseMethod ] of
    [ [ `role`, defineStringProp( undefined, `img` ), parseRole ] ]
) {
    computed[ `p_${ propName }` ] = callFactory( parseMethod, [ `*${ propName }*` ] );
    props[ propName ] = type;
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
        :role="p_role"
    >
        <TwicMedia
            :media-tag="mediaTag"
            v-bind="{
                ...$attrs,
                className: ``,
            }"
            @stateChange="handleStateChange"
        />
    </div>
</template>

