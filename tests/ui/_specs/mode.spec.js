// Here are unit tests for verifying:
// the correct functionality of the "mode" property in the TwicImg, TwicVideo and TwicPicture component.

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

const modes = [ ``, `cover`, `contain`];

const testCases = [];
components.forEach( component => {
    modes.forEach( mode => {
        testCases.push( {
            description: `${ component.name } should display an image with mode= ${ mode == `` ? `cover by default` : mode }.`,
            fn: async ( page, port ) => {
                const params = {
                    component: component.name,
                    src: getSrc( component.name ),
                    mode: mode,
                };
            
                await goto( { page, params, port } );

                const assetData = await getAssetData ( page, assetSelector( component.media ) );
                if ( component.name === `TwicPicture`) {
                    const expected = mode === ``? `cover`: ( mode === `contain` ? `inside` : mode );
                    expect( assetData[ 'src' ] ).toContain( `${ expected }=` );
                } else {
                    const expected = mode || `cover`;
                    const placeholderData = await getPlaceholderData ( page, placeholderSelector( component.media ) );
                    expect( assetData[ 'object-fit' ] ).toEqual( expected );
                    expect( placeholderData[ 'background-size' ] ).toEqual( expected );
                }
            },
        } );
    } )
} );


describe( `Mode property test`, () => {
    setupUnitTests( testCases );
} );
