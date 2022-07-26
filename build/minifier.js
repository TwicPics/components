export default content =>
    content.replace(
        /(([`'"])(?:\\.|.|\r|\n)+?\2)|\/\/.*|\/\*(?:.|\r|\n)*?\*\//g,
        ( _, string ) => string || ` `
    ).replace( /\s*([^_a-z0-9])\s*/gi, `$1` );
