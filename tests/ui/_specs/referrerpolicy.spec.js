// Here are unit tests for verifying:
// the correct functionality of the "referrerpolicy" property in the TwicImg and TwicPicture components.

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
        description: `${ component.name } should not render any referrerpolicy attribute`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'referrerpolicy' ] ).toBe( null );
        },
    } );
    testCases.push( {
        description: `${ component.name } should not render any referrerpolicy attribute when empty is passed`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              referrerpolicy: ``
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'referrerpolicy' ] ).toBe( null );
        }
    } );
    testCases.push( {
        description: `${ component.name } should not render any referrerpolicy attribute when invalid is passed`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              referrerpolicy: ` in  valid`
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'referrerpolicy' ] ).toBe( null );
        }
    } );
    testCases.push( {
        description: `${ component.name } should not render any referrerpolicy attribute when 'none' is passed`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              referrerpolicy: `none`
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'referrerpolicy' ] ).toBe( null );
        }
    } );
    testCases.push( {
        description: `${ component.name } should render referrerpolicy attribute when valid`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              referrerpolicy: "strict-origin-when-cross-origin"
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector ( component.media ) );
            expect( assetData[ 'referrerpolicy' ] ).toBe( "strict-origin-when-cross-origin" );
        }
    } );
} );

describe( `Crossorigin property test`, () => {
    setupUnitTests( testCases );
} );
