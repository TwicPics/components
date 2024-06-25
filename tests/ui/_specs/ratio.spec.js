// Here are unit tests for verifying:
// the correct functionality of the "ratio" property in the TwicImg, TwicVideo and TwicPicture component.

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
  {
      media: `picture-img`,
      name: `TwicPicture`
  }
];

const ratios = [ ``, `4/3`, `3/4`];

const testCases = [];
components.forEach( component => {
    ratios.forEach( ratio => {
        testCases.push( {
            description: `${ component.name } should display an image with ratio= ${ ratio == `` ? `1 by default` : ratio }.`,
            fn: async ( page, port ) => {
                const params = {
                    component: component.name,
                    src: getSrc( component.name ),
                    ratio: ratio,
                };
            
                await goto( { page, params, port } );

                const assetData = await getAssetData ( page, assetSelector( component.media ) );
                expect( assetData[ 'aspect-ratio' ] ).toBeCloseTo( eval ( ratio || 1 ), 2 );

                if ( component.name !== `TwicPicture` ) {
                    const placeholderData = await getPlaceholderData ( page, placeholderSelector( component.media ) );
                    expect( placeholderData[ 'aspect-ratio' ] ).toBeCloseTo( eval ( ratio || 1 ), 2 );
                }
            },
        } );
    } )
} );


describe( `Ratio property test`, () => {
    setupUnitTests( testCases );
} );
