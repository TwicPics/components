
// Here are unit tests for verifying:
// the correct functionality of the "style" property in the TwicImg, TwicVideo and TwicPicture components.

import { describe, expect } from 'vitest';
import { hostSelector, wrapperSelector } from '../domSelector.js';
import { getHostElementData, getSrc, getWrapperData, goto, setupUnitTests } from '../helpers.js';

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

const getClassAttribute = framework => ( framework === `react` || framework === `next` ) ? `className` : `class`;

const testCases = [];
components.forEach( component => {
    testCases.push( {
        description: `${ component.name } should render correct class attribute when no additional class is provided`,
        fn: async ( page, port, framework ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
            };

            await goto( { page, params, port } );

            const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );
            const hostClass = hostElementData[ 'class' ] ?? '';

            let expectedClass = framework === `angular` ? `twic-i twic-d` : `twic-i`;
            if ( component.name === `TwicPicture` && framework === `angular` ) {
                expectedClass = ``;
            }
            expect( hostClass.trim() ).toBe( expectedClass );
        },
    } );
    testCases.push( {
        description: `${ component.name } should render correct class attribute when additional class is provided`,
        fn: async ( page, port, framework ) => {
            const _class = `test-class`;
            const params = {
                component: component.name,
                src: getSrc( component.name ),
            };
            params[ getClassAttribute(framework) ]= _class;

            await goto( { page, params, port } );

            const hostElementData = await getHostElementData ( page, hostSelector( component.media ) );

            const hostClass = hostElementData[ 'class' ] ?? '';
            
            expect( hostClass ).toContain( _class);
        }
    } );
    testCases.push( {
        description: `${ component.name } should not apply additional class to wrapper element`,
        fn: async ( page, port, framework ) => {
            const _class = `test-class`;
            const params = {
                component: component.name,
                src: getSrc( component.name ),
            };
            params[ getClassAttribute(framework) ]= _class;

            await goto( { page, params, port } );

            const wrapperData = await getWrapperData ( page, wrapperSelector() );

            const wrapperClass = wrapperData[ 'class' ] ?? '';
            
            expect( wrapperClass ).not.toContain( _class);
        }
    } );
} );

describe( `Class property test`, () => {
    setupUnitTests( testCases );
} );
