// Here are unit tests for verifying:
// the correct functionality of the "refit" property in the TwicImg and TwicPicture component.

import { describe, expect } from 'vitest';
import { assetSelector, placeholderSelector } from '../domSelector.js';
import { getAssetData, getPlaceholderData, getSrc, goto, setupUnitTests } from '../helpers.js';

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

const modes = [ `cover`, `contain`];
const paddings = [ ``, `5p` ];
const anchors = [ ``, `left`]

const testCases = [];
components.forEach( component => {
    modes.forEach( mode => {
        paddings.forEach( padding => {
            const paddingSuffix = padding ? ` with padding` : '';
            anchors.forEach( anchor => {
                const anchorSuffix = anchor ? ` with anchor = ${ anchor }` : '';
                testCases.push( {
                    description: `${
                        component.name
                    } should reframe the image${
                        paddingSuffix
                    }${
                        anchorSuffix 
                    } when mode= ${ mode }.`,
                    fn: async ( page, port ) => {
                        const params = {
                            component: component.name,
                            src: getSrc( component.name ),
                            anchor: anchor,
                            mode: mode,
                            refit: padding
                        };
                    
                        await goto( { page, params, port } );

                        const assetData = await getAssetData ( page, assetSelector( component.media ) );
                        if ( component.name === `TwicPicture`) {
                            expect( assetData[ 'src' ] ).
                                toMatch( mode === `cover` ?
                                    new RegExp( `\\/refit=(\\d+)x(\\d+)${
                                        padding ? `\\(${ padding }\\)` : '' 
                                    }${
                                        anchor ? `@left` : ``
                                    }` ) :
                                    new RegExp( `\\/refit=auto${
                                        padding ? `\\(${ padding }\\)` : '' 
                                    }\\/inside=(\\d+)x(\\d+)` )
                                );
                        } else {
                            const placeholderData = await getPlaceholderData ( page, placeholderSelector( component.media ) );
                            expect( assetData[ 'data-twic-transform' ] ).
                                toEqual( mode === `cover` ?
                                    `/refit=WxH${ padding ? `(${ padding })` : ``}${ anchor ? `@${ anchor }` : ``}`:
                                    `/refit=auto${ padding ? `(${ padding })` : ``}/*`
                                );
                            expect( placeholderData[ 'background-image' ] ).
                                toMatch( mode === `cover` ?
                                    new RegExp( `\\/refit=(\\d+)x(\\d+)${
                                        padding ? `\\(${ padding }\\)` : '' 
                                    }${
                                        anchor ? `@left` : ``
                                    }` ) :
                                    new RegExp( `\\/refit=auto${
                                        padding ? `\\(${ padding }\\)` : '' 
                                    }\\/contain=(\\d+)x(\\d+)` )
                              );
                        }
                    },
                } );
            } )
        } )
    } )
} );


describe( `Refit property test`, () => {
    setupUnitTests( testCases );
} );
