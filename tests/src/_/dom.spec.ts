import { beforeEach, describe, expect, it } from "vitest";
import { createElement, cssWithoutPx } from "../../../src/_/dom";

describe( 'Dom functions', () => {
  describe('createElement', () => {

      beforeEach( () => {
        document.head.innerHTML = '';
      } );

      it( 'should create dom element and append to document.head', () => {
          createElement( {
              "element": document.head,
              "value": [
                  {
                      "attributes": {
                          "rel": `preconnect`,
                          "href": `https://example.com/`,
                      },
                      "elementName": `link`,
                  },
              ],
          } );
          
          const link = document.head.querySelector( 'link' );
          expect( link ).toBeTruthy();
          expect( link ).toHaveProperty('rel', 'preconnect' );
          expect( link ).toHaveProperty('href', `https://example.com/` );
      });

      it( 'should create dom elements from an array', () => {
        createElement( {
            "element": document.head,
            "value": [
                {
                    "attributes": {
                        "rel": `preconnect`,
                        "href": `https://example.com/`,
                    },
                    "elementName": `link`,
                },
                {
                    "attributes": {
                        "src": "https://myscript.com/"
                    },
                    "elementName": `script`,
                },
            ],
        } );
        
        const link = document.head.querySelector( 'link' );
        const script = document.head.querySelector( 'script' );
        expect( link ).toBeTruthy();
        expect( link ).toHaveProperty('rel', 'preconnect' );
        expect( link ).toHaveProperty('href', `https://example.com/` );
        expect( script ).toBeTruthy();
        expect( script ).toHaveProperty( 'src', `https://myscript.com/` );
    });
    } );

    describe('cssWithoutPx', () => {
      it( 'should return number from css size in px', () => {
          expect( cssWithoutPx ( '256px' ) ).toEqual( 256 );
      } );
    } )
} );