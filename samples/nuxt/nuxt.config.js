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
    "plugins": [ `~twicpics.plugin.js` ],
    "components": true,
};
