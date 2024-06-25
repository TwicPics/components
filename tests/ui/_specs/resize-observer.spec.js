// Here are unit tests for verifying:
// the correct functionality of the "resize observer".

import { describe, expect } from 'vitest';
import { assetSelector, placeholderSelector } from '../domSelector.js';
import { getAssetData, getPlaceholderData, getSrc, goto, setupUnitTests } from '../helpers.js';

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

const twicRatioValues = [
  {
      className: 'default',
      ratio: 1,
      ratioAfterResize : 1,
  },
  {
      className: 'style-driven',
      ratio: 1,
      ratioAfterResize : 3/4,
  },
];

const testCases = [];
components.forEach( component => {
    twicRatioValues.forEach( twicRatioValue => {
        const { className, ratio, ratioAfterResize } = twicRatioValue;
        testCases.push( {
            description: `${
                component.name 
            } should display a correct aspec-ratio for LQIP after resizing viewport when using class= ${
                className
            }.`,
            fn: async ( page, port ) => {
                const params = {
                    component: component.name,
                    src: getSrc( component.name ),
                    containerClass: className,
                };
            
                await goto( { page, params, port } );

                const assetData = await getAssetData (
                      page, 
                      assetSelector( component.media )
                );
                const placeholderData = await getPlaceholderData (
                    page, 
                    placeholderSelector( component.media )
                );

                expect( assetData[ 'aspect-ratio' ] ).toBeCloseTo( eval ( ratio ), 2 );
                expect( placeholderData[ 'aspect-ratio' ] ).toBeCloseTo( eval ( ratio ), 2 );

                await page.setViewport({
                    width: 200,
                    height: 200,
                    deviceScaleFactor: 1,
                });

                await new Promise( ( resolve ) => setTimeout( resolve, 500 ) );

                const assetDataAfterResize = await getAssetData (
                    page,
                    assetSelector( component.media )
                );
                const placeholderDataAfterResize = await getPlaceholderData (
                    page,
                    placeholderSelector( component.media )
                );
                
                // we should have correct aspect-ratio after resizeing
                expect( assetDataAfterResize[ 'aspect-ratio' ] ).
                    toBeCloseTo( eval ( ratioAfterResize ), 2 );

                expect( placeholderDataAfterResize[ 'aspect-ratio' ] ).
                    toBeCloseTo( eval ( ratioAfterResize ), 2 );

                // we should have the same placeholder dimensions
                // when aspect-ratio os the same before and after resizing
                expect(
                    ( placeholderDataAfterResize.width === placeholderData.width ) &&
                    ( placeholderDataAfterResize.height === placeholderData.height )
                ).toBe( ratioAfterResize === ratio );
            },
        } );
    } )
} );


describe( `Resize Observer test`, () => {
    setupUnitTests( testCases );
} );
