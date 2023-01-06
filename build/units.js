import { nodeResolve } from "@rollup/plugin-node-resolve";
import replacer from "./replacer.js";
import svelte from "rollup-plugin-svelte";
import sveltePreprocessor from "svelte-preprocess";
import vue2 from "rollup-plugin-vue2";
import vue3 from "rollup-plugin-vue";
import { packageVersion } from "./version.js";

const svelteUnitFactory = ( customElement = false ) => ( {
    "external": customElement ? [] : [ `svelte/internal` ],
    "framework": customElement ? `webcomponents` : `svelte3`,
    "plugins": [
        ...( customElement ? [ nodeResolve() ] : [] ),
        svelte( {
            "compilerOptions": {
                customElement,
                "hydratable": !customElement,
            },
            "extensions": [ `.svelte` ],
            "preprocess": sveltePreprocessor(),
        } ),
        ...( customElement ? [
            replacer( {
                "include": /\.svelte$/,
                "replacers": [
                    [ /preTransform/g, `pretransform` ],
                    [ /transitionDelay/g, `transitiondelay` ],
                    [ /transitionDuration/g, `transitionduration` ],
                    [ /transitionTimingFunction/g, `transitiontimingfunction` ],
                ],
            } ),
            replacer( {
                "include": /\.svelte$/,
                "replacer": [ /\.shadowRoot\b/g, `` ],
            } ),
            replacer( {
                "include": /\/node_modules\/svelte\/.*$/,
                "replacer": [ /\n\s*this\.attachShadow\([^\n]+\n/, `\n` ],
            } ),
        ] : [] ),
    ],
    "postDefinitions": customElement && (
        code =>
            code
                .split( `\n` )
                // eslint-disable-next-line no-magic-numbers
                .slice( 2 )
                .map( line => line.replace(
                    /ComponentType<SvelteComponentTyped<[^>]*>>;/g,
                    `CustomElementConstructor;`
                ) )
                .join( `\n` )
                .replace( /interface Attributes[^}]+\}/g, `` )
                .replace( /\s*,\s*Attributes\s*,\s*/, `,` )
    ),
    "sourceDir": `svelte3`,
} );

export default [
    {
        "external": [
            `prop-types`,
            `react`,
        ],
        "framework": `react`,
    },
    {
        "bundleCss": false,
        "external": [
            `react`,
            `react-dom`,
            `react-native`,
            `react-native-web`,
        ],
        "framework": `react-native`,
    },
    svelteUnitFactory(),
    {
        "framework": `vue2`,
        "plugins": [ vue2() ],
        "postDefinitions":
            code =>
                code
                    .replace( /\n\}\s+interface Options extends Options\$1 \{/, `` )
                    .replace( `Options$1`, `Options` ),
        "sourceDir": `vue`,
    },
    {
        "external": [ `vue` ],
        "framework": `vue3`,
        "plugins": [ vue3() ],
        "postDefinitions":
            code =>
                code
                    .replace( /PluginFunction(?:<[^>]+>)?/g, `Plugin` )
                    .split( `\n` )
                    .filter( line => /(declare const|export|import) /.test( line ) )
                    .join( `\n` ),
        "sourceDir": `vue`,
    },
    {
        "bundleCss": false,
        "external": [
            `react`,
            `react-dom`,
            `next`,
        ],
        "framework": `next`,
    },
    {
        "bundleCss": false,
        "external": [],
        "formats": [ `cjs` ],
        "framework": `nuxt2`,
        "javascript": true,
        "postBuild": {
            "copy": {
                "files": [
                    {
                        "sourceFileName": `plugin.js`,
                    },
                ],
            },
        },
    },
    {
        "bundleCss": false,
        "external": [],
        "framework": `nuxt3`,
        "javascript": true,
        "postBuild": {
            "copy": {
                "files": [
                    {
                        "sourceFileName": `plugin.js`,
                    },
                ],
            },
        },
    },
    {
        "bundleCss": false,
        "customPackageJsonExports": () => [ [ `./gatsby/package.json`, `./gatsby/package.json` ] ],
        "external": [],
        "formats": [ `es` ],
        "framework": `gatsby`,
        "javascript": true,
        "outputFileName": `plugin`,
        "postBuild": {
            "copy": {
                "files": [
                    {
                        "sourceFileName": `apis.js`,
                        "outputFileName": `gatsby-browser.js`,
                    },
                    {
                        "sourceFileName": `apis.js`,
                        "outputFileName": `gatsby-ssr.js`,
                    },
                    {
                        "sourceFileName": `package.template.json`,
                        "outputFileName": `package.json`,
                        "minify": false,
                        "replacer": code => JSON.stringify( JSON.parse( code.replace( /XXX/g, packageVersion ) ) ),
                    },
                ],
            },
        },
        "sourceFileName": `plugin`,
    },
    svelteUnitFactory( true ),
];
