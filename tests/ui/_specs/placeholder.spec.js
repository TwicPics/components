// Here are unit tests for verifying:
// the correct functionality of the "placeholder" property in the TwicImg, TwicVideo.
// background image computation should have been tested in common unit testing

import { describe, expect } from 'vitest';
import { placeholderSelector } from '../domSelector.js';
import { getPlaceholderData, getSrc, goto, setupUnitTests } from '../helpers.js';

let components = [
  {
      media: `img`,
      name: `TwicImg`
  },
  {
      media: `video`,
      name: `TwicVideo`
  },
];

const placeholders = [ ``, `none`, `maincolor`, `meancolor`, `preview` ];

const testCases = [];
components.forEach( component => {
    placeholders.forEach( p => {
        testCases.push( {
            description: `${
                component.name
            } should handle ${
                p == `` ? `default placeholder` : `placeholder= ${ p } `
            }.`,
            fn: async ( page, port ) => {
                const params = {
                  component: component.name,
                  src: getSrc( component.name ),
                  placeholder: p,
                };
            
                await goto( { page, params, port } );

                const placeholder = await page.$$( placeholderSelector( component.media ) );
                expect( placeholder ).toHaveLength( p === `none` ? 0 : 1 );
                if ( p !== `none` ) {
                    const placeholderData = await getPlaceholderData ( page, placeholderSelector( component.media ) );
                    expect (
                        placeholderData[ `background-image` ]
                    ).toEqual(
                        `https://demo.twic.it/${
                            getSrc( component.name ) 
                        }?twic=v1/cover=1000x1000/output=${
                            p || `preview`
                        }`
                    );
                }
            },
        } );
    } );
} );


describe( `Placeholder property test`, () => {
    setupUnitTests( testCases );
} );
