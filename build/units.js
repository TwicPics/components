import { nodeResolve } from "@rollup/plugin-node-resolve";
import replacer from "./replacer.js";
import banner2 from "rollup-plugin-banner2";
import svelte from "rollup-plugin-svelte";
import sveltePreprocessor from "svelte-preprocess";
import vue2 from "rollup-plugin-vue2";
import vue3 from "rollup-plugin-vue";
import { packageVersion } from "./version.js";

const svelteUnitFactory = ( { framework = `svelte3`, customElement = false } ) => ( {
    "external": customElement ?
        [] :
        [
          `svelte`,
          `svelte/internal`,
        ],
    "formats": [ `cjs`, `es`, `types` ],
    "framework": customElement ? `webcomponents` : framework,
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
                    [ /mediaTag/g, `mediatag` ],
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
        ] : [
            replacer( {
                "include": /\.svelte$/,
                "replacer": [ /<svelte:options tag=.*\/>/gm, `` ],
            } ),
        ] ),
    ],
    "postDefinitions": customElement ?
        (
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
        ) : ( framework === `svelte4` ) && (
            code =>
                code.replace( /SvelteComponentTyped/g, `SvelteComponent` )
        ),
    "sourceDir": `svelte3`,
} );

export default [
    {
        "external": [ `react` ],
        "formats": [ `cjs`, `es`, `types` ],
        "framework": `react`,
        "postTerser": [ banner2( () => `'use client';` ) ],
    },
    {
        "bundleCss": false,
        "external": [
            `react`,
            `react-dom`,
            `react-native`,
            `react-native-web`,
        ],
        "formats": [ `cjs`, `es`, `types` ],
        "framework": `react-native`,
    },
    svelteUnitFactory( {
        "framework": `svelte3`,
    } ),
    svelteUnitFactory( {
        "framework": `svelte4`,
    } ),
    {
        "formats": [ `cjs`, `es`, `types` ],
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
        "formats": [ `cjs`, `es`, `types` ],
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
        "formats": [ `cjs`, `es`, `types` ],
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
    svelteUnitFactory( {
        "customElement": true,
    } ),
];
