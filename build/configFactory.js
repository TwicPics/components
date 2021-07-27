import { createRequire } from "module";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const { "version": packageVersion } = createRequire( import.meta.url )( `../package.json` );

const rGrandParent = /^\.\.\/\.\./;
const sourcemapPathTransform =
    path => path.replace(
        rGrandParent,
        `https://raw.githubusercontent.com/twicpics/components/${ packageVersion }`
    );

const namedFormats = new Set( [ `iife`, `umd` ] );

import { babel } from "@rollup/plugin-babel";
import cleaner from "./cleaner.js";
import css from 'rollup-plugin-css-porter';
import noderesolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default (
    // eslint-disable-next-line no-shadow
    { external = [], framework, globals, plugins = [], presets = [], sourceDir = framework, sourceFile },
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
        "file": `${ __dirname }/../dist/${ framework }/${ format }.js`,
        format,
        "globals": ( namedFormats.has( format ) && globals ) || undefined,
        "name": namedFormats.has( format ) ? `TwicPics` : undefined,
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
    ],
} );
