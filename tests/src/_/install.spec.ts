import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { installTwicPics, register, validate } from '../../../src/_/install';
import * as DomUtils from '../../../src/_/dom';
import { config, setConfig } from '../../../src/_/config';
import { VERSION } from '../../../src/_/const';


describe( 'Install functions', () => {

  const mockCreateElement = vi.spyOn( DomUtils, 'createElement');

  afterEach( () => {
      mockCreateElement.mockClear();
  } );

  beforeEach( () => {
      document.head.innerHTML = '';
      mockCreateElement.mockClear();
  } );

  describe( 'validate', () => {
    it( 'should throw an error if options are not provided', () => {
        // @ts-ignore
        expect( () => validate() )
            .toThrowError( 'twicpics-components install options not provided' );
    } );

    it( 'should throw an error if domain is invalid', () => {
        expect( () => validate( { domain: 'invalid' } ) )
            .toThrowError( 'twicpics-components install domain "invalid" is invalid' );
    } );

    it( 'should throw an error if path is invalid', () => {
        expect( () => validate( { domain: 'https://example.com', path: '?invalid' } ) )
            .toThrowError( 'twicpics-components install path "?invalid" is invalid' );
    } );

    it( 'should throw an error if env is invalid', () => {
        // @ts-ignore
        expect( () => validate( { domain: 'https://example.com', env: 'invalid' } ) )
            .toThrowError( 'twicpics-components install env "invalid" is invalid' );
    } );

    it( 'should pass for valid options', () => {
        expect( () => validate( { domain: 'https://example.com' } ) )
            .not.toThrowError();
    } );
  } );

  describe('register', () => {

    beforeEach( () => {
      document.head.innerHTML = '';
    } );
  
    it( 'should create and append script and style elements to the document head', () => {
        const options = { domain: 'https://demo.twic.it' };
        setConfig( options );
        register( options );
    
        const script = document.head.querySelector( 'script' );
        const style = document.head.querySelector( 'style' );
        const link = document.head.querySelector( 'link' );

        expect( script ).toBeTruthy();
        expect( style ).toBeTruthy();
        expect( link ).toBeTruthy();
    
        expect(link).toHaveProperty('rel', 'preconnect' );
        expect(link).toHaveProperty('href', 'https://demo.twic.it/' );
        expect(script).toHaveProperty('src', `${ config.domain }/?${ VERSION }` );
    });
  
    it( 'should add appropriate attributes to the script element', () => {
        const options = { domain: 'https://example.com', scriptElementId: `twicpics-script` };
        
        setConfig( options );
        register( options );

        expect( document.head.querySelector('script') ).toHaveProperty('id', 'twicpics-script');
    } );
  } );

  describe('install', () => {
    it( 'should create and append script and style elements to the document head', () => {
        installTwicPics( { domain: 'https://demo.twic.it/' } );
        expect( mockCreateElement ).toHaveBeenCalledTimes( 2 );
    } );
  } );

} );
