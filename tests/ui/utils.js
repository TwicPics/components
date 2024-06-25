import http from "http";
import kill from 'kill-port';
import units from './units.js';

export const checkPort = async ( port, wait = false ) => new Promise( resolve => {
    let timeoutId;
    const retry = () => {
        timeoutId = setTimeout( checkServer, 1000 )
    };
    const checkServer =  () => {
        http.get( `http://localhost:${ port }`, res => {
            clearTimeout( timeoutId );
            if ( wait ) {
                res.statusCode === 200 ? resolve() : retry();
            } else {
                resolve(!!res);
            }
        } ).on('error', err => {
            clearTimeout( timeoutId );
            wait ? retry() : resolve(err.code !== 'ECONNREFUSED');
        } );
    };
    checkServer();
} );


export const killports = async() => await Promise.all( units.map( async unit => {
    const { port } = unit;
    if ( await checkPort( port ) ) {
        console.log( `Stopping port ${ port }.`);
        await kill( port ).catch( () => {} );
        console.log( `Port ${ port } stopped.` );
    }
} ) );