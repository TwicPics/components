import { exec, spawn } from "child_process";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { getFrameworks } from "./units.js";
import { checkPort, killports } from "./utils.js";

const FRAMEWORK_FILTERS = process.argv.slice(2).join(',');

// stop servers if needed
await killports();

const __dirname = dirname( fileURLToPath( import.meta.url ) );

await Promise.all( getFrameworks( FRAMEWORK_FILTERS ).map( async unit => { 
    const { framework, port } = unit;
    console.log( `Starting ${ framework } on port ${ port }.` );
    await new Promise( ( resolve ) => {
        exec( `cd ${ __dirname }/${ framework } && $npm_execpath install`, () => {
            const server = spawn( `$npm_execpath`, [ 'serve', '--port', port ], {
                cwd: `${ __dirname }/${ framework }`,
                shell: true,
                detached: true,
                stdio: 'ignore'
            } );
            checkPort( port, true ).then( () => {
                console.log( `${ framework } started on http://localhost:${ port }.` );
                server.unref();
                resolve();
            } );
        } );
    } );
} ) );

console.log( `All servers running.` );

// starts tests
const vitestProcess = spawn(
    'npx',
    [ 'vitest', 'run', 'tests/ui' ],
    {
        stdio: 'inherit',
        env: {
            ...process.env,
            FRAMEWORK_FILTERS,
        },
    } 
);

vitestProcess.on('close', async () => {
    await killports();
} );
