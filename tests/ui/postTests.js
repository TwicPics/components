import { exec } from "child_process";
import units from "./units.js";

await Promise.all( units.map( async unit => {
  const { framework, port } = unit;
  console.log(`Stopping ${ framework } on port ${ port }.`);
  await new Promise( ( resolve ) => {
    exec( `npx kill-port ${ port }`, resolve );
  } );
  console.log(`${ framework } stopped.`);
} ) );