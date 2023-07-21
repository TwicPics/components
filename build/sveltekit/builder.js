import __dirname from "../__dirname.js";
import { getJsonFromPath, writeJson } from "../json.js";

import minifier from "../minifier.js";
import replacer from "../replacer.js";
import rollup from "../rollup.js";
import { gitHubRawPath, packageVersion } from "../version.js";
import { svelteKitInfos } from "./utils.js";
import typeScript from "@rollup/plugin-typescript";
import { execSync } from "child_process";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import fs from 'fs-extra';
const { copy, remove } = fs;
import { readFile, writeFile } from "fs/promises";
import replaceInFile from "replace-in-file";

/* eslint-disable no-console */
export const buildComponents = async () => {
    console.log( `Building Sveltekit components` );

    // source path within building project
    const srcPath = `${ svelteKitInfos.templatePath }src/lib`;

    // 0 - remove old source from previous build
    await remove( srcPath );

    // 1 - copy common sources to library lib folder
    await copy( `${ __dirname }/../src/_/`, `${ srcPath }/_` );

    // 2 - copy svelte3 sources files
    await copy( `${ __dirname }/../src/svelte3/`, srcPath );

    // 3 - adaptation of Svelte3 sources
    await replaceInFile( {
        "files": `${ srcPath }/*.*`,
        "from": [ /\.\.\/_\//g, /import\s*".\/_\/style.css"\s*;/, /<svelte:options tag=.*\/>/gm ],
        "to": [ `./_/`, ``, `` ],
    } );

    // 4 - rollup utils.ts
    const SVELTE_UTILS = `_utils`;
    await rollup( {
        "input": `${ srcPath }/${ SVELTE_UTILS }.ts`,
        "output": [
            {
                "file": `${ srcPath }/${ SVELTE_UTILS }.js`,
                "format": `esm`,
                "sourcemap": true,
                "sourcemapPathTransform": path => path
                    .replace(
                        /^_\//,
                        `${ gitHubRawPath }/src/_/`
                    ).replace(
                        /^(_.*.ts)/,
                        `${ gitHubRawPath }/src/svelte3/$1`
                    ),
            },
        ],
        "plugins": [
            replacer( {
                "replacer": [ /\bFRAMEWORK([^:])/g, `"SVELTEKIT"` ],
            } ),
            typeScript(
                {
                    "tsconfig": `${ __dirname }/sveltekit/template/rollup.config.json`,
                }
            ),
            terser( {
                "compress": false,
            } ),
        ],
    } );

    // 5 - rollup utils.d.ts
    await rollup( {
        "input": `${ srcPath }/dts/${ SVELTE_UTILS }.d.ts`,
        "output": [
            {
                "file": `${ srcPath }/dts/${ SVELTE_UTILS }.d.ts`,
                "format": `es`,
            },
        ],
        "plugins": [
            dts(),
            {
                "writeBundle": async ( { file } ) => {
                    writeFile(
                        `${ srcPath }/${ SVELTE_UTILS }.d.ts`,
                        minifier( await readFile( file, `utf8` ) )
                    );
                    await remove( `${ srcPath }/dts` );
                },
            },
        ],
    } );

    // 6 - deletes files we don't want to be packaged
    await Promise.all(
        [
            `${ srcPath }/_`,
            `${ srcPath }/${ SVELTE_UTILS }.ts`,
        ].map( d => remove( d ) )
    );

    // 7 - launches official builder
    execSync( `cd ${ svelteKitInfos.templatePath } && $npm_execpath package` );

    const distFolder = `${ __dirname }/../dist/sveltekit/`;

    // 8 - handles package version and package name
    const packageJSON = await getJsonFromPath( `${ svelteKitInfos.templatePath }/package.json` );
    packageJSON.version = packageVersion;
    packageJSON.name = `@twicpics/components/sveltekit`;
    await writeJson( `${ distFolder }package.json`, packageJSON );

    // 9 - copies generated files to twicPics dist folder
    await copy( `${ svelteKitInfos.templatePath }/package/`, distFolder );

    // 10 - removes working files
    await Promise.all( [ srcPath, `${ svelteKitInfos.templatePath }/package` ].map( d => remove( d ) ) );
};

/**
 * generates and returns exports attributes to be added to generated package.json
 */
export const exportsPackageJson = () => {
    const exports = new Map();
    exports.set( `./sveltekit`, {
        "main": `./sveltekit/index.js`,
        "module": `./sveltekit/index.js`,
        "svelte": `./sveltekit/index.js`,
        "types": `./sveltekit/index.d.ts`,
    } );
    exports.set( `./sveltekit/`, `./sveltekit/` );
    return exports;
};
