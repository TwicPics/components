import puppeteer from 'puppeteer';
import { afterEach, beforeEach, describe, test } from 'vitest';

export const getAssetData = async ( page ) => {
    return await page.evaluate( () => {
        const asset = document.querySelector( `.twic-w img` );
        const styles = asset && window.getComputedStyle( asset );
        return {
            src: asset ? asset.src : '',
            'object-fit': styles?.getPropertyValue( `object-fit` )
        };
    });
};

export const getPlaceholderData = async ( page, selector = `.twic-w div` ) => {
    return await page.evaluate( ( arg ) => {
        console.log( arg );
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