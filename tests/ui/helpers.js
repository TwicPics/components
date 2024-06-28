import puppeteer from 'puppeteer';
import { afterEach, beforeEach, describe, test } from 'vitest';

export const getAssetData = async ( page, selector = `.twic-w img` ) => {
    return await page.evaluate( ( arg ) => {
        const asset = document.querySelector( arg );
        const styles = asset && window.getComputedStyle( asset );
        return {
            'data-twic-bot' : asset?.getAttribute( 'data-twic-bot' ),
            'data-twic-eager' : asset?.getAttribute( 'data-twic-eager' ),
            'data-twic-intrinsic' : asset?.getAttribute( 'data-twic-intrinsic' ),
            'data-twic-src' : asset?.getAttribute( 'data-twic-src' ),
            'data-twic-step' : asset?.getAttribute( 'data-twic-step' ),
            'data-twic-transform' : asset?.getAttribute( 'data-twic-transform' ),
            'data-twic-poster' : asset?.getAttribute( 'data-twic-poster' ),
            'data-twic-poster-transform' : asset?.getAttribute( 'data-twic-poster-transform' ),
            src: asset ? asset.src : '',
            srcset: asset ? asset.srcset : '',
            'object-fit': styles?.getPropertyValue( `object-fit` )
        };
    }, selector );
};

export const getPlaceholderData = async ( page, selector = `.twic-w div` ) => {
    return await page.evaluate( ( arg ) => {
        const placeholder = document.querySelector( arg );
        const styles = placeholder && window.getComputedStyle( placeholder );
        return {
            'background-image': styles?.getPropertyValue( `background-image` )?.replace(/url\(['"]?(.*?)['"]?\)/i, '$1'),
            'background-size': styles?.getPropertyValue( `background-size` )
        };
    }, selector );
};

export const goto = async ( { page, params = {}, port } ) => {
    await page.goto( `http://localhost:${ port }/?params=${ encodeURIComponent( JSON.stringify( params ) ) }`);
    await page.waitForSelector( `.twic-i, .twic-p` );
}


const setupPuppeteer = async () => {
    const browser = await puppeteer.launch( {
        headless: true,
    } );
    const page = await browser.newPage();
    page.setDefaultTimeout( 10000 );

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