import http from 'http';
import kill from 'kill-port';
import units from "./units.js";

export const delay = async( delay ) => await new Promise( ( resolve ) => setTimeout( resolve, delay ) );

const isPortInUse = async ( port ) => await new Promise( ( resolve ) => {
    try {
      const req = http.request({
          hostname: 'localhost',
          port: port,
          path: '/',
          method: 'GET',
      }, ( res ) => {
          resolve( !!res );
      });

      req.on( 'error', ( err ) => {
          resolve(err.code !== 'ECONNREFUSED');
      } );
      req.end();
    } catch ( _ ) {
        resolve( false );
    } 
  } );
export const killports = async() => await Promise.all( units.map( async unit => {
  const { framework, port } = unit;
  if ( await isPortInUse( port ) ) {
      console.log( `Stopping ${ framework } on port ${ port }.`);
      await kill( port ).catch( () => {} );
      console.log( `${framework} stopped.` );
  }
} ) );