import { execSync } from "child_process";
import fs from "fs-extra";
import { readFile, writeFile } from "fs/promises";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import typeScript from "@rollup/plugin-typescript";
import __dirname from "../__dirname.js";
import { replacersConfiguration } from "../brand.js";
import minifier from "../minifier.js";
import replaceInFiles from "../replaceInFiles.js";
import replacer from "../replacer.js";
import rollup from "../rollup.js";
import { gitHubRawPath } from "../version.js";
import config from "./config.js";
import { templatePath } from "./utils.js";
import path from "path";

const { copy, copyFile, readdir, remove } = fs;
const { components = [], versions = [] } = config;

const brandRenamer = ( genericName, brandReplacers ) => {
    let brandedName = genericName;
    for ( const [ pattern, replacement ] of brandReplacers ) {
        brandedName = brandedName.replace( pattern, replacement );
    }
    return brandedName;
};

/* eslint-disable no-console */
export const buildComponents = async ( { brand } = {} ) => {
    console.log( `Building ${ versions.join( `,` ) } components` );

    // source path within building project
    const actualSrcPath = `${ templatePath }src/lib`;

    // 0 - remove old source from previous build
    await remove( actualSrcPath );

    // 1 - copy common sources to library lib folder
    await copy( `${ __dirname }/../src/_/`, `${ actualSrcPath }/_` );

    // 2 - copy svelte3 sources files from origineSrcPath to actualSrcPath

    const origineSrcPath = `${ __dirname }/../src/svelte3/`;

    const files = await readdir( origineSrcPath );
    const brandReplacers = replacersConfiguration( {
        brand,
        "isSvelteKit": true,
    } );

    // copies and renames files according to brand configuration
    await Promise.all(
        files.map( file => copyFile(
            path.join( origineSrcPath, file ),
            path.join( actualSrcPath, brandRenamer( file, brandReplacers ) )
        ) )
    );

    // 3 - adaptation of Svelte3 sources
    await replaceInFiles( {
        "files": `${ actualSrcPath }/*.*`,
        "replacers": [
            [ /\.\.\/_\//g, `./_/` ],
            [ /import\s*".\/_\/style.css"\s*;/, `` ],
            [ /<svelte:options tag=.*\/>/gm, `` ],
            [ /import.*"svelte\/internal"\s*;/gm, `const getCurrentComponent = () :HTMLElement => undefined;` ],
            ...brandReplacers,
        ],
    } );

    // 4 - rollup utils.ts
    const SVELTE_UTILS = `_utils`;
    await rollup( {
        "input": `${ actualSrcPath }/${ SVELTE_UTILS }.ts`,
        "output": [
            {
                "file": `${ actualSrcPath }/${ SVELTE_UTILS }.js`,
                "format": `esm`,
                "sourcemap": true,
                "sourcemapPathTransform": sourcemapPath => sourcemapPath
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
                "replacers": [
                    ...brandReplacers,
                    [ /\bFRAMEWORK[^:]/g, `"SVELTEKIT"` ],
                ],
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
        "input": `${ actualSrcPath }/dts/${ SVELTE_UTILS }.d.ts`,
        "output": [
            {
                "file": `${ actualSrcPath }/dts/${ SVELTE_UTILS }.d.ts`,
                "format": `es`,
            },
        ],
        "plugins": [
            dts(),
            {
                "writeBundle": async ( { file } ) => {
                    writeFile(
                        `${ actualSrcPath }/${ SVELTE_UTILS }.d.ts`,
                        minifier( await readFile( file, `utf8` ) )
                    );
                    await remove( `${ actualSrcPath }/dts` );
                },
            },
        ],
    } );

    // 6 - deletes files we don't want to be packaged
    await Promise.all(
        [
            `${ actualSrcPath }/_`,
            `${ actualSrcPath }/${ SVELTE_UTILS }.ts`,
        ].map( d => remove( d ) )
    );

    // 7 - launches official builder
    execSync( `cd ${ templatePath } && $npm_execpath package` );

    const distFolder = `${ __dirname }/../dist/sveltekit/`;

    // 9 - copies generated files to twicPics dist folder
    await copy( `${ templatePath }/package/`, distFolder );

    // 9 - removes working files
    await Promise.all( [ actualSrcPath, `${ templatePath }/package` ].map( d => remove( d ) ) );
};

/**
 * generates and returns exports attributes to be added to generated package.json
 */
export const exportsPackageJson = ( { brand } ) => {
    const exports = new Map();
    console.log( brand );
    for ( const version of versions ) {
        exports.set( `./${ version }`, {
            "main": `./sveltekit/index.js`,
            "module": `./sveltekit/index.js`,
            "svelte": `./sveltekit/index.js`,
            "types": `./sveltekit/index.d.ts`,
        } );
    }

    const brandReplacers = replacersConfiguration( {
        brand,
        "isSvelteKit": true,
    } );

    for ( const component of components ) {
        const componentName = brandRenamer( `${ component }.svelte`, brandReplacers );
        exports.set( `./sveltekit/${ componentName }`, {
            "types": `./sveltekit/${ componentName }.d.ts`,
            "svelte": `./sveltekit/${ componentName }`,
        } );
    }
    return exports;
};

