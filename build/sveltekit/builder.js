import __dirname from "../__dirname.js";
import minifier from "../minifier.js";
import replacer from "../replacer.js";
import rollup from "../rollup.js";
import { gitHubRawPath } from "../version.js";
import config from "./config.js";
import { templatePath } from "./utils.js";
import typeScript from "@rollup/plugin-typescript";
import terser from '@rollup/plugin-terser';
import { execSync } from "child_process";
import fs from 'fs-extra';
import { readFile, writeFile } from "fs/promises";
import dts from "rollup-plugin-dts";
import brandConfiguration from "../brandConfiguration.js";
import replaceInFiles from "../replaceInFiles.js";

const { copy, remove } = fs;
const { components = [], versions = [] } = config;

/* eslint-disable no-console */
export const buildComponents = async ( { brand = `twicpics` } = {} ) => {
    console.log( `Building ${ versions.join( `,` ) } components` );

    // source path within building project
    const srcPath = `${ templatePath }src/lib`;

    // 0 - remove old source from previous build
    await remove( srcPath );

    // 1 - copy common sources to library lib folder
    await copy( `${ __dirname }/../src/_/`, `${ srcPath }/_` );

    // 2 - copy svelte3 sources files
    await copy( `${ __dirname }/../src/svelte3/`, srcPath );

    // 3 - adaptation of Svelte3 sources
    await replaceInFiles( {
        "files": `${ srcPath }/*.*`,
        "replacers": [
            [ /\.\.\/_\//g, `./_/` ],
            [ /import\s*".\/_\/style.css"\s*;/, `` ],
            [ /<svelte:options tag=.*\/>/gm, `` ],
            [ /import.*"svelte\/internal"\s*;/gm, `const getCurrentComponent = () :HTMLElement => undefined;` ],
            ...brandConfiguration( brand ),
        ],
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
    execSync( `cd ${ templatePath } && $npm_execpath package` );

    const distFolder = `${ __dirname }/../dist/sveltekit/`;

    // 9 - copies generated files to twicPics dist folder
    await copy( `${ templatePath }/package/`, distFolder );

    // 9 - removes working files
    await Promise.all( [ srcPath, `${ templatePath }/package` ].map( d => remove( d ) ) );
};

/**
 * generates and returns exports attributes to be added to generated package.json
 */
export const exportsPackageJson = () => {
    const exports = new Map();
    for ( const version of versions ) {
        exports.set( `./${ version }`, {
            "main": `./sveltekit/index.js`,
            "module": `./sveltekit/index.js`,
            "svelte": `./sveltekit/index.js`,
            "types": `./sveltekit/index.d.ts`,
        } );
    }
    for ( const component of components ) {
        exports.set( `./sveltekit/${ component }.svelte`, {
            "types": `./sveltekit/${ component }.svelte.d.ts`,
            "svelte": `./sveltekit/${ component }.svelte`,
        } );
    }
    return exports;
};

