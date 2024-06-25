// Here are unit tests for verifying:
// the correct functionality of video spliting properties from, to, duration and posterFrom in the TwicVideo component.

import { describe, expect } from 'vitest';
import { assetSelector } from '../domSelector.js';
import { getAssetData, getSrc, goto, setupUnitTests } from '../helpers.js';

let components = [
  {
      media: `video`,
      name: `TwicVideo`
  }
];

const testCases = [];
components.forEach( component => {
    testCases.push( {
        description: `${ component.name } should render correct attributes when using from`,
        fn: async ( page, port ) => {
            const params = {
                component: component.name,
                src: getSrc( component.name ),
                from: `15.4`
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'data-twic-transform' ] ).toEqual( `/from=15.4/*` );
            expect( assetData[ 'data-twic-poster' ] ).toEqual( `media:${ getSrc( component.name ) }` );
            expect( assetData[ 'data-twic-poster-transform' ] ).toEqual( `/from=15.4/*/output=image` );
        }
    } );
    testCases.push( {
        description: `${ component.name } should render correct attributes when using to`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              to: `16.6`
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'data-twic-transform' ] ).toEqual( `/to=16.6/*` );
            expect( assetData[ 'data-twic-poster' ] ).toEqual( `media:${ getSrc( component.name ) }` );
            expect( assetData[ 'data-twic-poster-transform' ] ).toEqual( `/*/output=image` );
        },
      },
    );
    testCases.push( {
        description: `${ component.name } should render correct attributes when using from and to`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              from: `15.4`,
              to: `16.6`
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'data-twic-transform' ] ).toEqual( `/from=15.4/to=16.6/*` );
            expect( assetData[ 'data-twic-poster' ] ).toEqual( `media:${ getSrc( component.name ) }` );
            expect( assetData[ 'data-twic-poster-transform' ] ).toEqual( `/from=15.4/*/output=image` );
        }
    } );
    testCases.push( {
        description: `${ component.name } should render correct attributes when using from and posterFrom`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              from: `15.4`,
              posterFrom: `10`
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'data-twic-transform' ] ).toEqual( `/from=15.4/*` );
            expect( assetData[ 'data-twic-poster' ] ).toEqual( `media:${ getSrc( component.name ) }` );
            expect( assetData[ 'data-twic-poster-transform' ] ).toEqual( `/from=10/*/output=image` );
        }
    } );
    testCases.push( {
        description: `${ component.name } should render correct attributes when using to and posterFrom`,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              to: `15.4`,
              posterFrom: `10`
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'data-twic-transform' ] ).toEqual( `/to=15.4/*` );
            expect( assetData[ 'data-twic-poster' ] ).toEqual( `media:${ getSrc( component.name ) }` );
            expect( assetData[ 'data-twic-poster-transform' ] ).toEqual( `/from=10/*/output=image` );
        }
    } );
    testCases.push( {
        description: `${ component.name } should render correct attributes when using from and duration `,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              from: `15.4`,
              duration: `1.2`
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'data-twic-transform' ] ).toEqual( `/from=15.4/duration=1.2/*` );
            expect( assetData[ 'data-twic-poster' ] ).toEqual( `media:${ getSrc( component.name ) }` );
            expect( assetData[ 'data-twic-poster-transform' ] ).toEqual( `/from=15.4/*/output=image` );
        }
    } );
    testCases.push( {
        description: `${ component.name } should render attributes when using to and duration `,
        fn: async ( page, port ) => {
            const params = {
              component: component.name,
              src: getSrc( component.name ),
              to: `15.4`,
              duration: `1.2`
            };
        
            await goto( { page, params, port } );

            const assetData = await getAssetData ( page, assetSelector( component.media ) );
            expect( assetData[ 'data-twic-transform' ] ).toEqual( `/to=15.4/duration=1.2/*` );
            expect( assetData[ 'data-twic-poster' ] ).toEqual( `media:${ getSrc( component.name ) }` );
            expect( assetData[ 'data-twic-poster-transform' ] ).toEqual( `/*/output=image` );
        }
    } );
    testCases.push( {
      description: `${ component.name } should render attributes when using duration `,
      fn: async ( page, port ) => {
          const params = {
            component: component.name,
            src: getSrc( component.name ),
            duration: `1.2`
          };
      
          await goto( { page, params, port } );

          const assetData = await getAssetData ( page, assetSelector( component.media ) );
          expect( assetData[ 'data-twic-transform' ] ).toEqual( `/duration=1.2/*` );
          expect( assetData[ 'data-twic-poster' ] ).toEqual( `media:${ getSrc( component.name ) }` );
          expect( assetData[ 'data-twic-poster-transform' ] ).toEqual( `/*/output=image` );
      }
  } );
} );

describe( `From, to, duration and posterFrom properties test`, () => {
    setupUnitTests( testCases );
} );
