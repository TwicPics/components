import { describe, expect, it, test } from 'vitest';

import { createUrl, finalTransform, urlInfos } from '../../../../src/_/url';

describe( 'Url functions', () => {

  describe( 'urlInfos', () => {
    test.each( [
      {
        src: 'media:image.jpg',
        domain: 'https://demo.twic.it',
        expected: {
          isAbsolute: false,
          isSpecial: false,
        },
        description: 'identify relative path and non special asset'
      },
      {
        src: 'https://demo.twic.it/image.jpg',
        domain: 'https://demo.twic.it',
        expected: {
          isAbsolute: true,
          isSpecial: false,
        },
        description: 'identify absolute path and non special asset'
      },
      {
        src: 'placeholder:blue',
        domain: 'https://demo.twic.it',
        expected: {
          isAbsolute: false,
          isSpecial: true,
        },
        description: 'identify relative path and special asset'
      },
    ] )( 'it should $description', ( { src, domain, expected } ) => {
      // @ts-ignore
      expect( urlInfos( src, domain ) ).toEqual( expected );
    } );
  } );

  describe( 'createUrl', () => {
    test.each( [
      {
        input: {
          domain: 'https://demo.twic.it',
          context: {
            height: 100,
            mode: 'cover',
            width: 200,
          },
          src: 'media:cat.jpg',
          transform: '*',
        },
        expected: 'https://demo.twic.it/cat.jpg?twic=v1/cover=200x100',
        description: 'create TwicPics api url from path src'
      },
      {
        input: {
          domain: 'https://demo.twic.it',
          context: {
            height: 100,
            mode: 'cover',
            width: 200,
          },
          src: 'https://demo.twic.it/cat.jpg',
          transform: '*',
        },
        expected: 'https://demo.twic.it/cat.jpg?twic=v1/cover=200x100',
        description: 'create TwicPics api url from absolute src'
      },
      {
        input: {
          domain: 'https://demo.twic.it',
          context: {
            height: 100,
            mode: 'cover',
            width: 200,
          },
          src: 'https://demo.twic.it/cat.jpg',
          transform: '/flip=x/*',
        },
        expected: 'https://demo.twic.it/cat.jpg?twic=v1/flip=x/cover=200x100',
        description: 'create TwicPics api url with transformation'
      },
      {
        input: {
          domain: 'https://demo.twic.it',
          context: {
            height: 100,
            mode: 'cover',
            width: 200,
          },
          quality: 90,
          src: 'media:cat.jpg',
          transform: '/flip=x/*',
        },
        expected: 'https://demo.twic.it/cat.jpg?twic=v1/flip=x/cover=200x100/quality=90',
        description: 'create TwicPics api url with quality transformation'
      },
      {
        input: {
          domain: 'https://demo.twic.it',
          context: {
            height: 100,
            mode: 'cover',
            width: 200,
          },
          output: 'maincolor',
          src: 'media:cat.jpg',
          transform: '/flip=x/*',
        },
        expected: 'https://demo.twic.it/cat.jpg?twic=v1/flip=x/cover=200x100/output=maincolor',
        description: 'create TwicPics api url with output transformation'
      },
      {
        input: {
          domain: 'https://demo.twic.it',
          context: {
            height: 100,
            mode: 'cover',
            width: 200,
          },
          src: 'media:cat.jpg',
          transform: '/refit=WxH',
        },
        expected: 'https://demo.twic.it/cat.jpg?twic=v1/refit=200x100',
        description: 'create TwicPics api url with refit cover'
      },
      {
        input: {
          domain: 'https://demo.twic.it',
          context: {
            height: 100,
            width: 200,
          },
          src: 'media:cat.jpg',
          transform: '/refit=WxH',
        },
        expected: 'https://demo.twic.it/cat.jpg?twic=v1/refit=200x100',
        description: 'create TwicPics api url with refit cover when mode is undefined'
      },
      {
        input: {
          domain: 'https://demo.twic.it',
          context: {
            height: 100,
            width: 200,
          },
          src: 'media:cat.jpg',
          transform: '/*',
        },
        expected: 'https://demo.twic.it/cat.jpg?twic=v1/cover=200x100',
        description: 'create TwicPics api url with cover when mode is undefined'
      },
      {
        input: {
          domain: 'https://demo.twic.it',
          context: {
            height: 100,
            mode: 'contain',
            width: 200,
          },
          src: 'media:cat.jpg',
          transform: '/refit=auto/*',
        },
        expected: 'https://demo.twic.it/cat.jpg?twic=v1/refit=auto/contain=200x100',
        description: 'create TwicPics api url with refit auto'
      },
      {
        input: {
          domain: 'https://demo.twic.it',
          context: {
            height: 100,
            mode: 'cover',
            width: 200,
          },
          src: 'placeholder:red',
          transform: '*',
        },
        expected: 'https://demo.twic.it/v1/cover=200x100/placeholder:red',
        description: 'create TwicPics api url for special asset'
      }
    ] )( 'it should $description', ( { input, expected } ) => {
      // @ts-ignore
      expect( createUrl( input ) ).toBe( expected );
    } );
  } );

  describe( 'finalTransform', () => {
    test.each( [
        {
            input: {
            },
            expected: '/*',
            description: 'return correct finalTranform when no mode nor refit'
        },
        {
            input: {
                mode: `cover`
            },
            expected: '/*',
            description: 'return correct finalTranform when mode = cover without refit'
        },
        {
            input: {
                mode: `cover`,
                refit: true
            },
            expected: '',
            description: 'return empty final transform when using mode = cover and refit'
        },
        {
            input: {
                refit: true
            },
            expected: '',
            description: 'return empty final transform when using refit without mode'
        },
        {
            input: {
                refit: true,
                mode: 'contain'
            },
            expected: '/*',
            description: 'return correct final transform when using refit and contain mode'
        },
        {
            input: {
                mode: 'contain'
            },
            expected: '/*',
            description: 'return correct final transform when using contain mode without refit'
        },
    ] )( 'it should $description', ( { input, expected } ) => {
      // @ts-ignore
      const { mode, refit } = input;
      // @ts-ignore
      expect( finalTransform( mode, refit ) ).toBe( expected );
    } );
  } )
} );