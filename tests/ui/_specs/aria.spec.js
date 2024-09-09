// Here are unit tests for verifying:
// the correct functionality of the "aria" property in the TwicImg and TwicPicture components.

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
    if (component.name === `TwicVideo`) {
        testCases.push( {
          description: `${ component.name } should not render any role nor aria-label attribute`,
          fn: async ( page, port ) => {
              const params = {
                component: component.name,
                src: getSrc( component.name ),
              };
          
              await goto( { page, params, port } );

              const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );
              expect( hostElementData[ 'role' ] ).toBe( null );
              expect( hostElementData[ 'aria-label' ] ).toBe( null );
          },
      } );
    } else {
          testCases.push( {
            description: `${ component.name } role should default to img`,
            fn: async ( page, port ) => {
                const params = {
                  component: component.name,
                  src: getSrc( component.name ),
                };
            
                await goto( { page, params, port } );

                const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );
                expect( hostElementData[ 'role' ] ).toBe( `img` );
            },
        } );
    }
    testCases.push( {
      description: `${ component.name } should not render any role`,
      fn: async ( page, port ) => {
          const params = {
            component: component.name,
            src: getSrc( component.name ),
            role: '',
          };
      
          await goto( { page, params, port } );

          const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );
          expect( hostElementData[ 'role' ] ).toBe( null );
          expect( hostElementData[ 'aria-label' ] ).toBe( null );
      },
    } );
    testCases.push( {
        description: `${ component.name } should render defined role`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              role: "givenRole"
            };
        
            await goto( { page, params, port } );

            const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );
            expect( hostElementData[ 'role' ] ).toBe( `givenRole` );
        }
    } );
    testCases.push( {
        description: `${ component.name } should render aria-label`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              "aria-label": `my-aria-description`
            };
        
            await goto( { page, params, port } );

            const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );
            expect( hostElementData[ 'aria-label' ] ).toBe( `my-aria-description` );
        }
    } );
} );

describe( `Aria property test`, () => {
    setupUnitTests( testCases );
} );