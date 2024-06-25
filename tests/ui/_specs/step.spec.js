// Here are unit tests for verifying:
// the correct functionality of the "step" property in the TwicImg and TwicVideo components.

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
        description: `${ component.name } should not render data-twic-step`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'data-twic-step' ] ).toBeNull();
        },
    } );
    testCases.push( {
        description: `${ component.name } should render data-twic-step`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              step: 400
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'data-twic-step' ] ).toEqual( `400` );
        },
    } );
} );

describe( `Step property test`, () => {
    setupUnitTests( testCases );
} );
