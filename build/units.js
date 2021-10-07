import { nodeResolve } from '@rollup/plugin-node-resolve';
import replacer from "./replacer.js";
import svelte from "rollup-plugin-svelte";
import sveltePreprocessor from "svelte-preprocess";
import vue2 from "rollup-plugin-vue2";
import vue3 from "rollup-plugin-vue";

const svelteUnitFactory = ( customElement = false ) => ( {
    "external": customElement ? [] : [ `svelte/internal` ],
    "framework": customElement ? `webcomponents` : `svelte3`,
    "plugins": [
        ...( customElement ? [ nodeResolve() ] : [] ),
        svelte( {
            "compilerOptions": {
                customElement,
            },
            "extensions": [ `.svelte` ],
            "preprocess": sveltePreprocessor(),
        } ),
        replacer( {
            "include": /(?:^|[/.])factory\.svelte$/,
            "replacers": [
                [ /\nexport default .+/, `` ],
                [ /"img"/g, `MEDIA_TAG` ],
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
    svelteUnitFactory( true ),
];
