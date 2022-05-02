/* eslint-disable no-undef */
import path from 'path';

export default function TwicPicsModule( moduleOptions ) {

    const options = {
        ...( moduleOptions || {} ),
        ...( this.options.twicpics || {} ),
    };

    if ( !options.domain ) {
        // eslint-disable-next-line no-console
        console.warn( `twicpics nuxt module : domain has not been configured. Please check nuxt.config.js file` );
    }

    this.options.css.push( `@twicpics/components/style.css` );

    this.addPlugin(
        {
            // eslint-disable-next-line no-undef
            "src": path.resolve( __dirname, `./plugin.js` ),
            options,
        }
    );
}
// required if publishing the module as npm package
module.exports.meta = require( `../package.json` );
