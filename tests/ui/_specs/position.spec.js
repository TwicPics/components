// Here are unit tests for verifying:
// the correct functionality of the "position" property in the TwicImg, TwicVideo and TwicPicture component.

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
        // position should only be consider when using mode=contain
        testCases.push( {
            description: `${
                component.name
            } should ${
                mode === `cover` ? ` 
                not `: ``
            }take position into account when mode = ${
                mode
            }.`,
            fn: async ( page, port ) => {
                const params = {
                    component: component.name,
                    src: getSrc( component.name ),
                    mode: mode,
                    position: `right`
                };
            
                await goto( { page, params, port } );

                const assetData = await getAssetData ( page, assetSelector( component.media ) );
                if ( component.name === `TwicPicture` ) {
                    // should only exist when using mode = contain
                    expect( /inside=\d{1,9}x\d{1,9}@right/.test ( assetData[ 'src' ] ) ).toBe( mode === `contain` );
                } else {
                    const placeholderData = await getPlaceholderData ( page, placeholderSelector( component.media ) );
                    // should only exist when using mode = contain
                    expect( assetData[ 'object-position' ] === `100% 50%` ).toBe( mode === `contain` );
                    expect( ( placeholderData[ 'background-position' ] ) === `100% 50%` ).toBe( mode === `contain` );
                }
            },
        } );
    } );
    testCases.push( {
        description: `${ component.name } should ignore anchor when position is set.`,
        fn: async ( page, port ) => {
            const params = {
                component: component.name,
                src: getSrc( component.name ),
                mode: `contain`,
                position: `right`,
                anchor: `left`
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            if ( component.name === `TwicPicture` ) {
                // position should take precedence over anchor
                expect( /inside=\d{1,9}x\d{1,9}@right/.test ( assetData[ 'src' ] ) ).toBe( true );
                expect( /inside=\d{1,9}x\d{1,9}@left/.test ( assetData[ 'src' ] ) ).toBe( false );
            } else {
                const placeholderData = await getPlaceholderData ( page, placeholderSelector( component.media ) );
                // position should take precedence over anchor
                expect( assetData[ 'object-position' ] === `100% 50%` ).toBe( true );
                expect( ( placeholderData[ 'background-position' ] ) === `100% 50%` ).toBe( true );
                expect( assetData[ 'object-position' ] === `0% 50%` ).toBe( false );
                expect( ( placeholderData[ 'background-position' ] ) === `0% 50%` ).toBe( false );
            }
        },
    } );
} );


describe( `Position property test`, () => {
    setupUnitTests( testCases );
} );
