import __dirname from "./__dirname.js";
import { createRequire } from "module";
import { dirname } from 'path';
import { readFile, unlink, writeFile } from "fs/promises";
import { copy, remove } from "fs-extra";
import { rollup } from "rollup";

const MINIFY_PASSES = 3;

const { "version": packageVersion } = createRequire( import.meta.url )( `./package.template.json` );

const rGrandParent = /^\.\.\/\.\./;
const sourcemapPathTransform =
    path => path.replace(
        rGrandParent,
        `https://raw.githubusercontent.com/twicpics/components/${ packageVersion }`
    );

const rJS = /\.js$/;

const formatRename = new Map( [
    [ `cjs`, `index` ],
    [ `es`, `module` ],
] );

import css from 'rollup-plugin-css-porter';
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import typeScript from "@rollup/plugin-typescript";
import replacer from "./replacer.js";

export default (
    // eslint-disable-next-line no-shadow
    { external = [], framework, plugins = [], post, sourceDir = framework, sourceFile },
    ...formats
) => ( {
    "component": {
        "acorn": {
            "ecmaVersion": 2022,
        },
        "external": [
            `Object.assign`,
            ...external,
        ],
        "input": `${ __dirname }/../${ sourceFile || `src/${ sourceDir }/index.ts` }`,
        "output": formats.map( format => ( {
            "exports": `named`,
            "file": `${ __dirname }/../dist/${ framework }/${ formatRename.get( format ) || format }.js`,
            format,
            "sourcemap": true,
            sourcemapPathTransform,
        } ) ),
        "plugins": [
            typeScript( {
                "tsconfig": `${ __dirname }/../tsconfig.json`,
            } ),
            css( {
                "minified": true,
            } ),
            ...plugins,
            terser( {
                "compress": {
                    "passes": MINIFY_PASSES,
                },
            } ),
            {
                "writeBundle": async ( { file, format } ) => {
                    const cssFile = file.replace( rJS, `.css` );
                    const cssMinFile = file.replace( rJS, `.min.css` );
                    if ( format === formats[ 0 ] ) {
                        await copy( cssMinFile, `${ dirname( file ) }/style.css` );
                    }
                    await Promise.all( [
                        unlink( cssFile ),
                        unlink( cssMinFile ),
                    ] );
                },
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
                "replacer": [ /(\n|^)import\s*"..\/_\/style.css"\s*;(?:\n|$)/, `$1` ]
            } ),
            dts(),
            {
                "writeBundle": async ( { file } ) => {
                    if ( post ) {
                        await writeFile( file, post( await readFile( file, `utf8` ) ) );
                    }
                    await Promise.all( formats.map( f => copy(
                        file,
                        `${ __dirname }/../dist/${ framework }/${ formatRename.get( f ) || f }.d.ts`
                    ) ) );
                    await remove( `${ __dirname }/../dist/${ framework }/dts` );
                }
            },
        ],
    },
} );
