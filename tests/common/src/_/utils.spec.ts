import { describe, it, expect, vi, beforeEach, afterEach, test } from 'vitest';
import {
  convertToBoolean,
  debounce,
  logError,
  logWarning,
  noop,
  regExpFinderFactory,
  throwError,
  trimRegExpFactory
} from '../../../../src/_/utils';

describe('Utils', () => {
  describe( 'convertToBoolean', () => {
    test.each( [
      {
        input: 'true',
        expected: true,
        description: 'convert string "true" to boolean true',
      },
      {
        input: 'false',
        expected: false,
        description: 'convert string "false" to boolean false',
      },
      {
        input: '',
        expected: true,
        description: 'convert string empty to boolean true',
      },
      {
        input: undefined,
        expected: false,
        description: 'convert undefined empty to boolean false',
      },
      {
        input: true,
        expected: true,
        description: 'return boolean true',
      },
      {
        input: false,
        expected: false,
        description: 'return boolean false',
      },
      {
        input: 'invalid',
        expected: undefined,
        description: 'return undefined when invalid',
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      // @ts-ignore
      expect( convertToBoolean( input ) ).toBe( expected );
    } );
  } );

  describe( 'convertToBoolean', () => {
    test.each( [
      {
        input: {
          leading: true,
        },
        expected: 2,
        description: 'debounce function calls with leading = true',
      },
      {
        input: {
          leading: false,
        },
        expected: 1,
        description: 'debounce function calls with leading = false',
      },
      {
        input: {
          leading: true,
          trailing: false,
        },
        expected: 1,
        description: 'debounce function calls with trailing = false',
      },
    ] )( 'it should $description', ( { input: { leading, trailing = true }, expected } ) => {
      // @ts-ignore
        vi.useFakeTimers();
        const fn = vi.fn();
        const debouncedFn = debounce( fn, { ms: 100, leading, trailing } );

        debouncedFn();
        debouncedFn();

        vi.advanceTimersByTime( 50 );

        debouncedFn();

        vi.advanceTimersByTime( 100 );

        expect( fn ).toHaveBeenCalledTimes(expected);

        vi.useRealTimers();
    } );
  } );

  describe( 'logging functions', () => {
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;

    beforeEach( () => {
      console.error = vi.fn();
      console.warn = vi.fn();
    } );

    afterEach( () => {
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
    } );

    it( 'should log errors correctly', () => {
      logError( 'test error' );
      expect( console.error ).toHaveBeenCalledWith( 'twicpics-components test error' );
    });

    it( 'should log warnings correctly', () => {
      logWarning( 'test warning' );
      expect( console.warn ).toHaveBeenCalledWith( 'twicpics-components test warning' );
    });
  });

  describe( 'noop', () => {
    it( 'should do nothing', () => {
      expect( noop() ).toBeUndefined();
    });
  });

  describe('regExpFinderFactory', () => {
    it( 'should create a function that finds matches', () => {
      const finder = regExpFinderFactory( /hello (\w+)/ );
      expect( finder('hello world') ).toBe( 'world' );
    });

    it( 'should return defaultValue if no match is found', () => {
      const finder = regExpFinderFactory( /hello (\w+)/, { defaultValue: 'default' } );
      expect( finder( 'no match' ) ).toBe('default');
    });

    it( 'should apply filter to the match', () => {
      const finder = regExpFinderFactory(/hello (\w+)/, { filter: (v) => v.toUpperCase() });
      expect( finder('hello world') ).toBe( 'WORLD' );
    });
  });

  describe( 'throwError', () => {
    it( 'should throw an error with the correct message', () => {
      expect( () => throwError( 'test error' ) ).toThrow( 'twicpics-components test error' );
    });
  });

  describe( 'trimRegExpFactory', () => {
    it( 'should create a regex that trims and matches items', () => {
      const regex = trimRegExpFactory( [ 'item1', 'item2' ] );
      expect( regex.test( '  item1  ') ).toBe( true );
      expect( regex.test( 'item2') ).toBe( true );
      expect( regex.test( 'item3') ).toBe( false );
    });

    it( 'should create a regex with custom border characters', () => {
      const regex = trimRegExpFactory( [ 'item1', 'item2' ], { border: '\\d' } );
      expect( regex.test('123item1123') ).toBe( true );
      expect( regex.test('123item2123') ).toBe( true );
      expect( regex.test('item3') ).toBe( false );
    } );
  });
});