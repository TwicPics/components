import kill from 'kill-port';
import units from "./units.js";

export const isTruthy = ( value ) => !!value;

export const killports = async() => await Promise.all( units.map( async unit => {
  const { framework, port } = unit;
  console.log(`Stopping ${ framework } on port ${ port }.`);
  await kill( port ).catch( () => {} );
  console.log(`${ framework } stopped.`);
} ) );