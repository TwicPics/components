// Here are unit tests for verifying:
// the correct functionality of the "anchor" property in the TwicImg, TwicVideo and TwicPicture component.

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
        testCases.push( {
            description: `${
                component.name
            } should positions asset in ${ mode } mode.`,
            fn: async ( page, port ) => {
                const params = {
                    component: component.name,
                    src: getSrc( component.name ),
                    mode: mode,
                    anchor: `left`
                };
            
                await goto( { page, params, port } );

                const assetData = await getAssetData ( page, assetSelector( component.media ) );
                if ( component.name === `TwicPicture` ) {
                    // src should contain /focus-left/ when using cover
                    // and inside= whateverWidthxwhateverHeight@left when using contain
                    expect( /\/focus=left\//.test( ( assetData[ 'src' ] ) ) ).toBe( mode === `cover` );
                    expect( /inside=\d{1,9}x\d{1,9}@left/.test ( assetData[ 'src' ] ) ).toBe( mode === `contain` );
                } else {
                  const placeholderData = await getPlaceholderData ( page, placeholderSelector( component.media ) );

                  // cover mode
                  expect( assetData[ 'data-twic-transform' ] === `/focus=left/*` ).toBe( mode === `cover` );
                  expect( /\/focus=left\//.test( ( placeholderData[ 'background-image' ] ) ) ).toBe( mode === `cover` );

                  // contain mode
                  expect( assetData[ 'object-position' ] === `0% 50%` ).toBe( mode === `contain` );
                  expect( ( placeholderData[ 'background-position' ] ) === `0% 50%` ).toBe( mode === `contain` );
                }
            },
        } );
    } );
    testCases.push( {
        description: `${ component.name } should apply anchor after preTransform.`,
        fn: async ( page, port ) => {
            const params = {
                component: component.name,
                src: getSrc( component.name ),
                anchor: `left`,
                preTransform: `flip=x`
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            if ( component.name === `TwicPicture`) {
                expect( ( assetData[ 'src' ] ).includes( `flip=x/focus=left/` ) ).toBe( true );
            } else {
              const placeholderData = await getPlaceholderData ( page, placeholderSelector( component.media ) );
              const assetData = await getAssetData ( page, assetSelector( component.media ) );
              expect( assetData[ 'data-twic-transform' ] === `/flip=x/focus=left/*` ).toBe( true );
              expect( ( placeholderData[ 'background-image' ] ).includes `flip=x/focus=left/` ).toBe( true );
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
              const assetData = await getAssetData ( page, assetSelector( component.media ) );
              expect( assetData[ 'data-twic-transform' ] === `/focus=auto/*` ).toBe( true );
              expect( ( placeholderData[ 'background-image' ] ).includes `focus=auto/` ).toBe( true );
            }
        },
    } );
} );


describe( `Anchor property test`, () => {
    setupUnitTests( testCases );
} );
