<script>
import TwicMedia from "./TwicMedia.vue";
import { defineStringProp } from "./props";
const emits = [ `stateChange` ];
const props = {
    "mediaTag": defineStringProp( undefined, `div` ),
};

export default {
    "components": {
        TwicMedia,
    },
    props,
    emits,
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
            :media-tag="mediaTag"
            v-bind="{
                ...$attrs,
                ...{
                    class: ``,
                }
            }"
            @stateChange="handleStateChange"
        />
    </div>
</template>

