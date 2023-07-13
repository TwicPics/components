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

const rTransform = /^\/\/\s*\/((?:\\.|[^/])+)\/([a-z]+)?\s*=>\s*("(?:\\.|[^"])+")\s*$/mg;
( async () => {
    const htmlPromise = readFile( `${ __dirname }/_Sample.html`, `utf8` );
    await Promise.all( ( await readdir( `${ __dirname }/templates` ) ).map( async file => {
        const replacers = [];
        let content =
            ( await readFile( `${ __dirname }/templates/${ file }`, `utf8` ) )
                .replace( rMain, await htmlPromise )
                .replace( rTransform, ( _, regExpExpression, regExpFlags, string ) => {
                    replacers.push( {
                        "regExp": new RegExp( regExpExpression, regExpFlags ),
                        "transform": JSON.parse( string ),
                    } );
                    return ``;
                } );
        if ( replacers.length ) {
            for ( const { regExp, transform } of replacers ) {
                content = content.replace( regExp, transform );
            }
        }
        return writeFile( `${ __dirname }/${ file.replace( rTXT, `` ) }`, content );
    } ) );
} )();
