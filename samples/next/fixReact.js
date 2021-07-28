"use strict";

const reactPackage = require( `react/package.json` );
const { writeFile } = require( `fs/promises` );

if ( !reactPackage.exports ) {
    reactPackage.exports = {
        ".": `./index.js`,
        "./jsx-dev-runtime": `./jsx-dev-runtime.js`,
        "./jsx-runtime": `./jsx-runtime.js`,
        "./*": `./*`,
    };
    writeFile( require.resolve( `react/package.json` ), JSON.stringify( reactPackage, null, `  ` ) );
}
