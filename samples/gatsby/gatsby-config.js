/**
 * gatsby-plugin-compile-es6-packages is used here
 * to allow the import of "@twicpics/components-sample/Sample.jsx"; into index.jsx
 */
// eslint-disable-next-line no-undef
module.exports = {
    "siteMetadata": {
        "title": `gatsby`,
        "siteUrl": `https://www.yourdomain.tld`,
    },
    "plugins": [
        {
            "resolve": `gatsby-plugin-compile-es6-packages`,
            "options": {
                "modules": [ `@twicpics/components-sample` ],
                "test": /\.jsx$/,
            },
        },
        {
            "resolve": `@twicpics/components/gatsby`,
            "options": {
                "twicpics": {
                    "domain": `https://demo.twic.pics`,
                    "anticipation": 0.5,
                    "step": 100,
                },
            },
        },
    ],
};
