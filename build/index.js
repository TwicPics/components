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
} from "./angular/builder.js";

import { getJsonFromPath, writeJson } from "./json.js";
import { formats, getFormatInfo } from "./formats.js";
import postBuild from "./postBuild.js";

/**
 * generates and returns exports field used in package.json
 * for the given @param framework and the given @param customFormats
 * if @param customFormats is undefined then considers defaults formats list (see formats.js, formats property)
 */
const getExportsByFramework = ( framework, customFormats ) => {
    const formatsToExport = customFormats || formats;
    const exportsByFramework = {};
    for ( const format of formatsToExport ) {
        const { extension, exports, fileName } = getFormatInfo( format );
        exportsByFramework[ exports ] = `./${ framework }/${ fileName }.${ extension }`;
    }
    return exportsByFramework;
};

const exportsPackageJson = () => units.flatMap(
    (
        { framework, "formats": customFormats, customPackageJsonExports = false }
    ) => {
        if ( customPackageJsonExports && ( typeof ( customPackageJsonExports ) === `function` ) ) {
            return customPackageJsonExports();
        }
        return customPackageJsonExports ?
            [] : [ [ `./${ framework }`, getExportsByFramework( framework, customFormats ) ] ];
    }
);

console.log( `clearing dist directory...` );
await remove( `${ __dirname }/../dist` );

console.log( `generating components for ${
    units.map( ( { framework } ) => framework ).join( `, ` )
} (${
    formats.join( `, ` )
})...` );
await Promise.all( units.map( async unit => {
    const { framework, javascript, "formats": customFormats } = unit;
    const { component, typeScript } = configFactory( unit, ...( customFormats || formats ) );
    try {
        await rollup( component );
        console.log( `${ framework } components generated` );
    } catch ( error ) {
        console.error( `${ framework } components generation error:`, error );
    }
    if ( !javascript ) {
        try {
            await rollup( typeScript );
            console.log( `${ framework } types descriptions generated` );
        } catch ( error ) {
            console.error( `${ framework } types descriptions generation error:`, error );
        }
    }
    postBuild( unit );
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
const packageJSON = await getJsonFromPath( `${ __dirname }/package.template.json` );
packageJSON.exports = Object.fromEntries( [
    [ `./style.css`, `./style.css` ],
    ...exportsPackageJson(),
    ...await exportsAngularPackageJson(),
] );
await writeJson( `${ __dirname }/../dist/package.json`, packageJSON );

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
