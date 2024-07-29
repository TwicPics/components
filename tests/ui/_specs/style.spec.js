// Here are unit tests for verifying:
// the correct functionality of the "style" property in the TwicImg, TwicVideo and TwicPicture components.

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
        description: `${ component.name } should not render any style attribute when empty is passed`,
        excluded: [ `nuxt` ],
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              style: ``
            };
        
            await goto( { page, params, port } );

            const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );
            expect( hostElementData[ 'style' ] ).toBe( null );
        }
    } );
    testCases.push( {
        description: `${ component.name } should not render any style attribute when invalid is passed`,
        excluded: [ `nuxt` ],
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              style: ` invalid`
            };
        
            await goto( { page, params, port } );

            const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );
            expect( hostElementData[ 'style' ] ).toBe( null );
        }
    } );
    testCases.push( {
        description: `${ component.name } should render id attribute when valid`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              ratio: `none`,
              style: "height:300px;width:100px"
            };
        
            await goto( { page, params, port } );

            const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );
            expect( hostElementData[ 'style' ] ).toBe( "height: 300px; width: 100px;" );
        }
    } );
} );

describe( `Style property test`, () => {
    setupUnitTests( testCases );
} );
