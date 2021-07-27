/* eslint-disable no-console */
import configFactory from "./configFactory.js";
import { dirname } from 'path';
import { readFile, unlink, writeFile } from "fs/promises";
import { rollup } from "rollup";
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
        "presets": [ `@babel/preset-react` ],
    },
    {
        "external": [
            `prop-types`,
            `react`,
        ],
        "framework": `sample-next`,
        "presets": [ `@babel/preset-react` ],
        "sourceFile": `samples/Sample.jsx`,
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
            const dir = dirname( options.output[ 0 ].file );
            await writeFile(
                `${ dir }/style.css`,
                await readFile( `${ dir }/${ formats[ 0 ] }.min.css`, `utf8` )
            );
            await Promise.all( formats.flatMap( format => [
                unlink( `${ dir }/${ format }.css` ),
                unlink( `${ dir }/${ format }.min.css` ),
            ] ) );
            console.log( `${ framework } components generated` );
        } catch ( error ) {
            console.error( `${ framework } components generation error:`, error );
        }
    } ) );
} )();
