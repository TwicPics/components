/**
 * copy Sample.html from @twicpics/components-sample
 * to src directory
 * @type {module:fs}
 */
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { copyFile, mkdirSync, existsSync } from "fs";

// current filename
const __filename = fileURLToPath( import.meta.url );

// current dirname
const __dirname = dirname( __filename );

// copy Sample.svelte from @twicpics/components-sample
const sampleSource = resolve( ``, `node_modules`, `@twicpics/components-sample`, `Sample.svelte3` );
const sampleDest = resolve( __dirname, `src`, `components`, `Sample.svelte` );
const sampleDirectory = resolve( __dirname, `src`, `components` );

// makes sure that dest directory exists
if ( !existsSync( sampleDirectory ) ) {
    mkdirSync( sampleDirectory );
}
// do the copy
copyFile( sampleSource, sampleDest, err => {
    if ( err ) {
        // eslint-disable-next-line no-console
        console.error( `error while copying sample from ${ sampleSource } to ${ sampleDest }`, err );
        return -1;
    }
    // eslint-disable-next-line no-console
    console.log( `${ sampleSource } copied to ${ sampleDest }` );

    return 0;
} );
