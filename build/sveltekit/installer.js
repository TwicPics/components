/* eslint-disable no-console */
import { execSync } from "child_process";
import { templatePath } from "./utils.js";

export default () => {
    console.log( `installing SvelteKit from ${ templatePath }` );
    execSync( `cd ${ templatePath } && $npm_execpath install` );
    console.log( `SvelteKit installation done` );
};
