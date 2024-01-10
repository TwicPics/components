export default {
    "head": {
        "title": `TwicPics Components`,
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
        ],
    },
    "server": {
        "port": 3000,
    },
    "modules": [ `@twicpics/components/nuxt2` ],
    "build": {
        "transpile": [ `@twicpics/components-sample` ],
    },
    "twicpics": {
        "domain": `https://demo.twic.it`,
        "anticipation": 0.5,
        "step": 50,
        "env": `production`
    },
    "components": true,
};
