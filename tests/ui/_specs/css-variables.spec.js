// Here are unit tests for verifying:
// the correct functionality of CSS variables in the TwicImg, TwicVideo components.

import { describe, expect } from 'vitest';
import { assetSelector, placeholderSelector } from '../domSelector.js';
import { getAssetData, getPlaceholderData, getSrc, goto, setupUnitTests } from '../helpers.js';

let components = [
  {
      media: `img`,
      name: `TwicImg`
  },
  {
      media: `video`,
      name: `TwicVideo`
  },
];

const twicRatioValues = [
    {
        className: 'default',
        ratio: 1,
    },
    {
        className: 'landscape',
        ratio: 4/3,
    },
    {
        className: 'portrait',
        ratio: 3/4,
    },
];

const twicModeValues = [
  {
      className: 'default',
      mode: `cover`,
  },
  {
      className: 'contain',
      mode: `contain`,
  },
];

const twicPositionValues = [
  {
      className: 'default',
      position: `50% 50%`,
  },
  {
      className: 'top',
      position: `50% 0%`,
  },
];


const testCases = [];
components.forEach( component => {
    twicRatioValues.forEach( twicRatioValue => {
        const { className, ratio } = twicRatioValue;
        testCases.push( {
            description: `${
                component.name 
            } should display an asset with correct ratio when using CSS class ${ className }.`,
            fn: async ( page, port ) => {
                const params = {
                    component: component.name,
                    src: getSrc( component.name ),
                    containerClass: className,
                };
            
                await goto( { page, params, port } );

                const assetData = await getAssetData ( page, assetSelector( component.media ) );
                expect( assetData[ 'aspect-ratio' ] ).toBeCloseTo( eval ( ratio ), 2 );

                const placeholderData = await getPlaceholderData ( page, placeholderSelector( component.media ) );
                expect( placeholderData[ 'aspect-ratio' ] ).toBeCloseTo( eval ( ratio ), 2 );
            },
        } );
    } )
    twicModeValues.forEach( twicModeValue => {
        const { className, mode } = twicModeValue;
        testCases.push( {
            description: `${
                component.name 
            } should display an asset with correct object-fit when using CSS class ${ className }.`,
            fn: async ( page, port ) => {
                const params = {
                    component: component.name,
                    src: getSrc( component.name ),
                    containerClass: className,
                };

                await goto( { page, params, port } );

                const assetData = await getAssetData ( page, assetSelector( component.media ) );
                expect( assetData[ 'object-fit' ] ).toEqual( mode );

                const placeholderData = await getPlaceholderData ( page, placeholderSelector( component.media ) );
                expect( placeholderData[ 'background-size' ] ).toEqual( mode );
            },
        } );
    } )
    twicPositionValues.forEach( twicPositionValue => {
        const { className, position } = twicPositionValue;
        testCases.push( {
            description: `${
                component.name 
            } should display an asset with correct position when using CSS class ${ className }.`,
            fn: async ( page, port ) => {
                const params = {
                    component: component.name,
                    src: getSrc( component.name ),
                    mode: `contain`,
                    ratio: '3/4',
                    containerClass: className,
                };
            
                await goto( { page, params, port } );

                const assetData = await getAssetData ( page, assetSelector( component.media ) );
                expect( assetData[ 'object-position' ] ).toEqual( position );

                const placeholderData = await getPlaceholderData ( page, placeholderSelector( component.media ) );
                expect( placeholderData[ 'background-position' ] ).toEqual( position );

            },
        } );
    } )
} );


describe( `CSS variables test`, () => {
    setupUnitTests( testCases );
} );
