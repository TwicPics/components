import puppeteer from 'puppeteer';
import { afterAll, afterEach, beforeAll, beforeEach, describe, test } from 'vitest';
import { getFrameworks } from './units';

export const getAssetData = async ( page, selector = `.twic-w img` ) => {
    return await page.evaluate( ( arg ) => {
        const asset = document.querySelector( arg );
        const styles = asset && window.getComputedStyle( asset );
        const rect = asset && asset.getBoundingClientRect();
        const aspectRatio = rect && rect.height ? rect.width / rect.height : undefined;
        return {
            'alt' : asset?.alt,
            'aspect-ratio': aspectRatio,
            crossorigin: asset?.getAttribute( 'crossorigin' ),
            'data-twic-bot' : asset?.getAttribute( 'data-twic-bot' ),
            'data-twic-eager' : asset?.getAttribute( 'data-twic-eager' ),
            'data-twic-intrinsic' : asset?.getAttribute( 'data-twic-intrinsic' ),
            'data-twic-src' : asset?.getAttribute( 'data-twic-src' ),
            'data-twic-step' : asset?.getAttribute( 'data-twic-step' ),
            'data-twic-transform' : asset?.getAttribute( 'data-twic-transform' ),
            'data-twic-poster' : asset?.getAttribute( 'data-twic-poster' ),
            'data-twic-poster-transform' : asset?.getAttribute( 'data-twic-poster-transform' ),
            fetchpriority: asset?.getAttribute( 'fetchpriority' ),
            loading: asset?.loading,
            src: asset ? asset.src : '',
            srcset: asset ? asset.srcset : '',
            'object-fit': styles?.getPropertyValue( `object-fit` ),
            'object-position': styles?.getPropertyValue( `object-position` )
        };
    }, selector );
};

const finalTransformationReg = /(?:cover|contain|inside)=(\d*)x(\d*)/;
export const getBackgoundImageData = ( backgroundImage ) => {
    const [ _, url ] = backgroundImage?.match( /(https:\/\/.*)['"]\)/ );
    const [ __, width, height ] = ( url?.match( finalTransformationReg ) || [] );
    return {
        'aspect-ratio': ( width && height ) ? width / height : undefined,
        'background-image': url,
        height,
        width,
    }
}

export const getHostElementData = async ( page, selector ) => {
  return await page.evaluate( ( arg ) => {
      const hostElement = document.querySelector( arg );
      return {
          'draggable' : hostElement?.getAttribute( 'draggable' ),
          'id' : hostElement?.getAttribute( 'id' ),
          'style' : hostElement?.getAttribute( 'style' ),
          'tabindex' : hostElement?.getAttribute( 'tabindex' ),
      };
  }, selector );
};

export const getPlaceholderData = async ( page, selector = `.twic-w div` ) => {
    const result =  await page.evaluate( ( arg ) => {
        const placeholder = document.querySelector( arg );
        const styles = placeholder && window.getComputedStyle( placeholder );
        return {
            'background-image': styles?.getPropertyValue( `background-image` ),
            'background-position': styles?.getPropertyValue( `background-position` ),
            'background-size': styles?.getPropertyValue( `background-size` )
        };
    }, selector );

    return {
      ...result,
      ...getBackgoundImageData( result[ `background-image` ] ),
    }
};

export const getWrapperData = async ( page, selector = `.twic-w` ) => {
  return await page.evaluate( ( arg ) => {
      const wrapper = document.querySelector( arg );
      const styles = wrapper && window.getComputedStyle( wrapper );
      return {
          'padding-top': styles?.getPropertyValue( `padding-top` ),
          'title': ( wrapper && wrapper.hasAttribute( `title` ) ) ? wrapper.title : undefined,
      };
  }, selector );
};

const componentSourceMap = {
  TwicImg: `football.jpg`,
  TwicVideo: `video/skater.mp4`,
  TwicPicture: `football.jpg`,
}
export const getSrc = ( component ) => componentSourceMap[ component ];

export const goto = async ( { page, params = {}, port } ) => {
  process.env.FRAMEWORK_FILTERS
    const url = `http://localhost:${ port }/?params=${ JSON.stringify( params ) }`;
    await page.goto( url );
    if ( process.env.FRAMEWORK_FILTERS ) {
        console.log( { url } );
    }
    await page.waitForSelector( `.twic-i, .twic-p` );
    await new Promise( ( resolve ) => setTimeout( resolve, 250 ) );
}

export const setupUnitTests = async ( testCases ) => {

    let browser;
    beforeAll( async () => {
        browser = await puppeteer.launch({
            headless: true,
        } );
    } );
    afterAll( async () => {
        await browser.close();
    } );

    await Promise.all( getFrameworks( process.env.FRAMEWORK_FILTERS ).map( async ( unit ) => {
        const { framework, port } = unit;
        describe( `${ framework } components`, async () => {
            let page;
            beforeEach( async () => {
                page = await browser.newPage();
            } );

            afterEach( async () => {
                await page.close();
            } );

            testCases.forEach( testCase => {
                const { excluded } = testCase;
                if (
                    excluded && 
                    excluded.some(
                        excludedItem => new RegExp( `^${ excludedItem && excludedItem.trim() }`, `i` ).test( framework )
                    )
                ) {
                  return;
                }

                test( testCase.description, async () => {
                    const { fn } = testCase;
                    await fn( page, port );
                } );
            } );
        } );
    } ) );
};
