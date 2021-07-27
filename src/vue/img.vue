<script>
import { computed, props } from "./media.js";

export default {
    "name": `TwicImg`,
    props,
    computed,
};
</script>

<template>
    <div
        :class="_wrapperClass"
        :style="_wrapperStyle"
    >
        <img
            :alt="_alt"
            :src="_src"
            :style="_style"
            :width="_width"
            :height="_height"
            v-bind="_dataAttributes"
        >
    </div>
</template>

<style src="../_/style.css"></style>
