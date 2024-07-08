import config from '../_/config';
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
    "build": {},
    "twicpics": config,
    css: [
      '@/styles.css'
    ],
    "components": true,
};
