// Here are unit tests for verifying:
// the correct functionality of the "zoom" property in the TwicImg component.
// The test simply checks the presence of the html fields and the zoom factor.
// No simulation of mouse movement (this part is tested in common unit tests see tests/common/src/_/magnifier.spec.ts)

import { describe, expect } from 'vitest';
import { getBackgoundImageData, getSrc, goto, setupUnitTests } from '../helpers.js';

const testCases = [];
const placeholders = [ `preview`, `none` ];
const zoomFactor = 2;
placeholders.forEach( placeholder => {
    testCases.push( {
        description: `TwicImg should render correct HTML template when using zoom with placeholder = ${ placeholder }`,
        fn: async ( page, port ) => {
            const params = {
              component: `TwicImg`,
              src: getSrc( `TwicImg` ),
              zoom: zoomFactor,
              placeholder: placeholder
            };
        
            await goto( { page, params, port } );

            const wrapper = await page.$$( `div.twic-z, twicimg.twic-z` );

            await page.waitForSelector('.twic-done');

            await page.mouse.move( 200, 200 )
            await page.waitForSelector('.twic-background-done');

            // should have a twic-z wrapper
            expect( wrapper ).toHaveLength( 1 );

            if (wrapper.length > 0) {
                const actualWrapper = wrapper [0];
                const result = await page.evaluate( wrapper => {

                    // zoom value is stored as a style on the first twicmedia (angular) or in the wrapper itself
                    const zoomFactorHandler = wrapper.querySelector( 'twicmedia' ) || wrapper;
                    const zoomFactor = zoomFactorHandler &&
                        window.getComputedStyle( zoomFactorHandler )?.getPropertyValue( `--twic-zoom` );

                    // looking for the magnified image wrapper
                    const magnifiedWrapper = wrapper.querySelector(
                        'div.twic-m, twicmedia div.twic-m'
                    );

                    // looking for the non magnified image wrapper
                    const actualImageWrapper = wrapper.querySelector(
                        'div.twic-m ~ div.twic-w , twicmedia ~ twicmedia div.twic-w'
                    );

                    // we should have 2 div to describe the magnified elements
                    const magnifiedElements = magnifiedWrapper?.querySelectorAll( `div` );
                    // the first handles the magnified image as a background image
                    const magnifiedImage = magnifiedElements && magnifiedElements[ 0 ];
                    const magnifiedImageStyles = magnifiedImage && window.getComputedStyle( magnifiedImage );

                    // the actual image
                    const actualImage = actualImageWrapper?.querySelector( `img` );
                    // and its placeholder
                    const actualImagePlaceholder = actualImageWrapper?.querySelector( `div` );

                    // actual image displayed dimensions
                    const rect = actualImage && actualImage.getBoundingClientRect();

                    return {
                        actualImage:{
                            dataTwicSrc : actualImage &&
                                actualImage?.getAttribute( 'data-twic-src' ),
                            src: actualImage?.src,
                            lqip: !!actualImagePlaceholder,
                            wrapper: !!actualImageWrapper,
                            height: rect?.height,
                            width: rect?.width,
                        },
                        magnifiedImage: {
                            backgroundImage: magnifiedImageStyles?.
                                getPropertyValue( `background-image` ),
                            dataTwicBackground : magnifiedImage &&
                                magnifiedImage?.getAttribute( 'data-twic-background' ),
                            nbElements: magnifiedElements.length,
                            wrapper: !!magnifiedWrapper,
                            zoomFactor
                        },
                    };
                }, actualWrapper );

                const { actualImage, magnifiedImage } = result;

                //////// non magnified image /////////

                // we should have magnified image wrapper
                expect( actualImage.wrapper ).toEqual( true );
                
                // data-twic attributes should be correcly set for non magnified image
                expect( actualImage.dataTwicSrc ).toEqual( `media:${ getSrc( `TwicImg` ) }` );
                
                // there should be an non magnified image LQIP only when placeholder !== none
                expect( actualImage.lqip ).toEqual( placeholder === `none` ? false : true );

                //////// magnified image /////////

                // we should have non magnified image wrapper
                expect( magnifiedImage.wrapper ).toEqual( true );

                // data-twic-attributes should be correctly filled
                expect( magnifiedImage.dataTwicBackground ).toEqual(
                    `url(media:${ getSrc( `TwicImg` ) })`
                );

                // we should have correct number of div under magnified wrapper
                // 1 for the image, 1 for the placeholder
                expect( magnifiedImage.nbElements ).toBe( placeholder === `none` ? 1 : 2 );

                // zomm factor should be correctly set
                expect( Number( magnifiedImage.zoomFactor ) ).toEqual( zoomFactor );

                // zoom factor should habe been taken into account
                const magnifiedImageData = getBackgoundImageData(
                    magnifiedImage.backgroundImage
                );

                expect( Number( magnifiedImageData.width ) ).toEqual(
                    eval ( zoomFactor * actualImage.width ) 
                );
            }
        },
    } );
} );

describe( `Zoom property test`, () => {
    setupUnitTests( testCases );
} );
