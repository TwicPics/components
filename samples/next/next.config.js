/* eslint-disable strict */
/* globals module, require */
"use strict";

const withTM = require( `next-transpile-modules` )( [ `@twicpics/components-sample` ] );

module.exports = withTM( {
    "test": /\.jsx$/,
} );
