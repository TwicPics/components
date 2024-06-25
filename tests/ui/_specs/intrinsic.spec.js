// Here are unit tests for verifying:
// the correct functionality of the "intrinsic" property in the TwicImg and TwicVideo component.

import { describe, expect } from 'vitest';
import { assetSelector } from '../domSelector.js';
import { getAssetData, getSrc, goto, setupUnitTests } from '../helpers.js';

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
        description: `${ component.name } should not render data-twic-intrinsic`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'data-twic-intrinsic' ] ).toBeNull();
        },
    } );
    testCases.push( {
        description: `${ component.name } should render data-twic-intrinsic`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              intrinsic: `1234x5678`
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'data-twic-intrinsic' ] ).toEqual( `1234x5678` );
        },
    } );
} );

describe( `Intrinsic property test`, () => {
    setupUnitTests( testCases );
} );
