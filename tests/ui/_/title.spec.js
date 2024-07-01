// Here are unit tests for verifying:
// the correct functionality of the "title" property in the TwicImg, TwicVideo and TwicPicture components.

import { describe, expect } from 'vitest';
import { wrapperSelector } from '../domSelector.js';
import { getSrc, getWrapperData, goto, setupUnitTests } from '../helpers.js';
import units from '../units.js';

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
    testCases.push(
        {
            description: `${ component.name } should render an empty title attribute`,
            fn: async ( page, port ) => {
                const params = {
                  media: component.media,
                  src: getSrc( component.media ),
                };
            
                await goto( { page, params, port } );

                const wrapperData = await getWrapperData ( page, wrapperSelector() );
                expect( wrapperData[ 'title' ] ).toBeUndefined();
            },
        },
    );
    testCases.push(
        {
            description: `${ component.name } should render the correct title attribute`,
            fn: async ( page, port ) => {
                const params = {
                  media: component.media,
                  src: getSrc( component.media ),
                  title: 'a title'
                };
            
                await goto( { page, params, port } );

                const wrapperData = await getWrapperData ( page, wrapperSelector() );
                expect( wrapperData[ 'title' ] ).toBe( `a title` );
            },
        },
    );
} );

describe( `Alt property test`, () => {
    setupUnitTests( units, testCases );
} );
