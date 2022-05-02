/* eslint-disable no-undef */
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit';

export default defineNuxtModule( {
    "meta": {
        // usually  npm package name of your module
        "name": `@twicpics/components`,
        // the key in `nuxt.config` that holds your module options
        "configKey": `twicpics`,
        // compatibility constraints
        "compatibility": {
            // semver version of supported nuxt versions
            "nuxt": `^3.0.0`,
        },
    },
    setup( moduleOptions, nuxt ) {
        if ( !moduleOptions || !moduleOptions.domain ) {
            // eslint-disable-next-line no-console
            console.warn( `twicpics nuxt3 module : domain has not been configured. Please check nuxt.config.ts file` );
        }
        nuxt.options.runtimeConfig.public.twicpics = moduleOptions;
        nuxt.options.css.push( `@twicpics/components/style.css` );
        const { resolve } = createResolver( import.meta.url );
        addPlugin( {
            "src": resolve( `./plugin` ),
        } );
    },
} );
