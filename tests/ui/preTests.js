import { exec, spawn } from "child_process";
import http from "http";
import { dirname } from "path";
import { fileURLToPath } from "url";
import units from "./units.js";
import { killports } from "./utils.js";
import { exit } from "process";

const __dirname = dirname( fileURLToPath( import.meta.url ) );

const waitForServer = async ( port ) => {
    return new Promise( resolve => {
        const interval = setInterval( () => {
            http.get( `http://localhost:${ port }`, res => {
                if ( res.statusCode === 200 ) {
                  clearInterval( interval );
                  resolve()
                }
            } ).on( 'error', () => { } );
        }, 1000 ) }
    );
}

await killports();

await Promise.all( units.map( async unit => { 
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
            waitForServer( port ).then( () => {
              console.log(`${ framework } started on http://localhost:${ port }.`);
              server.unref();
              resolve();
            } );
        } );
    } );
} ) );

console.log( `All servers running.` );
