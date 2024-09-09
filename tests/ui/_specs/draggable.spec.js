// Here are unit tests for verifying:
// the correct functionality of the "draggable" property in the TwicImg, TwicVideo and TwicPicture components.

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
        description: `${ component.name } should not render any draggable attribute`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
            };
        
            await goto( { page, params, port } );

            const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );
            expect( hostElementData[ 'draggable' ] ).toBe( null );
        },
    } );
    testCases.push( {
        description: `${ component.name } should render draggable true when boolean true is passed`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              draggable: true
            };
        
            await goto( { page, params, port } );

            const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );
            expect( hostElementData[ 'draggable' ] ).toBe( "true" );
        }
    } );
    testCases.push( {
        description: `${ component.name } should render draggable true when string true is passed`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              draggable: "true"
            };
        
            await goto( { page, params, port } );

            const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );
            expect( hostElementData[ 'draggable' ] ).toBe( "true" );
        }
    } );
    testCases.push( {
        description: `${ component.name } should render draggable false when boolean false is passed`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              draggable: false
            };
        
            await goto( { page, params, port } );

            const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );
            expect( hostElementData[ 'draggable' ] ).toBe( "false" );
        }
    } );
    testCases.push( {
        description: `${ component.name } should render draggable false when string false is passed`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              draggable: "false"
            };
        
            await goto( { page, params, port } );

            const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );
            expect( hostElementData[ 'draggable' ] ).toBe( "false" );
        }
    } );
} );

describe( `Draggable property test`, () => {
    setupUnitTests( testCases );
} );