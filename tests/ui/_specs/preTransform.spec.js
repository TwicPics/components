// Here are unit tests for verifying:
// the correct functionality of the "preTransform" property in the TwicImg, TwicVideo and TwicPicture component.

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
    testCases.push( {
        description: `${
            component.name
        } should ${
            component.name !== `TwicPicture` ? `render data-twic-transform` : `call API using given transformation`
        }`,
        fn: async ( page, port ) => {
            const params = {
                component: component.name,
                src: getSrc( component.name ),
                preTransform: `flip=x`
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );

            if ( component.name !== `TwicPicture` ) {
                expect( assetData[ 'data-twic-transform' ] ).toEqual( `/flip=x/*` );
            }

            if ( component.name === `TwicVideo` ) {
                expect( assetData[ 'data-twic-poster' ] ).toEqual( `media:${ getSrc( component.name ) }` );
                expect( assetData[ 'data-twic-poster-transform' ] ).toEqual( `/flip=x/*/output=image` );
            }

            if ( component.name === `TwicPicture` ) {
                // actual URL must contain the requested transformation
                expect( /\/flip=x\//.test( ( assetData[ 'src' ] ) ) ).toBe( true );
            }
        }
    } );
} );

describe( `PreTransform property test`, () => {
    setupUnitTests( testCases );
} );
