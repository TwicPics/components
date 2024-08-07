// Here are unit tests for verifying:
// the correct functionality of the "tabindex" property in the TwicImg, TwicVideo and TwicPicture components.

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
        description: `${ component.name } should not render any tabindex attribute`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
            };
        
            await goto( { page, params, port } );

            const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );
            expect( hostElementData[ 'tabindex' ] ).toBe( null );
        },
    } );
    testCases.push( {
        description: `${ component.name } should not render any tabindex attribute when empty is passed`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              tabindex: ``
            };
        
            await goto( { page, params, port } );

            const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );
            expect( hostElementData[ 'tabindex' ] ).toBe( null );
        }
    } );
    testCases.push( {
        description: `${ component.name } should not render any tabindex attribute when invalid is passed`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              tabindex: `in valid`
            };
        
            await goto( { page, params, port } );

            const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );
            expect( hostElementData[ 'tabindex' ] ).toBe( null );
        }
    } );
    testCases.push( {
        description: `${ component.name } should render tabindex attribute when valid`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              tabindex: " 23 "
            };
        
            await goto( { page, params, port } );

            const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );
            expect( hostElementData[ 'tabindex' ] ).toBe( "23" );
        }
    } );
} );

describe( `Tabindex property test`, () => {
    setupUnitTests( testCases );
} );
