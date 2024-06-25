import units from "./units.js";

await Promise.all( units.map( async unit => { 
  const { framework, port } = unit;
  console.log("framework", framework);
} ) );