// Here are unit tests for verifying:
// the correct functionality of the "src" property in the TwicImg and TwicVideo component.

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
            component.name !== `TwicPicture` ? `render data-twic-src` : `call API using given src`
        }`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            if ( component.name !== `TwicPicture` ) {
                // asset should have data-twic-src
                expect( assetData[ 'data-twic-src' ] ).toEqual( `media:${ getSrc( component.name ) }` );
            } else {
                // actual URL must contain the requested src
                const [ _, _src ] = (
                    assetData[ 'src' ].match( /https:\/\/demo\.twic\.it\/(.*?)(\?)twic=v1\/cover=(\d*)x(\d*)/ ) ||
                    [] 
                );
                expect( _src ).toEqual( getSrc( component.name ) );
            }
        }
    } );
    if ( component.name !== `TwicPicture` ) {
      testCases.push( {
          description: `${ component.name } should render data-twic-src with red placeholder when no src provided`,
          fn: async ( page, port ) => {
              const params = {
                  component: component.name,
                  src: '',
              };

              await goto( { page, params, port } );

              const assetData = await getAssetData ( page, assetSelector( component.media ) );
              // asset should have data-twic-src
              expect( assetData[ 'data-twic-src' ] ).toEqual( `placeholder:red` );
          }
      } );
    }
} );

describe( `Src property test`, () => {
    setupUnitTests( testCases );
} );
