<script>
import TwicMedia from "./TwicMedia.vue";
const emits = [ `stateChange` ];
export default {
    "components": {
        TwicMedia,
    },
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
            media-tag="video"
            v-bind="{
                ...$attrs,
                class: ``,
            }"
            @stateChange="handleStateChange"
        />
    </div>
</template>

