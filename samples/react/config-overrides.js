/* eslint-disable no-param-reassign, strict */
/* global __dirname, module, require */
"use strict";

const ModuleScopePlugin = require( `react-dev-utils/ModuleScopePlugin` );

const rBabel = /\/babel-loader\//;
const rBabelPreset = /\/babel-preset-react-app\/index.js$/;

module.exports = config => {
    config.module.rules[ 1 ].oneOf.forEach( rule => {
        // if we have babel presets
        if (
            rBabel.test( rule.loader ) &&
            rBabelPreset.test( rule.options.presets[ 0 ][ 0 ] )
        ) {
            // we want to build files from /samples and up
            if ( rule.include ) {
                rule.include = __dirname;
            }
            // and we want to use build presets
            rule.options.presets[ 0 ][ 0 ] = require.resolve( `@babel/preset-react` );
        }
    } );
    config.resolve.plugins = config.resolve.plugins.filter( plugin => !( plugin instanceof ModuleScopePlugin ) );
    return config;
};
