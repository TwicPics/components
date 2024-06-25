import { remove } from "fs-extra";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname( fileURLToPath( import.meta.url ) );

const tmpTestDirectory =  `${ __dirname }/tmp`;

await remove( `${ tmpTestDirectory }` );




