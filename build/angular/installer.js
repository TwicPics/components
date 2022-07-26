/* eslint-disable no-console */
import { getAngularDirectories } from "./utils.js";
import { execSync } from "child_process";

// retrieve the angular directories where the installation should be launched
const angularDirectories = await getAngularDirectories();
// loop on angular directories
export default async () => {
    for await ( const angularDirectory of angularDirectories ) {
        console.log( `installing ${ angularDirectory.name } from ${ angularDirectory.path }` );
        execSync( `cd ${ angularDirectory.path } && $npm_execpath install` );
        console.log( `${ angularDirectory.name } installation done` );
    }
};
