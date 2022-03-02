import __dirname from "./__dirname.js";
import { readFile } from "fs/promises";
import { outputFile } from "fs-extra";
import uglify from "uglify-js";

const getFolders = ( framework, sourceDir ) => ( {
    "twicDist": `${ __dirname }/../dist/${ framework }`,
    "srcDist": `${ __dirname }/../src/${ sourceDir }`,
} );

/**
 * post build copy
 * @param {*} options post build copy options defined in units.js
 * @param {*} framework given framework
 * @param {*} sourceDir given sourcedir (framework by default)
 */
const copy = async ( options, framework, sourceDir = framework ) => {
    const { files } = options;
    const { twicDist, srcDist } = getFolders( framework, sourceDir );
    const filesToWrite = [];

    for await ( const file of files ) {

        const { sourceFileName = file,
            outputFileName = sourceFileName,
            minify = true,
            replacer } = file;

        let srcCode = await readFile( `${ srcDist }/${ sourceFileName }`, `utf8` );

        if ( replacer && ( typeof ( replacer ) !== `function` ) ) {
            // eslint-disable-next-line no-console
            console.warn( `replacer defined in movePostBuild 
            for ${ sourceFileName } in ${ framework } framwork is not a function` );
        }

        if ( replacer && ( typeof ( replacer ) === `function` ) ) {
            srcCode = replacer( srcCode );
        }

        const { code } = minify ? uglify.minify(
            srcCode,
            {
                "compress": {
                    "templates": false,
                },
            }
        ) : {
            "code": srcCode,
        };

        filesToWrite.push(
            {
                "path": `${ twicDist }/${ outputFileName }`,
                "content": code,
            }
        );
    }
    await Promise.all( filesToWrite.map( f => outputFile( f.path, f.content ) ) );
};

/**
 * postBuild stuff dispatching
 * @param unit : see units.js
 */
export default async unit => {
    const { framework, sourceDir, "postBuild": postBuildOptions } = unit;
    const { "copy": copyOptions } = postBuildOptions || {};
    if ( copyOptions ) {
        await copy( copyOptions, framework, sourceDir );
    }
};

