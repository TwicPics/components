
// eslint-disable-next-line no-undef
export default defineNuxtConfig( {
    "modules": [ `@twicpics/components/nuxt3` ],
    "telemetry": false,
    "twicpics": {
        "domain": `https://demo.twic.it`,
        "anticipation": 0.5,
        "step": 50,
        "env": `production`,
        "breakpoints": {
            "md": 666,
            "2xl": 4000,
        },
    },
} );
