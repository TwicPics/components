// Here are unit tests for verifying:
// the correct functionality of the "eager" property in the TwicImg, TwicVideo and TwicPicture component.

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
  },
  {
      media: `picture-img`,
      name: `TwicPicture`
  }
];

const testCases = [];
components.forEach( component => {
    if ( component.name !== `TwicPicture`) {
        testCases.push( {
            description: `${ component.name } should not render data-twic-eager`,
            fn: async ( page, port ) => {
                const params = {
                  component: component.name,
                  src: getSrc( component.name ),
                };
            
                await goto( { page, params, port } );

                const assetData = await getAssetData ( page, assetSelector( component.media ) );
                expect( assetData[ 'data-twic-eager' ] ).toBe( null );
            },
        } );
        testCases.push( {
            description: `${ component.name } should render data-twic-eager`,
            fn: async ( page, port ) => {
                const params = {
                  component: component.name,
                  src: getSrc( component.name ),
                  eager: true
                };
            
                await goto( { page, params, port } );

                const assetData = await getAssetData ( page, assetSelector( component.media ) );
                expect( assetData[ 'data-twic-eager' ] ).not.toBe( null );
            },
        } );
    }
    if ( component.name === `TwicPicture`) {
        testCases.push( {
            description: `${ component.name } should render loading=lazy and no fetchpriority`,
            fn: async ( page, port ) => {
                const params = {
                  component: component.name,
                  src: getSrc( component.name ),
                };
            
                await goto( { page, params, port } );
        
                const assetData = await getAssetData ( page, assetSelector( component.media ) );
                expect( assetData[ 'loading' ] ).toEqual( `lazy` );
                expect( assetData[ 'fetchpriority' ] ).toBeNull();
            },
        } );
        testCases.push( {
            description: `${ component.name } should render loading=eager and fetchpriority=high`,
            fn: async ( page, port ) => {
                const params = {
                  component: component.name,
                  src: getSrc( component.name ),
                  eager: true,
                };
            
                await goto( { page, params, port } );
        
                const assetData = await getAssetData ( page, assetSelector( component.media ) );
                expect( assetData[ 'loading' ] ).toEqual( `eager` );
                expect( assetData[ 'fetchpriority' ] ).toEqual( `high` );
            },
        } );
    }
} );


describe( `Eager property test`, () => {
    setupUnitTests( testCases );
} );
