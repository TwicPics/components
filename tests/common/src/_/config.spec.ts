import { beforeEach, describe, expect, it } from 'vitest';

import { config, setConfig } from '../../../../src/_/config';
import { noop } from '../../../../src/_/utils';

describe( 'Config function', () => {
  beforeEach( () => {
      setConfig( {
        domain: ''
      } );
  } );

  it( 'should have some default values', () => {
      expect( config.breakpoints ).toEqual( {
          xs: 320,
          sm: 640,
          md: 768,
          lg: 1024,
          xl: 1280,
          "2xl": 1536,
      } );
      expect(config.class).toBe( `twic` );
      expect(config.brand).toBe( `twic` );
      expect(config.maxDPR).toBe( 2 );
      expect(config.handleShadowDom).toEqual( noop );
  } );

  it( 'should update breakpoints in config', () => {
    setConfig( {
      breakpoints: {
        md: 1000,
        xl: 2000
      },
      domain: ''
    } );

    expect(config.breakpoints).toEqual( {
      xs: 320,
      sm: 640,
      md: 1000,
      lg: 1024,
      xl: 2000,
      "2xl": 1536,
    } );
  } );

  it( 'should update class in config', () => {
    setConfig( {
      class: 'custom-class',
      domain: ''
    } );

    expect(config.class).toBe( 'custom-class');
  } );

  it( 'should update domain in config', () => {
    setConfig( {
      domain: 'example.com'
    } );

    expect(config.domain).toBe( 'example.com');
  } );

  it( 'should update env in config to debug', () => {
    setConfig( {
      debug: true,
      domain: ''
    } );

    expect(config.env).toBe( 'debug');
  } );

  it( 'should update maxDPR in config', () => {
    setConfig( {
      maxDPR: 3,
      domain: ''
    } );

    expect(config.maxDPR).toBe(3);
  } );

  it( 'should update path in config', () => {
    setConfig( {
      path: 'new-path/',
      domain: ''
    } );

    expect(config.path).toBe( 'new-path/');
  } );

} );