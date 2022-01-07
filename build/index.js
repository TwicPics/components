/* eslint-disable no-console */
import __dirname from "./__dirname.js";
import clean from "./clean.js";
import configFactory from "./configFactory.js";
import { copy, remove } from "fs-extra";
import { readFile, writeFile } from "fs/promises";
import rollup from "./rollup.js";
import units from "./units.js";
import {
    buildComponents as buildAngularComponents,
    exportsPackageJson as exportsAngularPackageJson,
} from "./angular/angularBuilder.js";

const formats = [ `cjs`, `es` ];

console.log( `clearing dist directory...` );
await remove( `${ __dirname }/../dist` );

console.log( `generating components for ${
    units.map( ( { framework } ) => framework ).join( `, ` )
} (${
    formats.join( `, ` )
})...` );
await Promise.all( units.map( async unit => {
    const { framework } = unit;
    const { component, typeScript } = configFactory( unit, ...formats );
    try {
        await rollup( component );
        console.log( `${ framework } components generated` );
    } catch ( error ) {
        console.error( `${ framework } components generation error:`, error );
    }
    try {
        await rollup( typeScript );
        console.log( `${ framework } types descriptions generated` );
    } catch ( error ) {
        console.error( `${ framework } types descriptions generation error:`, error );
    }
} ) );

console.log( `de-duplicating css..` );
await copy( `${ __dirname }/../dist/${ units[ 0 ].framework }/style.css`, `${ __dirname }/../dist/style.css` );
await Promise.all( units.map(
    ( { framework } ) => remove( `${ __dirname }/../dist/${ framework }/style.css` ).catch( () => undefined )
) );

try {
    await buildAngularComponents();
    console.log( `angular components generated` );
} catch ( error ) {
    console.error( `angular components generation error:`, error );
}

console.log( `generating package.json with mappings...` );
const packageJSON = JSON.parse( await readFile( `${ __dirname }/package.template.json`, `utf8` ) );
packageJSON.exports = Object.fromEntries( [
    [ `./style.css`, `./style.css` ],
    ...units.map( ( { framework } ) => [
        `./${ framework }`,
        {
            "import": `./${ framework }/module.js`,
            "require": `./${ framework }/index.js`,
        },
    ] ),
    ...await exportsAngularPackageJson(),
] );
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

await clean();
