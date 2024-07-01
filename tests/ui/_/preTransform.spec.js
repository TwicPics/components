// Here are unit tests for verifying:
// the correct functionality of the "preTransform" property in the TwicImg, TwicVideo and TwicPicture component.

import { describe, expect } from 'vitest';
import { assetSelector } from '../domSelector.js';
import { getAssetData, getSrc, goto, setupUnitTests } from '../helpers.js';
import units from '../units.js';

let components = [
  {
      media: `img`,
      name: `TwicImg`
  },
  {
      media: `video`,
      name: `TwicVideo`
  }
];

const testCases = [];
components.forEach( component => {
    testCases.push( {
        description: `${ component.name } should render data-twic-transform`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              preTransform: `flip=x`
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'data-twic-transform' ] ).toEqual( `/flip=x/*` );
        }
    } );
    if ( component.name === `TwicVideo` ) {
        testCases.push( {
            description: `${ component.name } should render data-twic-poster and data-twic-poster-transform`,
            fn: async ( page, port ) => {
                const params = {
                  component: component.name,
                  src: getSrc( component.name ),
                  preTransform: `flip=x`
                };
            
                await goto( { page, params, port } );

                const assetData = await getAssetData ( page, assetSelector( component.media ) );
                expect( assetData[ 'data-twic-transform' ] ).toEqual( `/flip=x/*` );
                expect( assetData[ 'data-twic-poster' ] ).toEqual( `media:${ getSrc( component.name ) }` );
                expect( assetData[ 'data-twic-poster-transform' ] ).toEqual( `/flip=x/*/output=image` );
            },
        } );
    }
} );

describe( `PreTransform property test`, () => {
    setupUnitTests( units, testCases );
} );
