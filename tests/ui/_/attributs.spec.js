// Here are unit tests for verifying:
// the correct rendering of data attributes
// used by the TwicPics script for TwicImg and TwicVideo components.

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
    testCases.push(
        {
            description: `${ component.name } should render data-twic-bot`,
            fn: async ( page, port ) => {
                const params = {
                  media: component.media,
                  src: getSrc( component.media ),
                  bot: `cover=100x100`
                };
            
                await goto( { page, params, port } );

                const assetData = await getAssetData ( page, assetSelector( component.media ) );
                // asset should have data-twic-bot
                expect( assetData[ 'data-twic-bot' ] ).toEqual( `cover=100x100` );
            },
        },
    );
    testCases.push(
        {
            description: `${ component.name } should render data-twic-eager`,
            fn: async ( page, port ) => {
                const params = {
                  media: component.media,
                  src: getSrc( component.media ),
                  eager: true
                };
            
                await goto( { page, params, port } );

                const assetData = await getAssetData ( page, assetSelector( component.media ) );
                // asset should have data-twic-eager
                expect( assetData[ 'data-twic-eager' ] ).not.toBe( null );
            },
        },
    );
    testCases.push(
        {
            description: `${ component.name } should render data-twic-intrinsic`,
            fn: async ( page, port ) => {
                const params = {
                  media: component.media,
                  src: getSrc( component.media ),
                  intrinsic: `1234x5678`
                };
            
                await goto( { page, params, port } );

                const assetData = await getAssetData ( page, assetSelector( component.media ) );
                // asset should have data-twic-intrinsic
                expect( assetData[ 'data-twic-intrinsic' ] ).toEqual( `1234x5678` );
            },
        },
    );
    testCases.push(
        {
            description: `${ component.name } should render data-twic-src`,
            fn: async ( page, port ) => {
                const params = {
                  media: component.media,
                  src: getSrc( component.media ),
                };
            
                await goto( { page, params, port } );

                const assetData = await getAssetData ( page, assetSelector( component.media ) );
                // asset should have data-twic-src
                expect( assetData[ 'data-twic-src' ] ).toEqual( `media:${ getSrc( component.media ) }` );
            },
        },
    );
    testCases.push(
        {
            description: `${ component.name } should render data-twic-step`,
            fn: async ( page, port ) => {
                const params = {
                  media: component.media,
                  src: getSrc( component.media ),
                  step: 400
                };
            
                await goto( { page, params, port } );

                const assetData = await getAssetData ( page, assetSelector( component.media ) );
                // asset should have data-twic-step
                expect( assetData[ 'data-twic-step' ] ).toEqual( `400` );
            },
        },
    );
    testCases.push(
        {
            description: `${ component.name } should render data-twic-transform`,
            fn: async ( page, port ) => {
                const params = {
                  media: component.media,
                  src: getSrc( component.media ),
                  preTransform: `flip=x`
                };
            
                await goto( { page, params, port } );

                const assetData = await getAssetData ( page, assetSelector( component.media ) );
                // asset should have data-twic-transform
                expect( assetData[ 'data-twic-transform' ] ).toEqual( `/flip=x/*` );
            },
        },
    );
    if ( component.media === `video` ) {
        testCases.push(
          {
              description: `${ component.name } should render data-twic-poster and data-twic-poster-transform`,
              fn: async ( page, port ) => {
                  const params = {
                    media: component.media,
                    src: getSrc( component.media ),
                    preTransform: `flip=x`
                  };
              
                  await goto( { page, params, port } );

                  const assetData = await getAssetData ( page, assetSelector( component.media ) );
                  // should have data-twic-transform
                  expect( assetData[ 'data-twic-transform' ] ).toEqual( `/flip=x/*` );
                  // should have data-twic-poster
                  expect( assetData[ 'data-twic-poster' ] ).toEqual( `media:${ getSrc( component.media ) }` );
                  // should have data-twic-poster-transform
                  expect( assetData[ 'data-twic-poster-transform' ] ).toEqual( `/flip=x/*/output=image` );
              },
          },
        );
        testCases.push( {
            description: `${ component.name } should render attributes in relation with from `,
            fn: async ( page, port ) => {
                const params = {
                    media: component.media,
                    src: getSrc( component.media ),
                    from: `15.4`
                };
            
                await goto( { page, params, port } );

                const assetData = await getAssetData ( page, assetSelector( component.media ) );
                // should have data-twic-transform
                expect( assetData[ 'data-twic-transform' ] ).toEqual( `/from=15.4/*` );
                // should have data-twic-poster
                expect( assetData[ 'data-twic-poster' ] ).toEqual( `media:${ getSrc( component.media ) }` );
                // should have data-twic-poster-transform
                expect( assetData[ 'data-twic-poster-transform' ] ).toEqual( `/from=15.4/*/output=image` );
            } },
        );
        testCases.push( {
            description: `${ component.name } should render attributes in relation with to `,
            fn: async ( page, port ) => {
                const params = {
                  media: component.media,
                  src: getSrc( component.media ),
                  to: `16.6`
                };
            
                await goto( { page, params, port } );

                const assetData = await getAssetData ( page, assetSelector( component.media ) );
                // should have data-twic-transform
                expect( assetData[ 'data-twic-transform' ] ).toEqual( `/to=16.6/*` );
                // should have data-twic-poster
                expect( assetData[ 'data-twic-poster' ] ).toEqual( `media:${ getSrc( component.media ) }` );
                // should have data-twic-poster-transform
                expect( assetData[ 'data-twic-poster-transform' ] ).toEqual( `/*/output=image` );
            },
          },
      );
      testCases.push(
          {
              description: `${ component.name } should render attributes in relation with from and to `,
              fn: async ( page, port ) => {
                  const params = {
                    media: component.media,
                    src: getSrc( component.media ),
                    from: `15.4`,
                    to: `16.6`
                  };
              
                  await goto( { page, params, port } );

                  const assetData = await getAssetData ( page, assetSelector( component.media ) );
                  // should have data-twic-transform
                  expect( assetData[ 'data-twic-transform' ] ).toEqual( `/from=15.4/to=16.6/*` );
                  // should have data-twic-poster
                  expect( assetData[ 'data-twic-poster' ] ).toEqual( `media:${ getSrc( component.media ) }` );
                  // should have data-twic-poster-transform
                  expect( assetData[ 'data-twic-poster-transform' ] ).toEqual( `/from=15.4/*/output=image` );
              },
          },
      );
      testCases.push(
          {
              description: `${ component.name } should render attributes in relation with from and duration `,
              fn: async ( page, port ) => {
                  const params = {
                    media: component.media,
                    src: getSrc( component.media ),
                    from: `15.4`,
                    duration: `1.2`
                  };
              
                  await goto( { page, params, port } );

                  const assetData = await getAssetData ( page, assetSelector( component.media ) );
                  // should have data-twic-transform
                  expect( assetData[ 'data-twic-transform' ] ).toEqual( `/from=15.4/duration=1.2/*` );
                  // should have data-twic-poster
                  expect( assetData[ 'data-twic-poster' ] ).toEqual( `media:${ getSrc( component.media ) }` );
                  // should have data-twic-poster-transform
                  expect( assetData[ 'data-twic-poster-transform' ] ).toEqual( `/from=15.4/*/output=image` );
              },
          },
      );
    }
} );

describe( `Attributes test`, () => {
    setupUnitTests( units, testCases );
} );
