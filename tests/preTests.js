import { copy, remove } from "fs-extra";
import { dirname } from "path";
import replaceInFile from "replace-in-file";
import { fileURLToPath } from "url";

const __dirname = dirname( fileURLToPath( import.meta.url ) );

const tmpTestDirectory =  `${ __dirname }/tmp`;

await remove( `${ tmpTestDirectory }/_` );

// copy original sources to the directory where they will be tested.
await copy( `${ __dirname }/../src/_/`, `${ tmpTestDirectory }/_` );

// copy test files to the testing directory
await copy( `${ __dirname }/src/_/`, `${ tmpTestDirectory }/_` );

await replaceInFile( {
  "files": `${ tmpTestDirectory }/_/*.*`,
  "from": [
      /\bFRAMEWORK([^:])/g,
      /(\.\.\/){3}src\/_/g,
  ],
  "to": [
      `'react'`,
      '.'
  ],
} );




