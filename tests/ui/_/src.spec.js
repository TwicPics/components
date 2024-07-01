// Here are unit tests for verifying:
// the correct functionality of the "src" property in the TwicImg and TwicVideo component.

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
        description: `${ component.name } should render data-twic-src`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            // asset should have data-twic-src
            expect( assetData[ 'data-twic-src' ] ).toEqual( `media:${ getSrc( component.name ) }` );
        }
    } );
    testCases.push( {
      description: `${ component.name } should render data-twic-src with red placeholder when no src provided`,
      fn: async ( page, port ) => {
          const params = {
            component: component.name,
            src: '',
          };
      
          await goto( { page, params, port } );

          const assetData = await getAssetData ( page, assetSelector( component.media ) );
          // asset should have data-twic-src
          expect( assetData[ 'data-twic-src' ] ).toEqual( `placeholder:red` );
      }
  } );
} );

describe( `Src property test`, () => {
    setupUnitTests( units, testCases );
} );
