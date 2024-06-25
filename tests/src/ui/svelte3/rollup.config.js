/* global process */
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-css-only";
import livereload from "rollup-plugin-livereload";
import terser from '@rollup/plugin-terser';
import resolve from "@rollup/plugin-node-resolve";
import { spawn } from "child_process";
import svelte from "rollup-plugin-svelte";

const production = !process.env.ROLLUP_WATCH;

const serve = () => {
    let server;
    const toExit = () => {
        if ( server ) {
            server.kill( 0 );
        }
    };
    return {
        "writeBundle": () => {
            if ( !server ) {
                server = spawn(
                    `npm`,
                    [ `run`, `start`, `--`, `--dev` ],
                    {
                        "stdio": [ `ignore`, `inherit`, `inherit` ],
                        "shell": true,
                    }
                );
                process.on( `SIGTERM`, toExit );
                process.on( `exit`, toExit );
            }
        },
    };
};

export default {
    "input": `src/main.js`,
    "output": {
        "sourcemap": true,
        "format": `iife`,
        "name": `app`,
        "file": `public/build/bundle.js`,
    },
    "plugins": [
        svelte( {
            "compilerOptions": {
                "dev": !production,
            },
        } ),
        css( {
            "output": `bundle.css`,
        } ),
        resolve( {
            "browser": true,
            "dedupe": [ `svelte` ],
        } ),
        commonjs(),
        !production && serve(),
        !production && livereload( `public` ),
        production && terser(),
    ],
    "watch": {
        "clearScreen": false,
    },
};
