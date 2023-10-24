import __dirname from "./__dirname.js";
import { copy, remove } from "fs-extra";
import { dirname } from "path";
import { readFile, unlink, writeFile } from "fs/promises";
import { gitHubRawPath } from "./version.js";
import { getFormatInfo } from "./formats.js";

const MINIFY_PASSES = 3;

const rGrandParent = /^\.\.\/\.\./;
const sourcemapPathTransform =
    path => path.replace(
        rGrandParent,
        gitHubRawPath
    );

const rJS = /\.m?js$/;

import terser from '@rollup/plugin-terser';
import typeScript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-porter";
import dts from "rollup-plugin-dts";
import minifier from "./minifier.js";
import replacer from "./replacer.js";

const getInputFileName = ( sourceDir, sourceFileName, javascript ) =>
`${ __dirname }/../${ `src/${ sourceDir }/${ sourceFileName }.${ javascript ? `js` : `ts` }` }`;

const getOutputFileName = ( framework, outputFileName, format ) => `${
            __dirname
        }/../dist/${
          framework
        }/${
          outputFileName || getFormatInfo( format, `fileName` ) || format
        }.${
          getFormatInfo( format, `extension` ) || `js`
      }`;

const getTsConfigFileName = () => `${ __dirname }/../tsconfig.json`;

export default ( { bundleCss = true,
    // eslint-disable-next-line no-shadow
    external = [],
    framework,
    javascript = false,
    plugins = [],
    postDefinitions,
    postTerser = [],
    sourceDir = framework,
    sourceFileName = `index`,
    outputFileName = undefined,
    sourcemap = true }, ...formats ) => {
    const actualFormats = formats.filter( f => !getFormatInfo( f ).type );
    return {
        "component": {
            "acorn": {
                "ecmaVersion": 2022,
            },
            "external": [
            `Object.assign`,
            ...external,
            ],
            "input": getInputFileName( sourceDir, sourceFileName, javascript ),
            "output": actualFormats.filter( f => !getFormatInfo( f ).type ).map( format => ( {
                "exports": `named`,
                "file": getOutputFileName( framework, outputFileName, format ),
                format,
                sourcemap,
                sourcemapPathTransform,
            } ) ),
            "plugins": [
                replacer( {
                    "replacer": [ /\bFRAMEWORK([^:])/g, `${ JSON.stringify( framework ) }$1` ],
                } ),
                ...( javascript ? [] : [
                    typeScript(
                        {
                            "tsconfig": getTsConfigFileName(),
                        }
                    ),
                ] ),
                css( {
                    "minified": true,
                } ),
                ...plugins,
                terser( {
                    "compress": {
                        "passes": MINIFY_PASSES,
                    },
                } ),
                ...postTerser,
                {
                    ...( bundleCss ? {
                        "writeBundle": async ( { file, format } ) => {
                            const cssFile = file.replace( rJS, `.css` );
                            const cssMinFile = file.replace( rJS, `.min.css` );
                            const cssMin = await readFile( cssMinFile, `utf8` );
                            await writeFile( file, ( await readFile( file, `utf8` ) ).replace(
                                /\*STYLE\*/g,
                                () => JSON.stringify( cssMin ).slice( 1, -1 )
                            ) );
                            if ( ( format === actualFormats[ 0 ] ) ) {
                                await copy( cssMinFile, `${ dirname( file ) }/style.css` );
                            }
                            await Promise.all( [
                                unlink( cssFile ),
                                unlink( cssMinFile ),
                            ] );
                        },
                    } : {} ),
                },
            ],
        },
        "typeScript": {
            external,
            "input": `${ __dirname }/../dist/${ framework }/dts/${ sourceDir }/index.d.ts`,
            "output": {
                "file": `${ __dirname }/../dist/${ framework }/dts/bundle.d.ts`,
                "format": `es`,
            },
            "plugins": [
                replacer( {
                    "replacer": [ /(\n|^)import\s*"..\/_\/style.css"\s*;(?:\n|$)/, `$1` ],
                } ),
                dts(),
                {
                    "writeBundle": async ( { file } ) => {
                        let typeDefinitions = await readFile( file, `utf8` );
                        if ( postDefinitions ) {
                            typeDefinitions = postDefinitions( typeDefinitions );
                        }
                        typeDefinitions = minifier( typeDefinitions );
                        const ref = `export*from"./${ getFormatInfo( actualFormats[ 0 ], `fileName` ) ||
                            actualFormats[ 0 ] }.d.ts";`;
                        await Promise.all( actualFormats.map(
                            ( f, isCopy ) => writeFile(
                                `${ __dirname }/../dist/${ framework }/${
                                  getFormatInfo( f, `fileName` ) || f
                                }.d.ts`,
                                isCopy ? ref : typeDefinitions
                            )
                        ) );
                        await remove( `${ __dirname }/../dist/${ framework }/dts` );
                    },
                },
            ],
        },
    };
};
