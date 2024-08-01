import { beforeEach, describe, expect, it, test, vi } from 'vitest';
import { setConfig } from '../../../../src/_/config';
import {
    computeData,
    computeHostAttributes,
    computeHostStyle,
    computeMediaAttributes,
    computePicture,
    computePlaceholderBackground,
    computePlaceholderStyle,
    computePreTransform,
    computeStyle,
    computeWrapperClass,
    computeWrapperStyle
} from '../../../../src/_/compute';
import { Mode, PlaceholderData } from '../../../../src/_/types';

const dummyAnchor = { x: 'center', y: 'top' };
const dummyVideoOptions = { posterTransform: "/from=5", videoTransform: "/from=5/to=10" };

describe( 'Compute functions', () => {
  describe('computePicture', () => {

    beforeEach( () => {
      setConfig( {
        domain: 'https://demo.twic.it'
      } );
    } );

    it( 'should return undefined if config.domain is not set', () => {
        setConfig( {
          // @ts-ignore
          domain : undefined
        } )

        expect( computePicture( {}, false, 'auto', {}, {}, {}, '', {}, '', {}, '' )  ).toBeUndefined();
    });

    it( 'should return correct picture object without art directive', () => {
        const anchors = { '0': dummyAnchor };
        const focuses = { '0': 'auto' };
        const modes = { 0: 'cover' as Mode };
        const positions = { 0: 'center' };
        const preTransforms = { 0: 'flip=x' };
        const ratios = { 0: 0.5 };
        const sizes = { '0': '(max-width: 1200px) calc(100vw - 48px),1200px' };
        const src = 'media:example.jpg';
        
        const result = computePicture( anchors, true, 'auto', focuses, modes, positions, preTransforms, ratios, '', sizes, src );
        expect( result ).toBeDefined();
        expect( result.img ).toBeDefined();
        expect( result.sources ).toHaveLength( 0 );

        const { img } = result;
        expect(img ).toEqual(
          {
            height: '768',
            sizes: '(max-width: 1200px) calc(100vw - 48px),1200px',
            width: '1536',
            srcSet: 'https://demo.twic.it/example.jpg?twic=v1/flip=x/refit=3072x1536@top-center 3072w,https://demo.twic.it/example.jpg?twic=v1/flip=x/refit=2560x1280@top-center 2560w,https://demo.twic.it/example.jpg?twic=v1/flip=x/refit=2048x1024@top-center 2048w,https://demo.twic.it/example.jpg?twic=v1/flip=x/refit=1536x768@top-center 1536w,https://demo.twic.it/example.jpg?twic=v1/flip=x/refit=1280x640@top-center 1280w,https://demo.twic.it/example.jpg?twic=v1/flip=x/refit=1024x512@top-center 1024w,https://demo.twic.it/example.jpg?twic=v1/flip=x/refit=768x384@top-center 768w,https://demo.twic.it/example.jpg?twic=v1/flip=x/refit=640x320@top-center 640w,https://demo.twic.it/example.jpg?twic=v1/flip=x/refit=320x160@top-center 320w',
            fetchPriority: 'auto',
            loading: 'eager',
            src: 'https://demo.twic.it/example.jpg?twic=v1/flip=x/refit=1536x768@top-center'
          }
        );
    });

    it( 'should return correct picture object with art directive', () => {
        const anchors = { '0': { x: 'left', y: undefined}, '640': dummyAnchor };
        const focuses = { '0' : '', '640': 'auto', '768': '' };
        const modes = { 0: 'cover' as Mode, 640: 'contain' as Mode };
        const positions = {};
        const preTransforms = { 0: ``, '640': 'flip=x', '768': '' };
        const ratios = { '0': 1.3333333333333333, '640': 1, '768': 0.75, };
        const sizes = { '0': '(max-width: 1200px) calc(100vw - 48px),1200px' };
        const src = 'media:example.jpg';

        const result = computePicture( anchors, true, 'auto', focuses, modes, positions, preTransforms, ratios, '', sizes, src );
        
        expect( result ).toBeDefined();
        expect( result.img ).toBeDefined();
        expect( result.sources ).toHaveLength(2);

        const { img, sources } = result;
        expect(img ).toEqual(
          {
            height: '853',
            sizes: '(max-width: 1200px) calc(100vw - 48px),1200px',
            width: '640',
            srcSet: 'https://demo.twic.it/example.jpg?twic=v1/refit=1280x1707@left 1280w,https://demo.twic.it/example.jpg?twic=v1/refit=640x853@left 640w,https://demo.twic.it/example.jpg?twic=v1/refit=320x427@left 320w',
            fetchPriority: 'auto',
            loading: 'eager',
            src: 'https://demo.twic.it/example.jpg?twic=v1/refit=640x853@left'
          }
        );

        expect(sources ).toEqual(
          [
            {
              height: '576',
              sizes: '(max-width: 1200px) calc(100vw - 48px),1200px',
              width: '768',
              srcSet: 'https://demo.twic.it/example.jpg?twic=v1/refit=auto/inside=3072x2304@top-center 3072w,https://demo.twic.it/example.jpg?twic=v1/refit=auto/inside=2560x1920@top-center 2560w,https://demo.twic.it/example.jpg?twic=v1/refit=auto/inside=2048x1536@top-center 2048w,https://demo.twic.it/example.jpg?twic=v1/refit=auto/inside=1536x1152@top-center 1536w,https://demo.twic.it/example.jpg?twic=v1/refit=auto/inside=1280x960@top-center 1280w,https://demo.twic.it/example.jpg?twic=v1/refit=auto/inside=1024x768@top-center 1024w,https://demo.twic.it/example.jpg?twic=v1/refit=auto/inside=768x576@top-center 768w',
              media: '(min-width: 768px)'
            },
            {
              height: '640',
              sizes: '(max-width: 1200px) calc(100vw - 48px),1200px',
              width: '640',
              srcSet: 'https://demo.twic.it/example.jpg?twic=v1/flip=x/refit=auto/inside=1280x1280@top-center 1280w,https://demo.twic.it/example.jpg?twic=v1/flip=x/refit=auto/inside=640x640@top-center 640w',
              media: '(min-width: 640px)'
            }
          ]
        );
    });

    it( 'should set eager loading attributes correctly', () => {
        const anchors = { '0': dummyAnchor };
        const focuses = { '0': 'auto' };
        const modes = { 0: 'cover' as Mode };
        const positions = { 0: 'center' };
        const ratios = { 0: 0.5 };
        const sizes = { '0': '(max-width: 1200px) calc(100vw - 48px),1200px' };
        const src = 'media:example.jpg';

        const result = computePicture( anchors, true, 'high', focuses, modes, positions, '', ratios, '', sizes, src );

        expect( result.img.loading ).toBe('eager');
        expect( result.img.fetchPriority ).toBe('high');
    });

    it( 'should set lazy loading attributes correctly', () => {
        const anchors = { '0': dummyAnchor };
        const focuses = { '0': 'auto' };
        const modes = { 0: 'cover' as Mode };
        const positions = { 0: 'center' };
        const ratios = { 0: 0.5 };
        const sizes = { '0': '(max-width: 1200px) calc(100vw - 48px),1200px' };
        const src = 'media:example.jpg';

        const result = computePicture( anchors, false, 'auto', focuses, modes, positions, '', ratios, '', sizes, src );

        expect( result.img.loading ).toBe('lazy');
        expect( result.img.fetchPriority ).toBe('auto');
    });
  });

  describe( 'computePreTransform', () => {
    test.each( [
      {
        input: { 
          anchor: dummyAnchor,
          debug: false,
          focus: 'auto',
          mode: 'contain',
          preTransform: '',
          refit: undefined
        },
        expected: '',
        description: 'return empty string'
      },
      {
        input: { 
          anchor: dummyAnchor,
          debug: true,
          focus: 'auto',
          mode: 'contain',
          preTransform: '',
          refit: undefined
        },
        expected: '/debug',
        description: 'return debug transformation'
      },
      {
        input: { 
          anchor: dummyAnchor,
          debug: true,
          focus: 'auto',
          mode: 'contain',
          preTransform: 'flip=x',
          refit: undefined
        },
        expected: '/debug/flip=x',
        description: 'return debug/flip=x transformation'
      },
      {
        input: { 
          anchor: dummyAnchor,
          debug: true,
          focus: 'auto',
          mode: 'cover',
          preTransform: 'flip=x',
          refit: undefined
        },
        expected: '/debug/flip=x/focus=auto',
        description: 'should consider focus rather than anchor'
      },
      {
        input: { 
          anchor: dummyAnchor,
          debug: true,
          focus: undefined,
          mode: 'cover',
          preTransform: 'flip=x',
          refit: undefined
        },
        expected: '/debug/flip=x/focus=top-center',
        description: 'return consider anchor as focus is undefined'
      },
      {
        input: { 
          anchor: dummyAnchor,
          debug: false,
          focus: undefined,
          mode: 'cover',
          preTransform: 'flip=x',
          refit: '5p'
        },
        expected: '/flip=x/refit=WxH(5p)@top-center',
        description: 'return handle refit in cover mode'
      },
      {
        input: { 
          anchor: dummyAnchor,
          debug: false,
          focus: undefined,
          mode: 'contain',
          preTransform: 'flip=x',
          refit: '5p'
        },
        expected: '/flip=x/refit=auto(5p)',
        description: 'return handle refit in contain mode'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      // @ts-ignore
      expect( computePreTransform( input ) ).toBe( expected );
    } );
  } );

  describe( 'computeData', () => {
    test.each( [
      {
        input: { 
          anchor: dummyAnchor,
          bot: undefined,
          eager: false,
          focus: 'auto',
          intrinsic: '',
          mediaTag: 'img',
          mode: 'cover' as Mode,
          preTransform: '',
          refit: undefined,
          step: undefined,
          videoOptions: undefined,
          src: 'media:example.jpg'
        },
        expected: {
          "data-twic-src": 'media:example.jpg',
          "data-twic-transform": '/focus=auto/*',
        },
        description: 'return correct data attributes'
      },
      {
        after: () => setConfig( {
          domain: 'https://demo.twic.it',
          class: 'twic',
        } ),
        before: () => setConfig( {
          domain: 'https://demo.twic.it',
          class: 'batman'
        } ),
        input: { 
          anchor: dummyAnchor,
          bot: undefined,
          eager: false,
          focus: 'auto',
          intrinsic: '',
          mediaTag: 'img',
          mode: 'cover' as Mode,
          preTransform: '',
          refit: undefined,
          step: undefined,
          videoOptions: undefined,
          src: 'media:example.jpg'
        },
        expected: {
          "data-batman-src": 'media:example.jpg',
          "data-batman-transform": '/focus=auto/*',
        },
        description: 'should handle class correctly'
      },
      {
        input: { 
          anchor: dummyAnchor,
          bot: undefined,
          eager: false,
          focus: 'auto',
          intrinsic: '',
          mediaTag: 'video',
          mode: 'cover' as Mode,
          preTransform: '',
          refit: undefined,
          step: undefined,
          videoOptions: dummyVideoOptions,
          src: 'media:example.jpg'
        },
        expected: {
          "data-twic-poster": "media:example.jpg",
          "data-twic-src": 'media:example.jpg',
          "data-twic-poster-transform": "/focus=auto/from=5/*/output=image",
          "data-twic-transform": '/focus=auto/from=5/to=10/*',
        },
        description: 'handle video options correctly'
      },
      {
        input: { 
          anchor: dummyAnchor,
          bot: undefined,
          eager: false,
          focus: 'auto',
          intrinsic: '',
          mediaTag: 'img',
          mode: 'cover' as Mode,
          preTransform: 'flip=x/background=remove',
          refit: undefined,
          step: undefined,
          videoOptions: undefined,
          src: 'media:example.jpg'
        },
        expected: {
          "data-twic-src": 'media:example.jpg',
          "data-twic-transform": '/flip=x/background=remove/focus=auto/*',
        },
        description: 'handle preTransform'
      },
      {
        input: { 
          anchor: dummyAnchor,
          bot: undefined,
          eager: false,
          focus: 'auto',
          intrinsic: '1000x1000',
          mediaTag: 'img',
          mode: 'cover' as Mode,
          preTransform: 'flip=x/background=remove',
          refit: undefined,
          step: undefined,
          videoOptions: undefined,
          src: 'media:example.jpg'
        },
        expected: {
          "data-twic-intrinsic": "1000x1000",
          "data-twic-src": 'media:example.jpg',
          "data-twic-transform": '/flip=x/background=remove/focus=auto/*',
        },
        description: 'handle intrinsic'
      },
      {
        input: { 
          anchor: dummyAnchor,
          bot: undefined,
          eager: false,
          focus: 'auto',
          intrinsic: undefined,
          mediaTag: 'img',
          mode: 'cover' as Mode,
          preTransform: 'flip=x/background=remove',
          refit: '5p',
          step: undefined,
          videoOptions: undefined,
          src: 'media:example.jpg'
        },
        expected: {
          "data-twic-src": 'media:example.jpg',
          "data-twic-transform": '/flip=x/background=remove/refit=WxH(5p)@top-center',
        },
        description: 'handle refit in cover mode'
      },
      {
        input: { 
          anchor: dummyAnchor,
          bot: undefined,
          eager: false,
          focus: 'auto',
          intrinsic: undefined,
          mediaTag: 'img',
          mode: 'contain' as Mode,
          preTransform: 'flip=x/background=remove',
          refit: '5p',
          step: undefined,
          videoOptions: undefined,
          src: 'media:example.jpg'
        },
        expected: {
          "data-twic-src": 'media:example.jpg',
          "data-twic-transform": '/flip=x/background=remove/refit=auto(5p)/*',
        },
        description: 'handle refit in contain mode'
      },
      {
        input: { 
          anchor: dummyAnchor,
          bot: undefined,
          eager: false,
          focus: 'auto',
          intrinsic: undefined,
          mediaTag: 'img',
          mode: 'contain' as Mode,
          preTransform: '',
          refit: undefined,
          step: 200,
          videoOptions: undefined,
          src: 'media:example.jpg'
        },
        expected: {
          "data-twic-step": "200",
          "data-twic-src": 'media:example.jpg',
        },
        description: 'handle step'
      },
      {
        input: { 
          anchor: dummyAnchor,
          bot: undefined,
          eager: true,
          focus: 'auto',
          intrinsic: undefined,
          mediaTag: 'img',
          mode: 'contain' as Mode,
          preTransform: '',
          refit: undefined,
          step: undefined,
          videoOptions: undefined,
          src: 'media:example.jpg'
        },
        expected: {
          "data-twic-eager": "",
          "data-twic-src": 'media:example.jpg',
        },
        description: 'handle eager'
      },
    ] )( 'it should $description', ( { 
        after,
        before,
        input,
        expected
      } ) => {
      if ( before ) {
        before();
      }
      const { 
        anchor,
        bot,
        eager,
        focus,
        intrinsic,
        mediaTag,
        mode,
        preTransform,
        refit,
        src,
        step,
        videoOptions
      } = input;

      const result = computeData(
        anchor,
        // @ts-ignore
        bot,
        eager,
        focus,
        intrinsic,
        mediaTag,
        mode,
        preTransform,
        refit,
        src,
        step,
        videoOptions,
      );

      if ( after ) {
        after();
      }

      expect( result  ).toEqual( expected );
      
    } );
  } );

  describe ( 'computeHostAttributes', () => {
      it( 'should return empty object when no data passed ', () => {
          expect(
            computeHostAttributes( {} )
          ).toEqual( {} )
      } );
      it( 'should return empty object when data without value', () => {
          expect(
              computeHostAttributes( {
                  draggable: undefined,
                  id: undefined,
                  tabIndex: undefined
              })
          ).toEqual( {} )
      } );
      it( 'should only not return id nor tabindex' , () => {
          expect(
            computeHostAttributes( { 
                draggable: false,
                id: ``,
                tabIndex: ``
            } )
          ).toEqual({
              "draggable": false
          })
      } );
      it( 'should draggable, id and tabindex' , () => {
          expect(
            computeHostAttributes( { 
                draggable: false,
                id: `#my-id`,
                tabIndex: `2`
            } )
          ).toEqual({
              "draggable": false,
              "id": "#my-id",
              "tabIndex": "2"
          })
      } );
  } );

  describe( 'computeMediaAttributes', () => {
    test.each( [
      {
        input: {},
        expected: {},
        description: 'return empty object'
      },
      {
        input: { 
          mediaTag: `video`,
          alt: `a video`,
        },
        expected: {},
        description: 'should not return alt as mediatag is video'
      },
      {
        input: { 
          mediaTag: `img`,
          alt: `my image`,
        },
        expected: {
          alt: `my image`
        },
        description: 'should return alt with given value'
      },
      {
        input: { 
          mediaTag: `img`,
        },
        expected: {
          alt: ``
        },
        description: 'should return alt with empty string as default value'
      },
      {
        input: { 
          mediaTag: `img`,
          alt: ``,
        },
        expected: {
          alt: ``
        },
        description: 'should return alt with empty string'
      },
      {
        input: {
          crossOrigin: `anonymous`
        },
        expected: {
          crossOrigin: `anonymous`
        },
        description: 'should return correct crossOrigin'
      },
      {
        input: {
          alt: `alternative description`,
          crossOrigin: `anonymous`,
          mediaTag: `img`
        },
        expected: {
          alt: "alternative description",
          crossOrigin: `anonymous`
        },
        description: 'should return correct media attributes'
      },
    ] )( 'it should $description', ( { 
        input,
        expected
      } ) => {
        // @ts-ignore
        expect( computeMediaAttributes( input ) ).toEqual( expected );
    } );
  } );

  describe( 'computePlaceholderStyle' , () => {
      it( 'should compute placeholder style with default values', () => {
        expect(
            computePlaceholderStyle(
              dummyAnchor, 
              'auto',
              'cover',
              'preview',
              '',
              '',
              1.5,
              '',
              'media:example.jpg',
              {},
              '',
              '',
              '',
              {},
              vi.fn()
          )
        ).toEqual( {
          backgroundSize: 'cover'
        } );
    } );

    it( 'should compute placeholder style correctly with cover mode', () => {
        expect(
            computePlaceholderStyle(
              dummyAnchor, 
              'auto',
              'cover',
              'preview',
              '',
              '',
              1.5,
              '',
              'media:example.jpg',
              {},
              '500',
              '400',
              'ease',
              {},
              vi.fn()
          )
        ).toEqual( {
          transitionDuration: '400',
          transitionDelay: '500',
          transitionTimingFunction: 'ease',
          backgroundSize: 'cover'
        } );
    } );

    it( 'should compute placeholder style correctly with contain mode and anchor', () => {
        expect(
            computePlaceholderStyle(
              dummyAnchor, 
              'auto',
              'contain',
              'preview',
              '',
              '',
              1.5,
              '',
              'media:example.jpg',
              {},
              '500',
              '400',
              'ease',
              {},
              vi.fn()
          )
        ).toEqual( {
          transitionDuration: '400',
          transitionDelay: '500',
          transitionTimingFunction: 'ease',
          backgroundSize: 'contain',
          backgroundPosition: 'top center'
        } );
    } );

    it( 'should compute placeholder style correctly with contain mode and anchor', () => {
        expect(
            computePlaceholderStyle(
              dummyAnchor, 
              'auto',
              'contain',
              'preview',
              '',
              '',
              1.5,
              '',
              'media:example.jpg',
              {},
              '500',
              '400',
              'ease',
              {},
              vi.fn()
          )
        ).toEqual( {
          transitionDuration: '400',
          transitionDelay: '500',
          transitionTimingFunction: 'ease',
          backgroundSize: 'contain',
          backgroundPosition: 'top center'
        } );
    } );

    it( 'should compute placeholder style correctly with contain mode and position', () => {
        expect(
            computePlaceholderStyle(
              {
                x: undefined,
                y: undefined
              }, 
              'auto',
              'contain',
              'preview',
              'top-right',
              '',
              1.5,
              '',
              'media:example.jpg',
              {},
              '500',
              '400',
              'ease',
              {},
              vi.fn()
          )
        ).toEqual( {
          transitionDuration: '400',
          transitionDelay: '500',
          transitionTimingFunction: 'ease',
          backgroundSize: 'contain',
          backgroundPosition: 'top-right'
        } );
    } );
  } );

  describe( 'computeStyle' , () => {
    it( 'should compute media style with default values', () => {
      const result = computeStyle(
          dummyAnchor,
          'img',
          'cover',
          '',
          '',
          '',
          ''
      );

      expect( result ).toEqual( {
        objectFit: 'cover'
      } );
    } );

    it( 'should compute media style with contain mode and anchor', () => {
      const result = computeStyle(
          dummyAnchor,
          'img',
          'contain',
          '',
          '',
          '',
          ''
      );

      expect( result ).toEqual( {
        objectFit: 'contain',
        objectPosition: 'top center'
      } );
    } );

    it( 'position should take precedence over anchor when using contain', () => {
      const result = computeStyle(
          dummyAnchor,
          'img',
          'contain',
          'center',
          '',
          '',
          ''
      );

      expect( result ).toEqual( {
        objectFit: 'contain',
        objectPosition: 'center'
      } );
    } );

    it( 'should compute media style when using div', () => {
      const result = computeStyle(
          dummyAnchor,
          'div',
          'contain',
          'center',
          '',
          '',
          ''
      );

      expect( result ).toEqual( {
        backgroundPosition: 'center',
        backgroundSize: 'contain'
      } );
    } );
  } );
  
  describe( 'computePlaceholderBackground' , () => {
    const placeholderData = {
      anchor: dummyAnchor,
      focus: 'auto',
      mode: 'cover',
      placeholder: 'preview',
      preTransform:'',
      src: 'media:example.mp4',
      ratio: 0.75,
      refit: undefined,
      transitions: {
        'fade': true
      },
      videoOptions: {}
    } as unknown as PlaceholderData;

    const elementStyle = {
      width: '400px',
      height: '300px',
      fontSize: undefined,
    };

    let placeholderElement;
    beforeEach( () => {
        setConfig( {
          domain: 'https://demo.twic.it'
        } );
        placeholderElement = document.createElement('div');
    } );

    test.each( [
      {
        input: {
          placeholderData: {
            ...placeholderData,
          },
          elementStyle
        },
        expected: 'https://demo.twic.it/example.mp4?twic=v1/focus=auto/cover=1000x750/output=preview',
        description: 'return correct backgroung url from given ratio',
      },
      {
        input: {
          placeholderData: {
              ...placeholderData,
              ...{ ratio: 0 },
          },
          elementStyle
        },
        expected: 'https://demo.twic.it/example.mp4?twic=v1/focus=auto/cover=1000x750/output=preview',
        description: 'use placeholder element dimensions to evaluate ratio',
      },
      {
        input: {
          placeholderData: {
              ...placeholderData,
              ...{ ratio: undefined },
          },
          elementStyle: {
            ...elementStyle,
            fontSize: '0.5px',
          },
        },
        expected: 'https://demo.twic.it/example.mp4?twic=v1/focus=auto/cover=1000x500/output=preview',
        description: 'evaluate ratio from --twic-ratio css variable',
      },
      {
        input: {
          placeholderData: {
            ...placeholderData,
            ...{ mode: 'contain' }
          },
          elementStyle
        },
        expected: 'https://demo.twic.it/example.mp4?twic=v1/contain=1000x750/output=preview',
        description: 'return correct backgroung using contain',
      },
      {
        input: {
          placeholderData: {
            ...placeholderData,
            ...{ mode: 'contain' }
          },
          elementStyle: {
              width: '400px',
              height: '300px',
              fontSize: undefined,
          },
        },
        expected: 'https://demo.twic.it/example.mp4?twic=v1/contain=1000x750/output=preview',
        description: 'return correct backgroung using contain mode',
      },
      {
        input: {
          placeholderData: {
            ...placeholderData,
            ...{ mode: 'contain', refit: '5p' }
          },
          elementStyle: {
              width: '400px',
              height: '300px',
              fontSize: undefined,
          },
        },
        expected: 'https://demo.twic.it/example.mp4?twic=v1/refit=auto(5p)/contain=1000x750/output=preview',
        description: 'return correct backgroung using contain and refit',
      },
      {
        input: {
          placeholderData: {
            ...placeholderData,
            ...{ mode: 'cover', refit: '5p' }
          },
          elementStyle: {
              width: '400px',
              height: '300px',
              fontSize: undefined,
          },
        },
        expected: 'https://demo.twic.it/example.mp4?twic=v1/refit=1000x750(5p)@top-center/output=preview',
        description: 'return correct backgroung using cover and refit',
      },
      {
        input: {
          placeholderData: {
            ...placeholderData,
            ...{ preTransform: 'flip=both/background=remove', placeholder: 'maincolor'}
          },
          elementStyle
        },
        expected: 'https://demo.twic.it/example.mp4?twic=v1/flip=both/background=remove/focus=auto/cover=1000x750/output=maincolor',
        description: 'take into account placeholder and preTransform',
      },
      {
        input: {
          placeholderData: {
            ...placeholderData,
            ...{ transitions: {
              zoom: true,
            } }
          },
          elementStyle
        },
        expected: '',
        description: 'return empty string when using zoom transition',
      },
      {
        input: {
          placeholderData: {
            ...placeholderData,
            ...{ placeholder: '' }
          },
          elementStyle
        },
        expected: '',
        description: 'return empty string when no placeholder',
      },
    ] )( 'it should $description', ( { input, expected } ) => {

      const { placeholderData , elementStyle: { width, height, fontSize } } = input;

      placeholderElement.style.width = width;
      placeholderElement.style.height = height;
      placeholderElement.style.fontSize = fontSize;

      const result = computePlaceholderBackground(
        placeholderElement,
        placeholderData as unknown as PlaceholderData
      );
      expect( result ).toEqual( expected );
    } );
  } );

  describe( 'parseTransition', () => {
    test.each( [
      {
          input: {
              className: '',
              src: 'media/example.jpg',
              transitions: {
                'fade' : true,
              },
              env: 'production',
          },
          expected: 'twic-w twic-tf',
          description: 'return correct wrapper class',
      },
      {
          input: {
              className: '',
              src: 'media/example.jpg',
              transitions: {
                'zoom' : true,
              },
              env: 'production',
          },
          expected: 'twic-w twic-tz',
          description: 'return correct wrapper class when using zoom transition',
      },
      {
          input: {
              className: '',
              src: 'media/example.jpg',
              transitions: {
                'none' : true,
              },
              env: 'production',
          },
          expected: 'twic-w',
          description: 'return correct wrapper class when no transition',
      },
      {
          input: {
              className: '',
              src: undefined,
              transitions: {
                'zoom' : true,
              },
              env: 'offline',
          },
          expected: 'twic-w twic-tz twic-offline twic-nosrc',
          description: 'return correct wrapper when offline and no src',
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      const { className, src, transitions, env } = input;
      setConfig( {
        domain: 'https://demo.twic.it',
        // @ts-ignore
        env: env,
      })
      // @ts-ignore
      expect( computeWrapperClass( className, src, transitions ) ).toEqual( expected );
    } );
  } );

  describe( 'computeWrapperStyle', () => {
    test.each( [
      {
        input: { ratio : 1 },
        expected: {
          'paddingTop': '100%'
        },
        description: 'compute padding trick correcly',
      },
      {
        input: { ratio : 0.5 },
        expected: {
          'paddingTop': '50%'
        },
        description: 'compute padding trick correcly using ratio <> 1',
      },
      {
        input: { ratio : 0 },
        expected: {
          'height' : '100%',
          'paddingTop': '0'
        },
        description: 'handle ratio=none (hero mode)',
      },
    ] )( 'it should $description', ( { input: { ratio }, expected } ) => {
      expect( computeWrapperStyle( ratio ) ).toEqual( expected );
    } );
  } );

  describe( 'computeHostStyle', () => {
    test.each( [
      {
        input: {},
        expected: {},
        description: 'return empty style as there is no zoom nor style',
      },
      {
        input: { zoom: 2},
        expected: { "--twic-zoom": "2" },
        description: 'return correct style with zoom',
      },
      {
        input: {
          style: {
            "width":`100%`,
            "height": `300px` 
          } 
        },
        expected: {
            "height": `300px`,
            "width":`100%`,  
        },
        description: 'return correct style from given style',
      },
      {
        input: {
          style: {
            "width":`100%`,
            "height": `300px` 
          },
          zoom : 2 
        },
        expected: {
            "height": `300px`,
            "width":`100%`,
            "--twic-zoom": `2`, 
        },
        description: 'return correct merged style from given style + zoom',
      },
    ] )( 'it should $description', ( { input: { style, zoom }, expected } ) => {
      // @ts-ignore
      expect( computeHostStyle( { style, zoom } ) ).toEqual( expected );
    } );
  } );
} );
