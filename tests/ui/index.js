import { exec, spawn } from "child_process";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { getFrameworks } from "./units.js";
import { checkPort, killports } from "./utils.js";

const ARGS = process.argv.slice(2);
const DEBUG = ARGS.some( arg => arg === `debug` );

const rTest = /(.*)\.spec/;
// look for an optionnal unique test to run
const TEST_TO_RUN = ARGS.map( arg => {
    const match = rTest.exec( arg );
    return match ? match[ 1 ] : null;
} ).filter( p => p )[0];

// generated frameworks list removing debug and a potential unique test to be run
const FRAMEWORK_FILTERS = ARGS.
    filter( arg => arg !== `debug` ).
    filter( arg => !rTest.test( arg ) ).
    join(',');
// stop servers if needed
await killports();

const __dirname = dirname( fileURLToPath( import.meta.url ) );

await Promise.all( getFrameworks( FRAMEWORK_FILTERS ).map( async ( unit ) => {
    const { framework, port } = unit;
    console.log( `Starting ${ framework} on port ${ port }.` );

    await new Promise( ( resolve, reject ) => {
        exec( `cd ${ __dirname }/${ framework } && $npm_execpath install`, ( err, stderr ) => {
            if ( err ) {
                console.error( `Error installing dependencies for ${ framework }:`, stderr );
                return reject( err );
            }

            const server = spawn(
                `$npm_execpath`,
                ['serve', '--port', port],
                {
                    cwd: `${ __dirname }/${ framework }`,
                    shell: true,
                    detached: true,
                    stdio: 'ignore'
                }
            );

            server.on('error', error => {
                console.error( `Failed to start ${ framework }:`, error );
                reject( error );
            });

            checkPort( port, true ).then(() => {
                console.log( `${ framework } started on http://localhost:${ port }.` );
                server.unref();
                resolve();
            }).catch( reject );
        } );
    } );
} ) );


console.log( `All servers running.` );

// starts tests
const vitestProcess = spawn(
    'npx',
    [
        'vitest',
        'run',
        `tests/ui${ TEST_TO_RUN ? `/_specs/${ TEST_TO_RUN }.spec.js` : `` }`
    ],
    {
        stdio: 'inherit',
        env: {
            ...process.env,
            FRAMEWORK_FILTERS,
            DEBUG,
        },
    } 
);

vitestProcess.on('close', async () => {
    if ( !DEBUG ) {
      await killports();
    }
} );