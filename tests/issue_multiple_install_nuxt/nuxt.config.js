export default {
    // global page headers: https://go.nuxtjs.dev/config-head
    "head": {
        "title": `watch-error`,
        "htmlAttrs": {
            "lang": `en`,
        },
        "meta": [
            {
                "charset": `utf-8`,
            },
            {
                "name": `viewport`,
                "content": `width=device-width, initial-scale=1`,
            },
            {
                "hid": `description`,
                "name": `description`,
                "content": ``,
            },
            {
                "name": `format-detection`,
                "content": `telephone=no`,
            },
        ],
        "link": [
            {
                "rel": `icon`,
                "type": `image/x-icon`,
                "href": `/favicon.ico`,
            },
        ],
    },

    // global CSS: https://go.nuxtjs.dev/config-css
    "css": [],

    // plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    "plugins": [],

    // auto import components: https://go.nuxtjs.dev/config-components
    "components": true,

    // modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    "buildModules": [],

    // modules: https://go.nuxtjs.dev/config-modules
    "modules": [ `@twicpics/components/nuxt2` ],
    "twicpics": {
        "domain": `https://demo.twic.it`,
        "anticipation": 0.5,
        "step": 50,
    },

    // build Configuration: https://go.nuxtjs.dev/config-build
    "build": {},
};
