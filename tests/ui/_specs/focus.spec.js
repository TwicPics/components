// Here are unit tests for verifying:
// the correct functionality of the "focus" property in the TwicImg, TwicVideo and TwicPicture component.

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

const modes = [ `cover`, `contain`];

const testCases = [];
components.forEach( component => {
    modes.forEach( mode => {
        // focus should only be consider when using mode=cover
        testCases.push( {
            description: `${
                component.name
            } should ${
                mode === `contain` ? `not`: ``
            } take focus into account when mode = ${
                mode
            }.`,
            fn: async ( page, port ) => {
                const params = {
                    component: component.name,
                    src: getSrc( component.name ),
                    mode: mode,
                    focus: `auto`
                };
            
                await goto( { page, params, port } );

                const assetData = await getAssetData ( page, assetSelector( component.media ) );
                if ( component.name === `TwicPicture`) {
                    expect( ( assetData[ 'src' ] ).includes( `/focus=auto/` ) ).toBe( mode === `cover` );
                } else {
                  const placeholderData = await getPlaceholderData ( page, placeholderSelector( component.media ) );
                  const assetData = await getAssetData ( page, assetSelector( component.media ) );
                  expect(
                      assetData[ 'data-twic-transform' ] === ( mode === `cover` ? `/focus=auto/*` : null )
                  ).toBe( true );
                  expect( ( placeholderData[ 'background-image' ] ).includes `/focus=auto/` ).toBe( mode === `cover` );
                }
            },
        } );
    } );
    testCases.push( {
        description: `${ component.name } should apply focus after preTransform.`,
        fn: async ( page, port ) => {
            const params = {
                component: component.name,
                src: getSrc( component.name ),
                focus: `auto`,
                preTransform: `flip=x`
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            if ( component.name === `TwicPicture`) {
                expect( ( assetData[ 'src' ] ).includes( `flip=x/focus=auto/` ) ).toBe( true );
            } else {
              const placeholderData = await getPlaceholderData ( page, placeholderSelector( component.media ) );
              const assetData = await getAssetData ( page, assetSelector( component.media ) );
              expect( assetData[ 'data-twic-transform' ] === `/flip=x/focus=auto/*` ).toBe( true );
              expect( ( placeholderData[ 'background-image' ] ).includes `flip=x/focus=auto/` ).toBe( true );
            }
        },
    } );
    testCases.push( {
        description: `${ component.name } should ignore anchor when focus is set.`,
        fn: async ( page, port ) => {
            const params = {
                component: component.name,
                src: getSrc( component.name ),
                focus: `auto`,
                anchor: `left`
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            if ( component.name === `TwicPicture`) {
                expect( ( assetData[ 'src' ] ).includes( `focus=auto/` ) ).toBe( true );
            } else {
              const placeholderData = await getPlaceholderData ( page, placeholderSelector( component.media ) );
              expect( assetData[ 'data-twic-transform' ] === `/focus=auto/*` ).toBe( true );
              expect( ( placeholderData[ 'background-image' ] ).includes `focus=auto/` ).toBe( true );
            }
        },
    } );
} );


describe( `Focus property test`, () => {
    setupUnitTests( testCases );
} );
