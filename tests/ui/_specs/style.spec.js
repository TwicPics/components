
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
        description: `${ component.name } should not render any style attribute`,
        excluded: [ `Nuxt3` ],
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
            };

            await goto( { page, params, port } );

            const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );
            expect( hostElementData[ 'style' ] ).toBe( null );
        },
    } );
    testCases.push( {
        description: `${ component.name } should render correct style`,
        fn: async ( page, port, framework ) => {
            const params = {
                component: component.name,
                src: getSrc( component.name ),
                ratio: `none`,
            };

            if ( framework === `react` || framework === `next` ) {
                params[ `style` ]= {height:"300px",width:"100px"}
            } else {
                params[ `style` ]= "height:300px;width:100px;"
            }
        
            await goto( { page, params, port } );

            const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );
            const resultStyle = hostElementData[ 'style' ];
            expect(
                resultStyle ?
                resultStyle.replaceAll(/\s+/g, '') :
                resultStyle 
            ).toBe( "height:300px;width:100px;");
        }
    } );
    if ( component.name === `TwicImg` ) {
      testCases.push( {
          description: `${ component.name } should render correct style with zoom`,
          excluded: [ `Angular` ],
          fn: async ( page, port, framework ) => {
              const params = {
                component: component.name,
                src: getSrc( component.name ),
                zoom: 2,
                ratio: `none`,
              };

              if ( framework === `react` || framework === `next` ) {
                  params[ `style` ]= {height:"300px",width:"100px"}
              } else {
                  params[ `style` ]= "height:300px;width:100px;"
              }
          
              await goto( { page, params, port } );

              const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );
              const result = hostElementData[ 'style' ] ?
                  hostElementData[ 'style' ].replaceAll( /\s+/g ,'' ):
                  ``;
              
              const rStyle = /height:300px;width:100px;/;
              const rZoom = /--twic-zoom:2;/;
              expect(
                  result &&
                  rStyle.test( result ) && 
                  rZoom.test( result )
              ).toBe( true );
          }
      } );
    }
} );

describe( `Style property test`, () => {
    setupUnitTests( testCases );
} );
