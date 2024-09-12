// Here are unit tests for verifying:
// the correct functionality of the "referrerpolicy" property in the TwicImg, TwicVideo and TwicPicture components.

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
        description: `${ component.name } should not render any referrerpolicy attribute`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'referrerpolicy' ] ).toBe( null );
        },
    } );
    testCases.push( {
        description: `${ component.name } should render referrerpolicy attribute`,
        fn: async ( page, port, framework ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
            };
            const referrerpolicy = `no-referrer`;
            if ( framework === `react` || framework === `next` ) {
                params[ `referrerPolicy` ] = referrerpolicy;
            } else {
                params[ `referrerpolicy` ] = referrerpolicy;
            }
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'referrerpolicy' ] ).toBe( referrerpolicy );
        }
    } );
} );

describe( `Referrerpolicy property test`, () => {
    setupUnitTests( testCases );
} );