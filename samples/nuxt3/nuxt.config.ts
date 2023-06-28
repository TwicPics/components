
// eslint-disable-next-line no-undef
export default defineNuxtConfig( {
    "modules": [ `@twicpics/components/nuxt3` ],
    "twicpics": {
        "domain": `https://demo.twic.it`,
        "anticipation": 0.5,
        "step": 50,
        "env": `production`,
    },
} );
