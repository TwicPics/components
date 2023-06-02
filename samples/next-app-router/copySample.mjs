/**
 * copy Sample.html from @twicpics/components-sample
 * to src directory
 * @type {module:fs}
 */
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { copyFile } from "fs";

// current filename
const __filename = fileURLToPath( import.meta.url );

// current dirname
const __dirname = dirname( __filename );

// we want to copy the sample file (here Sample.next-app) from @twicpics/components-sample package
// into app.component.html file
const sampleSource = resolve( ``, `node_modules`, `@twicpics/components-sample`, `Sample.next-app` );
const sampleDest = resolve( __dirname, `src`, `app`, `sample.jsx` );

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
