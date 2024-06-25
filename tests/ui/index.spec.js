import { beforeEach, afterEach, describe, test } from 'vitest';
import puppeteer from 'puppeteer';
import units from "./units.js";

units.forEach( unit => {
    const { framework, port } = unit;
    describe( `it should ${unit.framework}`, () => {
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
    
      test(`should display an image with ${ framework }`, async () => {
          await page.goto( `http://localhost:${ port }` );
          await page.waitForSelector( `.twic-i` );
          await page.waitForSelector( `.twic-done` );
      
          console.log( 'Background Image URL:', await getPlacholderData( page ) ); 
          console.log( 'Image src:', await getAssetData( page ) ); 
    
          await page.setViewport( {
            width: 200,
            height: 200,
            deviceScaleFactor: 1,
          } );
    
          await page.waitForSelector( `.twic-loading` );
          await page.waitForSelector( `.twic-done` );
    
          console.log( 'Background Image URL:', await getPlacholderData( page ) ); 
          console.log( 'Image src:', await getAssetData( page ) ); 
      } );  
    } );
} )
