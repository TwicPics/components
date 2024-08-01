// Here are unit tests for verifying:
// the correct functionality of the "decoding" property in the TwicImg and TwicPicture components.

import { describe, expect } from 'vitest';
import { assetSelector } from '../domSelector.js';
import { getAssetData, getSrc, goto, setupUnitTests } from '../helpers.js';

let components = [
  {
      media: `img`,
      name: `TwicImg`
  },
  {
      media: `picture-img`,
      name: `TwicPicture`
  }
];

const testCases = [];
components.forEach( component => {
    testCases.push( {
        description: `${ component.name } should not render any decoding attribute`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'decoding' ] ).toBe( null );
        },
    } );
    testCases.push( {
        description: `${ component.name } should not render any decoding attribute when empty is passed`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              decoding: ``
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'decoding' ] ).toBe( null );
        }
    } );
    testCases.push( {
        description: `${ component.name } should not render any decoding attribute when invalid is passed`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              decoding: ` in  valid`
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'decoding' ] ).toBe( null );
        }
    } );
    testCases.push( {
        description: `${ component.name } should not render any decoding attribute when 'none' is passed`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              decoding: `none`
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'decoding' ] ).toBe( null );
        }
    } );
    testCases.push( {
        description: `${ component.name } should render decoding attribute when valid`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              decoding: "async"
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector ( component.media ) );
            expect( assetData[ 'decoding' ] ).toBe( "async" );
        }
    } );
} );

describe( `Decoding property test`, () => {
    setupUnitTests( testCases );
} );
