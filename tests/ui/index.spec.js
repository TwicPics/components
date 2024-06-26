import { beforeEach, afterEach, describe, test, expect } from 'vitest';
import puppeteer from 'puppeteer';
import units from "./units.js";

const queryParams = ( params = {} ) => encodeURIComponent( JSON.stringify( params ) );

units.forEach( unit => {
    const { framework, port } = unit;
    describe( `${unit.framework} components`, () => {
      let browser;
      let page;
    
      const getAssetData = async( page ) => {
        return await page.evaluate(() => {
            const asset = document.querySelector( '.twic-w img' );
            const styles = window.getComputedStyle( asset );
            return {
              src: asset ? asset.src : ``,
              "object-fit": styles.getPropertyValue( 'object-fit' )
            }
      });
    }
    
      const getPlacholderData = async( page ) => {
          return await page.evaluate(() => {
            const placeholder = document.querySelector( `.twic-w div` );
            const styles = window.getComputedStyle( placeholder );
            styles.getPropertyValue( 'background-image' ).replace( /url\(['"]?(.*?)['"]?\)/i, '$1' )
            return {
                "background-image" : styles.getPropertyValue( 'background-image' ).replace( /url\(['"]?(.*?)['"]?\)/i, '$1' ),
                "background-size": styles.getPropertyValue( 'background-size' )
            }
        });
      }
    
      beforeEach(async () => {
        browser = await puppeteer.launch( { 
          headless: true,
        } );
        page = await browser.newPage();
      });
    
      afterEach(async () => {
        await browser.close();
      });

      // testing html structure
      test.each( [
        {
          input: {},
          description: `TwicImg should render correct HTML`,
        },
        {
          input: {
            placeholder : `none`,
          },
          description: `TwicImg should render correct HTML without placeholder`,
        },
        {
          input: {
            src: `video/skater.mp4`,
            media : `video`,
          },
          description: `TwicVideo should render correct HTML`,
        },
      ] )( '$description', async( { input } ) => {
          const { media = `img` } = input;
          const params = {
            src: "football.jpg",
            ...input
          }
        
          await page.goto( `http://localhost:${ port }?params=${ queryParams( params ) }` );
          await page.waitForSelector( `.twic-i` );
          const asset = await page.$( `.twic-i>.twic-w.twic-tf>${ media }` );
          const placeholder = await page.$( `.twic-i>.twic-w.twic-tf>${ media }~div` );
          expect( asset ).not.toBe( null );
          expect( placeholder ).toEqual( input.placeholder !== 'none' ? expect.anything() : null );
      } );
  
    
      test(`should display an image with ${ framework }`, async () => {
          const params = {
            src: "football.jpg",
            mode:'contain',
          }
          await page.goto( `http://localhost:${ port }?params=${ queryParams( params ) }` );
          await page.waitForSelector( `.twic-i` );
          await page.waitForSelector( `.twic-done` );
      
          //console.log( 'Background Image URL:', await getPlacholderData( page ) ); 
          //console.log( 'Image src:', await getAssetData( page ) ); 
    
          await page.setViewport( {
            width: 200,
            height: 200,
            deviceScaleFactor: 1,
          } );
    
          await page.waitForSelector( `.twic-loading` );
          await page.waitForSelector( `.twic-done` );
  
      } );  
    } );
} )
