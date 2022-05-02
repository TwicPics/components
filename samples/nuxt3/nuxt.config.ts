import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig( {
    "modules": [ `@twicpics/components/nuxt3` ],
    "twicpics": {
        "domain": `https://demo.twic.pics`,
        "anticipation": 0.5,
        "step": 50,
    },
} );
