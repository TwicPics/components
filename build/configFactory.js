import __dirname from "./__dirname.js";
import { createRequire } from "module";
import { dirname } from 'path';
import { readFile, unlink, writeFile } from "fs/promises";

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
    [ `esm`, `module` ],
] );

import { babel } from "@rollup/plugin-babel";
import cleaner from "./cleaner.js";
import css from 'rollup-plugin-css-porter';
import noderesolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default (
    // eslint-disable-next-line no-shadow
    { external = [], framework, plugins = [], presets = [], sourceDir = framework, sourceFile },
    ...formats
) => ( {
    "acorn": {
        "ecmaVersion": 2022,
    },
    "external": [
        `Object.assign`,
        ...external,
    ],
    "input": `${ __dirname }/../${ sourceFile || `src/${ sourceDir }/index.js` }`,
    "output": formats.map( format => ( {
        "exports": `named`,
        "file": `${ __dirname }/../dist/${ framework }/${ formatRename.get( format ) || format }.js`,
        format,
        "sourcemap": true,
        sourcemapPathTransform,
    } ) ),
    "plugins": [
        noderesolve(),
        css( {
            "minified": true,
        } ),
        babel( {
            "babelHelpers": `bundled`,
            presets,
        } ),
        cleaner( [ [ /\nfunction _extends\(\) \{\n(?:.|\n)+?\n\}\n/g, `\nconst _extends = Object.assign;\n` ] ] ),
        terser(),
        ...plugins,
        {
            "writeBundle": async ( { file, format } ) => {
                const cssFile = file.replace( rJS, `.css` );
                const cssMinFile = file.replace( rJS, `.min.css` );
                if ( format === formats[ 0 ] ) {
                    await writeFile( `${ dirname( file ) }/style.css`, await readFile( cssMinFile, `utf8` ) );
                }
                await Promise.all( [
                    unlink( cssFile ),
                    unlink( cssMinFile ),
                ] );
            },
        },
    ],
} );
