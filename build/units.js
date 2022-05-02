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
        replacer( {
            "include": /(?:^|[/.])factory\.svelte$/,
            "replacers": [
                [ /\nexport default .+/, `` ],
                [ /"img"/g, `MEDIA_TAG` ],
                [ /"span"/g, `"style"` ],
                [ /(?=\nfunction create_fragment\()/, `\nexport default MEDIA_TAG => {` ],
                [ /(?=\nclass \S+ )/, `\nreturn (` ],
                [ /$/, `);}` ],
            ],
        } ),
    ],
    "postDefinitions": customElement && (
        code =>
            code
                .split( `\n` )
                // eslint-disable-next-line no-magic-numbers
                .slice( 2 )
                .filter( line => {
                    const tmp = /^declare type (\S+)/.exec( line );
                    return !tmp || /^Optional/.test( tmp[ 1 ] );
                } )
                .map( line => line.replace(
                    ` svelte.SvelteComponentTyped<Attributes, undefined, undefined>;`,
                    ` CustomElementConstructor;`
                ) )
                .join( `\n` )
                .replace( /\ninterface Attributes \{[^}]+\}/, `` )
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
        "external": [],
        "framework": `nuxt2`,
        "javascript": true,
        "formats": [ `cjs` ],
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
        "external": [],
        "framework": `gatsby`,
        "sourceFileName": `plugin`,
        "outputFileName": `plugin`,
        "javascript": true,
        "formats": [ `es` ],
        "customPackageJsonExports": () => [ [ `./gatsby/package.json`, `./gatsby/package.json` ] ],
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
    },
    svelteUnitFactory( true ),
];
