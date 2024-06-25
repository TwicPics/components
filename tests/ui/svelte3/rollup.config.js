/* global process */
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-css-only";
import resolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";

export default {
    "input": `src/main.js`,
    "output": {
        "sourcemap": true,
        "format": `iife`,
        "name": `app`,
        "file": `public/build/bundle.js`,
    },
    "plugins": [
        svelte(),
        css( {
            "output": `bundle.css`,
        } ),
        resolve( {
            "browser": true,
            "dedupe": [ `svelte` ],
        } ),
        commonjs(),
    ],
};
