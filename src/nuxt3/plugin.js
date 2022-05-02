import TwicPics from "@twicpics/components/vue3";
import { defineNuxtPlugin, useRuntimeConfig } from '#app';

export default defineNuxtPlugin( nuxtApp => {
    const runtimeConfig = useRuntimeConfig();
    nuxtApp.vueApp.use( TwicPics, runtimeConfig.twicpics );
} );
