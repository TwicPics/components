import puppeteer from 'puppeteer';
import { afterEach, beforeEach, describe, test } from 'vitest';
import { delay } from './utils';

export const getAssetData = async ( page, selector = `.twic-w img` ) => {
    return await page.evaluate( ( arg ) => {
        const asset = document.querySelector( arg );
        const styles = asset && window.getComputedStyle( asset );
        const rect = asset && asset.getBoundingClientRect();
        const aspectRatio = rect && rect.height ? rect.width / rect.height : undefined;
        return {
            'alt' : asset?.alt,
            'aspect-ratio': aspectRatio,
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

export const getPlaceholderData = async ( page, selector = `.twic-w div` ) => {
    return await page.evaluate( ( arg ) => {
        const placeholder = document.querySelector( arg );
        const styles = placeholder && window.getComputedStyle( placeholder );
        return {
            'background-image': styles?.getPropertyValue( `background-image` )?.replace(/url\(['"]?(.*?)['"]?\)/i, '$1'),
            'background-position': styles?.getPropertyValue( `background-position` ),
            'background-size': styles?.getPropertyValue( `background-size` )
        };
    }, selector );
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
    await page.goto( `http://localhost:${ port }/?params=${ encodeURIComponent( JSON.stringify( params ) ) }`);

    //console.log(`http://localhost:${ port }/?params=${ encodeURIComponent( JSON.stringify( params ) ) }`);

    await page.waitForSelector( `.twic-i, .twic-p` );
    await delay ( 250 );
}


const setupPuppeteer = async () => {
    const browser = await puppeteer.launch( {
        headless: true,
    } );
    const page = await browser.newPage();
    afterEach(async () => {
        await browser.close();
    });

    return {
        browser,
        page
    };
};

export const setupUnitTests = ( units, testCases ) => {
    units.forEach( unit => {
        const { framework, port } = unit;
        describe( `${ framework } components`, () => {
            let page;

            beforeEach( async () => {
                ( { page } = await setupPuppeteer() );
            } );

            testCases.forEach( testCase => {
                test( testCase.description, async () => {
                    const { fn } = testCase;
                    await fn( page, port );
                } );
            } );
        } );
    } );
};