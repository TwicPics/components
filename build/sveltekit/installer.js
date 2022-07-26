/* eslint-disable no-console */
import { execSync } from "child_process";
import { svelteKitInfos } from "./utils.js";

export default () => {
    console.log( `installing SvelteKit from ${ svelteKitInfos.templatePath }` );
    execSync( `cd ${ svelteKitInfos.templatePath } && $npm_execpath install` );
    console.log( `SvelteKit installation done` );
};
