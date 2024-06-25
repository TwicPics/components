// Here are unit tests for verifying:
// - the correct HTML rendering of TwicImg, TwicVideo and TwicPicture 
// - with and without placeholders,
// - data attributes for simple cases
import { describe, expect } from 'vitest';
import { assetSelector, placeholderSelector } from '../domSelector.js';
import { getAssetData, goto, setupUnitTests } from '../helpers.js';

const testCases = [
    {
        description: 'TwicImg should render correct HTML',
        fn: async ( page, port ) => {
            const params = {
              src: 'football.jpg',
            };
            const _assetSelector = assetSelector( `img` );

            await goto( { page, params, port } );

            const asset = await page.$$( _assetSelector );
            const placeholder = await page.$$( placeholderSelector( `img` ));
            // should have only one img
            expect( asset ).toHaveLength( 1 );
            // should have a div for lqip
            expect( placeholder ).toHaveLength( 1 );

            const assetData = await getAssetData ( page, _assetSelector );
            // img should have data-twic-src
            expect( assetData['data-twic-src'] ).toEqual( `media:football.jpg` );
        },
    },
    {
        description: 'TwicVideo should render correct HTML',
        fn: async ( page, port ) => {
            const params = {
              src: 'video/skater.mp4',
              component: 'TwicVideo',
            };
            const _assetSelector = assetSelector( `video` );
            
            await goto( { page, params, port } );
            
            const asset = await page.$$( _assetSelector );
            const placeholder = await page.$$( placeholderSelector( `video` ));
            // should have only one video
            expect( asset ).toHaveLength( 1 );
            // should have a div for lqip 
            expect( placeholder ).toHaveLength( 1 );

            const assetData = await getAssetData ( page, _assetSelector );
            // video should have data-twic-src
            expect( assetData['data-twic-src'] ).toEqual( `media:video/skater.mp4` );
            // video should have data-twic-poster
            expect( assetData['data-twic-poster'] ).toEqual( `media:video/skater.mp4` );
            // video should have data-twic-poster-transform
            expect( assetData['data-twic-poster-transform'] ).toEqual( `/*/output=image` );
        },
    },
    {
        description: 'TwicPicture should render correct HTML',
        fn: async (page, port ) => {
            const params = {
                src: 'football.jpg',
                component: 'TwicPicture',
            };
            const imgSelector = assetSelector( `picture-img` );
            
            await goto( { page, params, port } );
            
            const img = await page.$$( imgSelector );
            const source = await page.$$( assetSelector( `picture-source` ) );
            // there should have only one img
            expect( img ).toHaveLength( 1 );
            // there should not have source
            expect( source ).toHaveLength( 0 );
            
            const assetData = await getAssetData ( page, imgSelector );
            // there should not have data-twic-src
            expect( assetData['data-twic-src'] ).toBeFalsy();
            // there should have src
            expect( assetData['src'] ).toBeTruthy();
            // there should have src
            expect( assetData['srcset'] ).toBeTruthy();
        },
    },
    {
      description: 'TwicPicture should render correct HTML for responsive design',
      fn: async (page, port ) => {
          const params = {
              src: 'football.jpg',
              component: 'TwicPicture',
              ratio: '@md 4/3 @lg 3'
          };
          await goto( { page, params, port } );
          
          const imgSelector = assetSelector( `picture-img` );
          const sourceSelector = assetSelector ( `picture-source` );
          
          const img = await page.$$( imgSelector );
          const source = await page.$$( sourceSelector );
          // there should have only one img
          expect( img ).toHaveLength( 1 );
          // there should have 2 sources
          expect( source ).toHaveLength( 2 );
          
          const imgData =  await getAssetData ( page, imgSelector );
          // there should not have data-twic-src
          expect( imgData['data-twic-src'] ).toBeFalsy();
          // there should have src
          expect( imgData['src'] ).toBeTruthy();
          // there should have src
          expect( imgData['srcset'] ).toBeTruthy();

          const sourceData = await getAssetData ( page, sourceSelector );
          // there should not have data-twic-src
          expect( sourceData['data-twic-src'] ).toBeFalsy();
          // there should not have src
          expect( sourceData['src'] ).toBeFalsy();
          // there should have src
          expect( sourceData['srcset'] ).toBeTruthy();
      },
  },
];
describe( `Rendering test`, () => {
    setupUnitTests( testCases );
})
