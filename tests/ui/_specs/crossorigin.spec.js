// Here are unit tests for verifying:
// the correct functionality of the "crossorigin" property in the TwicImg, TwicVideo and TwicPicture components.

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
        description: `${ component.name } should not render any crossorigin attribute`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'crossorigin' ] ).toBe( null );
        },
    } );
    testCases.push( {
        description: `${ component.name } should render crossorigin attribute`,
        fn: async ( page, port, framework ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
            };
            const crossorigin = `anonymous`;
            if ( framework === `react` || framework === `next` ) {
                params[ `crossOrigin` ] = crossorigin;
            } else {
                params[ `crossorigin` ] = crossorigin;
            }
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'crossorigin' ] ).toBe( crossorigin );
        }
    } );
} );

describe( `Crossorigin property test`, () => {
    setupUnitTests( testCases );
} );