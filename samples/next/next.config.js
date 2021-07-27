const withCompileNodeModules = require( `@moxy/next-compile-node-modules` );

module.exports = withCompileNodeModules( {
    "test": /\.jsx$/,
} );
