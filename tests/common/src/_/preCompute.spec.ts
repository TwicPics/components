import { describe, expect, test } from 'vitest';
import { setConfig } from '../../../../src/_/config';
import { preComputeVideoOptions, preComputePlaceholder } from '../../../../src/_/preCompute';

describe( 'PreCompute functions', () => {
  describe( 'preComputeVideoOptions', () => {
    test.each( [
      {
        duration: undefined,
        from: undefined,
        posterFrom: undefined,
        to: undefined,
        expected: {
          posterTransform: "",
          videoTransform: "",
        },
        description: 'defaults to empty video transform'
      },
      {
        duration: undefined,
        from: 1,
        posterFrom: undefined,
        to: undefined,
        expected: {
          posterTransform: "/from=1",
          videoTransform: "/from=1",
        },
        description: 'return correct video and poster transform when using from'
      },
      {
        duration: undefined,
        from: undefined,
        posterFrom: undefined,
        to: 10,
        expected: {
          posterTransform: "",
          videoTransform: "/to=10",
        },
        description: 'return correct video and poster transform when using from'
      },
      {
        duration: undefined,
        from: 5,
        posterFrom: undefined,
        to: 10,
        expected: {
          posterTransform: "/from=5",
          videoTransform: "/from=5/to=10",
        },
        description: ' returncorrect video and poster transform when using from and to'
      },
      {
        duration: undefined,
        from: 5,
        posterFrom: 8,
        to: 10,
        expected: {
          posterTransform: "/from=8",
          videoTransform: "/from=5/to=10",
        },
        description: 'return correct posterTransform'
      },
      {
        duration: 10,
        from: undefined,
        posterFrom: undefined,
        to: undefined,
        expected: {
          posterTransform: "",
          videoTransform: "/duration=10",
        },
        description: 'handle duration'
      },
      {
        duration: 10,
        from: 1,
        posterFrom: undefined,
        to: undefined,
        expected: {
          posterTransform: "/from=1",
          videoTransform: "/from=1/duration=10",
        },
        description: 'handle duration and from'
      },
      {
        duration: 10,
        from: undefined,
        posterFrom: undefined,
        to: 20,
        expected: {
          posterTransform: "",
          videoTransform: "/to=20/duration=10",
        },
        description: 'handle duration and to'
      },
    ] )( 'it should $description', ( { duration, from, posterFrom, to, expected } ) => {
      // @ts-ignore
      expect( preComputeVideoOptions( duration, from, posterFrom, to ) ).toEqual( expected );
    } );
  } );

  describe( 'preComputePlaceholder', () => {
    setConfig( { domain: 'https://demo.twic.it' } );
    test.each( [
      {
        placeholder: 'preview',
        src: 'media:image.jpg',
        expected: 'preview',
        description: 'return correct placeholder'
      },
      {
        placeholder: 'preview',
        src: 'placeholder:green',
        expected: undefined,
        description: 'return null when src is a special media'
      },
    ] )( 'it should $description', ( { placeholder, src, expected } ) => {
      // @ts-ignore
      expect( preComputePlaceholder( placeholder, src ) ).toEqual( expected );
    } );
    setConfig( {
      domain: ''
    } );
  } );
} );