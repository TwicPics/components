import __dirname from "./__dirname.js";
import { readFile, writeFile } from "fs/promises";
import angularInstaller from "./angular/installer.js";
import sveltekitInstaller from "./sveltekit/installer.js";

[
    [
        `${ __dirname }/../node_modules/svelte-preprocess/dist/transformers/typescript.js`,
        content => (
            /,outDir: undefined,/.test( content ) ?
                content :
                content.replace( /(\ballowNonTsExtensions: true,)/, `$1outDir: undefined,` )
        ),
    ],
].map( async ( [ filename, patcher ] ) => {
    await writeFile( filename, patcher( await readFile( filename, `utf8` ) ) );
} );

// installing dependencies of angulars (build/angular/_templates)
// and sveltekit (build/sveltekit/template) library build projects
await angularInstaller();
sveltekitInstaller();
