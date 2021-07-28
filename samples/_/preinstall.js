/* globals __dirname, require, process */
const { readdir, readFile, writeFile } = require( `fs/promises` );

const rTXT = /\.txt$/;
const rMain = /###/;

const rDependency = /\/node_modules\/@twicpics\/components-sample$/;

// only install if a dependency itself
if ( !rDependency.test( __dirname ) ) {
    // eslint-disable-next-line no-console
    console.error( `cannot install if not a dependency` );
    process.exit( 1 );
}

( async () => {
    const htmlPromise = readFile( `${ __dirname }/Sample.html`, `utf8` );
    await Promise.all( ( await readdir( `${ __dirname }/templates` ) ).map( async file => {
        const source = `${ __dirname }/templates/${ file }`;
        const target = `${ __dirname }/${ file.replace( rTXT, `` ) }`;
        return writeFile(
            target,
            ( await readFile( source, `utf8` ) ).replace( rMain, await htmlPromise )
        );
    } ) );
} )();
