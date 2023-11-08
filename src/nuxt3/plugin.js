import TwicPics from "@twicpics/components/vue3";
import { defineNuxtPlugin, useRuntimeConfig } from '#imports';

export default defineNuxtPlugin( nuxtApp => {
    const runtimeConfig = useRuntimeConfig();
    nuxtApp.vueApp.use( TwicPics, runtimeConfig.public.twicpics );
} );
