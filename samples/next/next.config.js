/* eslint-disable strict */
/* globals module, require */
"use strict";

const withCompileNodeModules = require( `@moxy/next-compile-node-modules` );

module.exports = withCompileNodeModules( {
    "test": /\.jsx$/,
} );
