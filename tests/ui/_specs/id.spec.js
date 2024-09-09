// Here are unit tests for verifying:
// the correct functionality of the "id" property in the TwicImg, TwicVideo and TwicPicture components.

import { describe, expect } from 'vitest';
import { hostSelector } from '../domSelector.js';
import { getHostElementData, getSrc, goto, setupUnitTests } from '../helpers.js';

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
        description: `${ component.name } should not render any id attribute`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
            };
        
            await goto( { page, params, port } );

            const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );
            expect( hostElementData[ 'id' ] ).toBe( null );
        },
    } );
    testCases.push( {
        description: `${ component.name } should render id attribute`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              id: "my-id"
            };
        
            await goto( { page, params, port } );

            const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );
            expect( hostElementData[ 'id' ] ).toBe( "my-id" );
        }
    } );
} );

describe( `Id property test`, () => {
    setupUnitTests( testCases );
} );