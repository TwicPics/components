// Here are unit tests for verifying:
// the correct functionality of the "decoding" property in the TwicImg, TwicVideo and TwicPicture components.

import { describe, expect } from 'vitest';
import { assetSelector } from '../domSelector.js';
import { getAssetData, getSrc, goto, setupUnitTests } from '../helpers.js';

let components = [
    {
        media: `img`,
        name: `TwicImg`
    },
    {
        media: `picture-img`,
        name: `TwicPicture`
    }
];

const testCases = [];
components.forEach( component => {
    testCases.push( {
        description: `${ component.name } should not render any decoding attribute`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'decoding' ] ).toBe( null );
        },
    } );
    testCases.push( {
        description: `${ component.name } should render decoding attribute`,
        fn: async ( page, port ) => {
            const decoding = `async`;
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              decoding,
            };

            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'decoding' ] ).toBe( decoding );
        }
    } );
} );

describe( `Decoding property test`, () => {
    setupUnitTests( testCases );
} );