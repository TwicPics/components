/* eslint-disable no-console */
import __dirname from "./__dirname.js";
import cleanSamples from "./cleanSamples.js";
import configFactory from "./configFactory.js";
import { readFile, writeFile } from "fs/promises";
import { remove } from "fs-extra";
import replacer from "./replacer.js";
import { rollup } from "rollup";
import svelte from "rollup-plugin-svelte";
import sveltePreprocessor from "svelte-preprocess";
import vue2 from "rollup-plugin-vue2";
import vue3 from "rollup-plugin-vue";

const formats = [ `cjs`, `esm` ];
const units = [
    {
        "external": [
            `prop-types`,
            `react`,
        ],
        "framework": `react`,
    },
    {
        "external": [ `svelte/internal` ],
        "framework": `svelte3`,
        "plugins": [
            svelte( {
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
    },
    {
        "framework": `vue2`,
        "plugins": [ vue2() ],
        "sourceDir": `vue`,
    },
    {
        "external": [ `vue` ],
        "framework": `vue3`,
        "plugins": [ vue3() ],
        "sourceDir": `vue`,
    },
];

( async () => {
    console.log( `clearing dist directory...` );
    await remove( `${ __dirname }/../dist` );
    console.log( `generating components for ${
        units.map( ( { framework } ) => framework ).join( `, ` )
    } (${
        formats.join( `, ` )
    })...` );
    await Promise.all( units.map( async unit => {
        const { framework } = unit;
        try {
            const options = configFactory( unit, ...formats );
            const bundle = await rollup( options );
            await Promise.all( options.output.map( bundle.generate ) );
            await Promise.all( options.output.map( bundle.write ) );
            await bundle.close();
            console.log( `${ framework } components generated` );
        } catch ( error ) {
            console.error( `${ framework } components generation error:`, error );
        }
    } ) );
    console.log( `generating package.json with mappings...` );
    const packageJSON = JSON.parse( await readFile( `${ __dirname }/package.template.json`, `utf8` ) );
    packageJSON.exports = Object.fromEntries( units.flatMap( ( { framework } ) => [
        [ `./${ framework }`, `./${ framework }/module.js` ],
        [ `./${ framework }/style.css`, `./${ framework }/style.css` ],
    ] ) );
    await writeFile( `${ __dirname }/../dist/package.json`, JSON.stringify( packageJSON, null, `  ` ) );
    console.log( `adding README.md...` );
    await writeFile(
        `${ __dirname }/../dist/README.md`,
        await readFile( `${ __dirname }/../documentation/README.md` )
    );
    console.log( `adding LICENSE...` );
    await writeFile(
        `${ __dirname }/../dist/LICENSE`,
        await readFile( `${ __dirname }/../LICENSE` )
    );
    console.log( `cleaning dependencies in samples subdirectory...` );
    await cleanSamples();
} )();
