// Here are unit tests for verifying:
// the correct functionality of the "placeholder" property in the TwicImg, TwicVideo.
// background image computation should have been tested in common unit testing

import { describe, expect } from 'vitest';
import { placeholderSelector } from '../domSelector.js';
import { getPlaceholderData, getSrc, goto, setupUnitTests } from '../helpers.js';
import units from '../units.js';

let components = [
  {
      media: `img`,
      name: `TwicImg`
  },
  {
      media: `video`,
      name: `TwicVideo`
  },
];

const testCases = [];
components.forEach( component => {
    testCases.push( {
        description: `${ component.name } should render a placeholder div with preview image`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
            };
        
            await goto( { page, params, port } );

            const placeholder = await page.$$( placeholderSelector( component.media ) );
            expect( placeholder ).toHaveLength( 1 );

            const placeholderData = await getPlaceholderData ( page, placeholderSelector( component.media ) );
            expect ( placeholderData[ `background-image` ] ).toContain( 'output=preview' );
        },
    } );
    testCases.push( {
        description: `${ component.name } should render a placeholder div with maincolor image`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              placeholder: "maincolor"
            };
        
            await goto( { page, params, port } );

            const placeholder = await page.$$( placeholderSelector( component.media ) );
            expect( placeholder ).toHaveLength( 1 );

            const placeholderData = await getPlaceholderData ( page, placeholderSelector( component.media ) );
            expect ( placeholderData[ `background-image` ] ).toContain( 'output=maincolor' );
        },
    } );
    testCases.push( {
        description: `${ component.name } should render a placeholder div with meancolor image`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              placeholder: "meancolor"
            };
        
            await goto( { page, params, port } );

            const placeholder = await page.$$( placeholderSelector( component.media ) );
            expect( placeholder ).toHaveLength( 1 );

            const placeholderData = await getPlaceholderData ( page, placeholderSelector( component.media ) );
            expect ( placeholderData[ `background-image` ] ).toContain( 'output=meancolor' );
        },
    } );
    testCases.push( {
        description: `${ component.name } should not render a placeholder div`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              placeholder: `none`
            };
        
            await goto( { page, params, port } );

            await goto( { page, params, port } );

            const placeholder = await page.$$( placeholderSelector( component.media ));
            expect( placeholder ).toHaveLength( 0 );
        },
    } );
} );


describe( `Placeholder property test`, () => {
    setupUnitTests( units, testCases );
} );
