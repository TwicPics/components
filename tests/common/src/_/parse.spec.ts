

import { describe, expect, test } from 'vitest';

import { config } from '../../../../src/_/config';
import {
  parseAnchor,
  parseAnchors,
  parseAlt,
  parseAnticipation,
  parseBot,
  parseClass,
  parseClassName,
  parseDebug,
  parseDomain,
  parseDraggable,
  parseDuration,
  parseEager,
  parseEnv,
  parseFetchPriority,
  parseFocus,
  parseFocuses,
  parseFrom,
  parseHandleShadowDom,
  parseId,
  parseIntrinsic,
  parseMaxDrp,
  parseMediaTag,
  parseMode,
  parseModes,
  parsePath,
  parsePlaceholder,
  parsePosition,
  parsePositions,
  parsePreTransform,
  parsePreTransforms,
  parseRatio,
  parseRatios,
  parseRefit,
  parseSizes,
  parseSrc,
  parseStep,
  parseStyle,
  parseTabIndex,
  parseTo,
  parseTitle,
  parseTransition,
  parseTransitionDelay,
  parseTransitionDuration,
  parseTransitionTimingFunction,
  parseZoom
} from '../../../../src/_/parse';
import { Mode, Placeholder } from '../../../../src/_/types';

const testEmptyString = ( expected: any ) => (
  { 
      input: '',
      expected: expected,
      description: `return ${ expected } when string empty`,
  }
);

const testUndefined = ( expected: any ) => (
  { 
      input: undefined,
      expected: expected,
      description: `return ${ expected } when string undefined`,
  }
);

const testTrimOrUndefinedCases = [
  {
    ...testUndefined( undefined ),
  },
  {
    ...testEmptyString(undefined),
  },
  {
    input: 'a string',
    expected: 'a string',
    description: 'return correct value'
  },
  {
    input: ' a string ',
    expected: 'a string',
    description: 'return correct trimmed value'
  },
]

const testParseBooleanCasesFactory = ( expectedWhenUndefined: boolean | undefined ) => [
  {
    ...testUndefined( expectedWhenUndefined ),
  },
  {
    input: true,
    expected: true,
    description: 'return true when true is passed as boolean'
  },
  {
    input: 'true',
    expected: true,
    description: 'return true when true is passed as string'
  },
  {
    ...testEmptyString(true),
  },
  {
    input: false,
    expected: false,
    description: 'return false when false is passed as boolean'
  },
  {
    input: 'false',
    expected: false,
    description: 'return false when false is passed as string'
  },
];

const testParseBooleanCases = testParseBooleanCasesFactory( false );

const testParseNumberCases = [
  {
    ...testUndefined( undefined ),
  },
  {
    input: 5,
    expected: 5,
    description: 'return a correct number'
  },
  {
    input: '5.5',
    expected: 5.5,
    description: 'return a correct number from a string'
  },
  {
    input: ' 5.6 ',
    expected: 5.6,
    description: 'trim and return a correct number string',
  },
  {
    input: 0,
    expected: undefined,
    description: 'return undefined for zero',
  },
  {
    input: -5,
    expected: undefined,
    description: 'return undefined for negative number',
  },
  {
    input: '-5',
    expected: undefined,
    description: 'return undefined for negative number provided as a string',
  },
];

describe( 'Parsing functions', () => {

  describe( 'parseAnchor', () => {
    test.each( [
      {
        input: 'left',
        expected: {
          x: 'left',
        },
        description: 'return correct anchor with x only'
      },
      {
        input: 'right',
        expected: {
          x: 'right',
        },
        description: 'return correct anchor with x only'
      },
      {
        input: 'top',
        expected: {
          y: 'top'
        },
        description: 'return correct anchor with y only'
      },
      {
        input: 'bottom',
        expected: {
          y: 'bottom'
        },
        description: 'return correct anchor with y only'
      },
      {
        input: 'top bottom',
        expected: {
          y: 'bottom'
        },
        description: 'ignore invalid x anchor'
      },
      {
        input: 'left top',
        expected: {
          x: 'left',
          y: 'top'
        },
        description: 'return correct anchor with x and y'
      },
      {
        input: '   right-bottom    ',
        expected: {
          x: 'right',
          y: 'bottom'
        },
        description: 'should return a correct trimmed anchor and accept - separator'
      },
    ] )( 'it should $description', ( { input, expected } ) =>
      expect( parseAnchor( input ) ).toEqual( expected )
    );
  } );

  describe( 'parseAnchors', () => {
    test.each( [
      {
        input: '@sm left @md right @lg top @xl bottom-left @2xl center',
        expected: {
          '0': {},
          '640': { x: 'left' },
          '768': { x: 'right' },
          '1024': { y: 'top' },
          '1280': { x: 'left', y: 'bottom' },
          '1536': {},
        },
        description: 'should parse breakpoints with anchors values using tailwind notation'
      },
      {
        input: '    @sm  left  @md  right    @lg  top  @xl   bottom-left   @2xl   center   ',
        expected: {
          '0': {},
          '640': { x: 'left' },
          '768': { x: 'right' },
          '1024': { y: 'top' },
          '1280': { x: 'left', y: 'bottom' },
          '1536': {},
        },
        description: 'should trim values and parse breakpoints with anchors values using tailwind notation'
      },
      {
        input: '@111 left @222 right @333 top @444 bottom-left @555 center',
        expected: {
          '0': {},
          '111': { x: 'left' },
          '222': { x: 'right' },
          '333': { y: 'top' },
          '444': { x: 'left', y: 'bottom' },
          '555': {},
        },
        description: 'should parse breakpoints with anchors values using fixed breakpoint'
      },
      {
        input: '',
        expected: {
          '0': {},
        },
        description: 'should return default anchors when empty is provided'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      expect( parseAnchors( input ) ).toEqual( expected );
    } );
  } );

  describe( 'parseAlt', () => {
    test.each( [
      {
        ...testUndefined( '' ),
      },
      {
        ...testEmptyString(''),
      },
      {
        input: 'an image description',
        expected: 'an image description',
        description: 'return correct value'
      },
      {
        input: '  an image description  ',
        expected: 'an image description',
        description: 'return correct trimmed value'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      // @ts-ignore
      expect( parseAlt( input  ) ).toBe( expected );
    } );
  } );

  describe( 'parseAnticipation', () => {
    testParseNumberCases.forEach(( { description, input, expected } ) => {
      test( `it should ${ description } `, () => {
        // @ts-ignore
        expect( parseAnticipation( input ) ).toBe( expected );
      } );
    } );
  } );

  describe( 'parseBot', () => {
    test.each( [
      {
        ...testUndefined( undefined ),
      },
      {
        ...testEmptyString(''),
      },
      {
        input: 123,
        expected: undefined,
        description: 'return empty undefined for invalid value'
      },
      {
        input: 'bot',
        expected: 'bot',
        description: 'return correct value'
      },
      {
        input: ' bot ',
        expected: 'bot',
        description: 'return correct trimmed value'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      // @ts-expect-error
      expect( parseBot( input  ) ).toBe( expected );
    } );
  } );

  describe( 'parseClass', () => {
    testTrimOrUndefinedCases.forEach( ( { description, input, expected } ) => {
      test( `it should ${ description } `, () => {
        // @ts-ignore
        expect( parseClass( input ) ).toBe( expected );
      } );
    } );
  } );

  describe( 'parseClassName', () => {
    testTrimOrUndefinedCases.forEach(( { description, input, expected } ) => {
      test( `it should ${ description } `, () => {
        // @ts-ignore
        expect( parseClassName( input ) ).toBe( expected );
      } );
    } );
  } );

  describe( 'parseDebug', () => {
    testParseBooleanCases.forEach(( { description, input, expected } ) => {
      test( `it should ${ description } `, () => {
        expect( parseDebug( input ) ).toBe( expected );
      } );
    } );
  } );

  describe( 'parseDomain', () => {
    test.each( [
      {
        ...testUndefined( undefined ),
      },
      {
        ...testEmptyString(undefined),
      },
      {
        input: 'invalid',
        expected: undefined,
        description: 'return undefined for invalid domain'
      },
      {
        input: 'http://my-domain',
        expected: 'http://my-domain',
        description: 'accept http domain'
      },
      {
        input: 'https://my-domain',
        expected: 'https://my-domain',
        description: 'accept https domain'
      },
      {
        input: 'https://my-domain/',
        expected: 'https://my-domain',
        description: 'remove trailing slash'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      // @ts-ignore
      expect( parseDomain( input ) ).toBe( expected );
    } );
  } );

  describe( 'parseDraggable', () => {
    testParseBooleanCasesFactory( undefined ).forEach(( { description, input, expected } ) => {
      test( `it should ${ description } `, () => {
        expect( parseDraggable( input ) ).toBe( expected );
      } );
    } );
  } );

  describe( 'parseDuration', () => {
    testParseNumberCases.forEach(( { description, input, expected } ) => {
      test( `it should ${ description } `, () => {
        // @ts-ignore
        expect( parseDuration( input ) ).toBe( expected );
      } );
    } );
  } );

  describe( 'parseEager', () => {
    testParseBooleanCases.forEach(( { description, input, expected } ) => {
      test( `it should ${ description } `, () => expect( parseEager( input ) ).toBe( expected ) );
    } );
  } );

  describe( 'parseEnv', () => {
    test.each( [
      {
        ...testUndefined( undefined ),
      },
      {
        input: 'production',
        expected: 'production',
        description: 'return correct production value'
      },
      {
        input: 'offline',
        expected: 'offline',
        description: 'return correct offline value'
      },
      {
        input: 'debug',
        expected: 'debug',
        description: 'return correct debug value'
      },
      {
        input: 'invalid',
        expected: undefined,
        description: 'return undefined when invalid'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      // @ts-ignore
      expect( parseEnv( input  ) ).toBe( expected );
    } );
  } );

  describe( 'parseFetchPriority', () => {
    test.each( [
      {
        ...testUndefined( undefined ),
      },
      {
        input: 'high',
        expected: 'high',
        description: 'return correct high value'
      },
      {
        input: 'low',
        expected: 'low',
        description: 'return correct low value'
      },
      {
        input: 'auto',
        expected: 'auto',
        description: 'return correct auto value'
      },
      {
        input: 'invalid',
        expected: undefined,
        description: 'return undefined when invalid'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      // @ts-ignore
      expect( parseFetchPriority( input ) ).toBe( expected );
    } );
  } )

  describe( 'parseFocus', () => {
    test.each( [
      {
        ...testUndefined( undefined ),
      },
      {
        ...testEmptyString(undefined),
      },
      {
        input: 'none',
        expected: '',
        description: 'return string empty when "none" is passed'
      },
      {
        input: 'auto',
        expected: 'auto',
        description: 'return a correct focus values'
      },
      {
        input: ' 50px60py ',
        expected: '50px60py',
        description: 'return a correct trimmed focus values'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      // @ts-ignore
      expect( parseFocus( input  ) ).toBe( expected );
    } );
  } );

  describe( 'parseFocuses', () => {
    test.each( [
      {
        input: 'none @sm auto @md 0px10px @lg 10px20px @xl 20px30px @2xl 40px50px',
        expected: {
          '0': '',
          '640': 'auto',
          '768': '0px10px',
          '1024': '10px20px',
          '1280': '20px30px',
          '1536': '40px50px',
        },
        description: 'should parse breakpoints with focus values using tailwind notation'
      },
      {
        input: '  none   @sm  auto  @md  0px10px    @lg  10px20px  @xl   20px30px   @2xl   40px50px   ',
        expected: {
          '0': '',
          '640': 'auto',
          '768': '0px10px',
          '1024': '10px20px',
          '1280': '20px30px',
          '1536': '40px50px',
        },
        description: 'should trim values and parse breakpoints with focus values using tailwind notation'
      },
      {
        input: 'none @111 auto @222 0px10px @333 10px20px @444 20px30px @555 40px50px',
        expected: {
          '0': '',
          '111': 'auto',
          '222': '0px10px',
          '333': '10px20px',
          '444': '20px30px',
          '555': '40px50px',
        },
        description: 'should parse breakpoints with focus values using fixed breakpoint'
      },
      {
        input: '',
        expected: {
          '0': undefined,
        },
        description: 'should return default focus when empty is provided'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      expect( parseFocuses( input ) ).toEqual( expected );
    } );
  } );

  describe( 'parseFrom', () => {
    testParseNumberCases.forEach(( { description, input, expected } ) => {
      test( `it should ${ description } `, () => {
        // @ts-ignore
        expect( parseFrom( input ) ).toBe( expected );
      } );
    } );
  } );

  describe( 'parseHandleShadowDom', () => {
    testParseBooleanCases.forEach(( { description, input, expected } ) => {
      test( `it should ${ description } `, () => {
        expect( parseHandleShadowDom( input ) ).toBe( expected );
      } );
    } );
  } );

  describe( 'parseId', () => {
    test.each( [
      {
        ...testUndefined( undefined ),
      },
      {
        ...testEmptyString( undefined ),
      },
      {
        input: 'my-id',
        expected: 'my-id',
        description: 'return a correct id'
      },
      {
        input: '  my-id  ',
        expected: 'my-id',
        description: 'return a correct trimed id'
      },
      {
        input: 'inv alid',
        expected: undefined,
        description: 'return undefined for invalid values'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      // @ts-ignore
      expect( parseId( input ) ).toBe( expected );
    } );
  } );

  describe( 'parseIntrinsic', () => {
    test.each( [
      {
        ...testUndefined( undefined ),
      },
      {
        ...testEmptyString( undefined ),
      },
      {
        input: '1000x2000',
        expected: '1000x2000',
        description: 'return a correct intrinsic value'
      },
      {
        input: '  1000  x  2000 ',
        expected: '1000x2000',
        description: 'return a correct trimed intrinsic value'
      },
      {
        input: 'invalid',
        expected: undefined,
        description: 'return undefined for invalid values'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      // @ts-ignore
      expect( parseIntrinsic( input ) ).toBe( expected );
    } );
  } );

  describe( 'parseMaxDrp', () => {
    test.each( [
      {
        ...testUndefined( undefined ),
      },
      {
        input: 5,
        expected: 5,
        description: 'return a correct number'
      },
      {
        input: '5.5',
        expected: 5.5,
        description: 'return a correct number from a string'
      },
      {
        input: ' 5.6 ',
        expected: 5.6,
        description: 'trim and return a correct number string',
      },
      {
        ...testEmptyString( undefined ),
      },
      {
        input: 0.9,
        expected: undefined,
        description: 'return undefined when privided a numver lower than 1',
      },
      {
        input: -5,
        expected: undefined,
        description: 'return undefined for negative number',
      },
      {
        input: '-5',
        expected: undefined,
        description: 'return undefined for negative number provided as a string',
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      // @ts-ignore
      expect( parseMaxDrp( input ) ).toBe( expected );
    } );
  } );

  describe( 'parseMediaTag', () => {
    test.each( [
      {
        ...testUndefined( undefined ),
      },
      {
        ...testEmptyString( undefined ),
      },
      {
        input: 'IMG',
        expected: 'img',
        description: 'return a lower-case MediaTag'
      },
      {
        input: ' IMG ',
        expected: 'img',
        description: 'return a trimmed lower-case MediaTag'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      // @ts-ignore
      expect( parseMediaTag( input  ) ).toBe( expected );
    } );
  } );

  describe( 'parseMode', () => {
    test.each( [
      {
        ...testUndefined( undefined ),
      },
      {
        input: 'invalid',
        expected: undefined,
        description: 'return undefined mode when invalid'
      },
      {
        input: 'cover',
        expected: 'cover',
        description: 'return specified mode'
      },
      {
        input: 'contain',
        expected: 'contain',
        description: 'return specified mode'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      expect( parseMode( input as Mode ) ).toBe( expected );
    } );
  } );

  describe( 'parseMode', () => {
    test.each( [
      {
        input: 'cover @sm contain @md cover @lg contain @xl cover @2xl contain',
        expected: {
          '0': 'cover',
          '640': 'contain',
          '768': 'cover',
          '1024': 'contain',
          '1280': 'cover',
          '1536': 'contain',
        },
        description: 'should parse breakpoints with mode values using tailwind notation'
      },
      {
        input: '  cover   @sm  contain  @md  cover    @lg  contain  @xl   cover   @2xl   contain   ',
        expected: {
          '0': 'cover',
          '640': 'contain',
          '768': 'cover',
          '1024': 'contain',
          '1280': 'cover',
          '1536': 'contain',
        },
        description: 'should trim values and parse breakpoints with mode values using tailwind notation'
      },
      {
        input: 'cover @111 contain @222 cover @333 contain @444 cover @555 contain',
        expected: {
          '0': 'cover',
          '111': 'contain',
          '222': 'cover',
          '333': 'contain',
          '444': 'cover',
          '555': 'contain',
        },
        description: 'should parse breakpoints with mode values using fixed breakpoint'
      },
      {
        input: '',
        expected: {
          '0': 'cover',
        },
        description: 'should return default mode when empty is provided'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      expect( parseModes( input ) ).toEqual( expected );
    } );
  } );

  describe( 'parsePath', () => {
    test.each( [
      {
        ...testUndefined( '' ),
      },
      {
        input: 'my-path',
        expected: 'my-path/',
        description: 'adds trailing slash'
      },
      {
        input: 'my-very/path',
        expected: 'my-very/path/',
        description: 'return correct path and subpath'
      },
      {
        input: '/my-path//',
        expected: 'my-path/',
        description: 'should remove superfluous leading and trailing slash'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      // @ts-ignore
      expect( parsePath( input ) ).toBe( expected );
    } );
  } );

  describe( 'parsePlaceholder', () => {
    test.each( [
      {
        ...testUndefined( 'preview' ),
      },
      {
        input: 'invalid',
        expected: 'preview',
        description: 'return default placeholder when invalid'
      },
      {
        input: 'preview',
        expected: 'preview',
        description: 'return specified placeholder'
      },
      {
        input: 'maincolor',
        expected: 'maincolor',
        description: 'return specified placeholder'
      },
      {
        input: 'meancolor',
        expected: 'meancolor',
        description: 'return specified placeholder'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      expect( parsePlaceholder( input as Placeholder ) ).toBe( expected );
    } );
  } );

  describe( 'parsePosition', () => {
    testTrimOrUndefinedCases.forEach(( { description, input, expected } ) => {
      test( `it should ${ description } `, () => {
        // @ts-ignore
        expect( parsePosition( input ) ).toBe( expected );
      } );
    } );
  } );

  describe( 'parsePositions', () => {
    test.each( [
      {
        input: 'top  @sm left @md bottom @lg right @xl center @2xl top-right',
        expected: {
          '0': 'top',
          '640': 'left',
          '768': 'bottom',
          '1024': 'right',
          '1280': 'center',
          '1536': 'top-right',
        },
        description: 'should parse breakpoints with position values using tailwind notation'
      },
      {
        input: '  top   @sm  left  @md  bottom    @lg  right  @xl   center   @2xl   top-right   ',
        expected: {
          '0': 'top',
          '640': 'left',
          '768': 'bottom',
          '1024': 'right',
          '1280': 'center',
          '1536': 'top-right',
        },
        description: 'should trim values and parse breakpoints with position values using tailwind notation'
      },
      {
        input: 'top @111 left @222 bottom @333 right @444 center @555 top-right',
        expected: {
          '0': 'top',
          '111': 'left',
          '222': 'bottom',
          '333': 'right',
          '444': 'center',
          '555': 'top-right',
        },
        description: 'should parse breakpoints with ratio position using fixed breakpoint'
      },
      {
        input: '',
        expected: {
          '0': undefined,
        },
        description: 'should return default ratio when empty is provided'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      expect( parsePositions( input ) ).toEqual( expected );
    } );
  } );

  describe( 'parsePreTransform', () => {
    test.each( [
      {
        ...testUndefined( undefined ),
      },
      {
        input: 'none',
        expected: '',
        description: 'return string empty when none'
      },
      {
        input: 'flip=x',
        expected: 'flip=x',
        description: 'return correct simple transformation'
      },
      {
        input: 'flip=x/background=remove+blue',
        expected: 'flip=x/background=remove+blue',
        description: 'return correct chained transformation'
      },
      {
        input: '///flip=x/background=remove+blue',
        expected: 'flip=x/background=remove+blue',
        description: 'remove leading / and return correct chained transformation'
      },
      {
        input: '  flip=x/background=remove+blue  ',
        expected: 'flip=x/background=remove+blue',
        description: 'trim and return correct chained transformation'
      },
      {
        input: '  crop=1000x1000@200x200  ',
        expected: 'crop=1000x1000@200x200',
        description: 'parse crop with anchor and numerical values'
      },
      {
        input: '  crop=1000x1000@0.5sx0.6s  ',
        expected: 'crop=1000x1000@0.5sx0.6s',
        description: 'parse crop with anchor and relative values'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      // @ts-ignore
      expect( parsePreTransform( input ) ).toBe( expected );
    } );
  } );

  describe( 'parsePreTransforms', () => {
    test.each( [
      {
        input: 'none @sm crop=1000x1000@200x200 @md none @lg flip=y/crop=1000x1000@200x200/background=remove @xl flip=both @2xl none',
        expected: {
          '0': '',
          '640': 'crop=1000x1000@200x200',
          '768': '',
          '1024': 'flip=y/crop=1000x1000@200x200/background=remove',
          '1280': 'flip=both',
          '1536': '',
        },
        description: 'should parse breakpoints with preTransform values using tailwind notation'
      },
      {
        input: '  none    @sm    flip=x    @md   none    @lg   flip=y/background=remove   @xl   flip=both  @2xl none   ',
        expected: {
          '0': '',
          '640': 'flip=x',
          '768': '',
          '1024': 'flip=y/background=remove',
          '1280': 'flip=both',
          '1536': '',
        },
        description: 'should trim values and parse breakpoints with preTransform values using tailwind notation'
      },
      {
        input: 'none @111 flip=x @222 none @333 flip=y/background=remove @444 flip=both @555 none',
        expected: {
          '0': '',
          '111': 'flip=x',
          '222': '',
          '333': 'flip=y/background=remove',
          '444': 'flip=both',
          '555': '',
        },
        description: 'should parse breakpoints with preTransform values using fixed breakpoint'
      },
      {
        input: '',
        expected: {
          '0': undefined,
        },
        description: 'should return default preTransform when empty is provided'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      expect( parsePreTransforms( input ) ).toEqual( expected );
    } );
  } );

  describe( 'parseRatio', () => {
    test.each( [
      {
        ...testUndefined( undefined ),
      },
      {
        input: 'none',
        expected: 0,
        description: 'return 0 when "none" provided'
      },
      {
        input: '1',
        expected: 1,
        description: 'return correct ratio when integer as string is provided'
      },
      {
        input: '2.5',
        expected: 0.4,
        description: 'return correct ratio when a decimal a string is provided'
      },
      {
        input: 2,
        expected: 0.5,
        description: 'return correct ratio when integer provided'
      },
      {
        input: '1/1',
        expected: 1,
        description: 'return correct ratio when x/y is provided'
      },
      {
        input: '4/3',
        expected: 0.75,
        description: 'return correct ratio when x/y is provided'
      },
      {
        input: '4:3',
        expected: 0.75,
        description: 'return correct ratio when x:y is provided'
      },
      {
        input: ' 4:3 ',
        expected: 0.75,
        description: 'return trimmed and correct ratio when x:y is provided'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      // @ts-ignore
      expect( parseRatio( input ) ).toBe( expected );
    } );
  } );

  describe( 'parseRatios', () => {
    test.each( [
      {
        input: '3/4 @sm 1 @md 4:3 @lg 16/9 @xl 21/9 @2xl 2.39',
        expected: {
          '0': 1.3333333333333333,
          '640': 1,
          '768': 0.75,
          '1024': 0.5625,
          '1280': 0.42857142857142855,
          '1536': 0.41841004184100417,
        },
        description: 'should parse breakpoints with ratio values using tailwind notation'
      },
      {
        input: '3/4 @111 1 @222 4:3 @333 16/9 @444 21/9 @555 2.39',
        expected: {
          '0': 1.3333333333333333,
          '111': 1,
          '222': 0.75,
          '333': 0.5625,
          '444': 0.42857142857142855,
          '555': 0.41841004184100417,
        },
        description: 'should parse breakpoints with ratio values using fixed breakpoint'
      },
      {
        input: '',
        expected: {
          '0': 1,
        },
        description: 'should return default ratio when empty is provided'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      expect( parseRatios( input ) ).toEqual( expected );
    } );
  } );

  describe( 'parseRefit', () => {
    test.each( [
      {
        ...testUndefined( undefined ),
      },
      {
        input: 'true',
        expected: '',
        description: 'return empty string when true as string'
      },
      {
        input: true,
        expected: '',
        description: 'return empty string when true'
      },
      {
        input: 'false',
        expected: undefined,
        description: 'return undefined when false as string'
      },
      {
        input: false,
        expected: undefined,
        description: 'return undefined when false'
      },
      {
        input: '5p',
        expected: '5p',
        description: 'return a correct simple refit string'
      },
      {
        input: '10,(5/100)s',
        expected: '10,(5/100)s',
        description: 'return a correct complex refit string'
      },
      {
        input: ' 10,(5/100)s ',
        expected: '10,(5/100)s',
        description: 'return a correct trimmed refit string'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      // @ts-ignore
      expect( parseRefit( input ) ).toBe( expected );
    } );
  } );

  describe( 'parseSizes', () => {
    test.each( [
      {
        input: ' (max-width: 1200px) calc(100vw - 48px),1200px ',
        expected: {
          '0': '(max-width: 1200px) calc(100vw - 48px),1200px'
        },
        description: 'return a correct trimmed sizes object'
      },
      {
        input: '(max-width: 1200px) calc(100vw - 48px),\n1200px',
        expected: {
          '0': '(max-width: 1200px) calc(100vw - 48px),1200px'
        },
        description: 'should have removed carriage return'
      },
      {
        input: '',
        expected: {
          '0': undefined
        },
        description: 'should return undefined for empty string'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      expect( parseSizes( input ) ).toEqual( expected );
    } );
  } );

  describe( 'parseSrc', () => {
    const originalConfig = { ...config };
    test.each( [
      {
        input: 'mysrc',
        expected: '',
        description: 'return an empty string in offline mode',
        before: () => {
          config.env = 'offline';
        },
        after: () => {
          Object.assign(config, originalConfig);
        }
      },
      {
        ...testUndefined( 'placeholder:red' ),
      },
      {
        ...testEmptyString( 'placeholder:red' ),
      },
      {
        input: 'image/my-image.jpg',
        expected: 'media:image/my-image.jpg',
        description: 'return a correct src path'
      },
      {
        input: ' image/my-image.jpg ',
        expected: 'media:image/my-image.jpg',
        description: 'return a correct trimmed src path'
      },
      {
        input: 'placeholder:green',
        expected: 'placeholder:green',
        description: 'return a special path if asked',
      },
      {
        input: 'https://demo.twic.pics/my-absolute-path.image.jpg',
        expected: 'media:my-absolute-path.image.jpg',
        description: 'return a correct path from an absolute url',
        before: () => {
          config.domain = 'https://demo.twic.pics';
        },
        after: () => {
          Object.assign(config, originalConfig);
        }
      },
    ] )( 'it should $description', ( { input, expected, before, after } ) => {
      if (before) {
        before();
      }
      // @ts-ignore
      expect( parseSrc( input ) ).toBe( expected );
      if (after) {
        after();
      }
    } );
  } );

  describe( 'parseStep', () => {
    testParseNumberCases.forEach(( { description, input, expected } ) => {
      test( `it should ${ description } `, () => {
        // @ts-ignore
        expect( parseStep( input ) ).toBe( expected );
      } );
    } );
  } );

  describe( 'parseStyle', () => {
    test.each( [
      {
        input: undefined,
        expected: undefined,
        description: 'return empty object when undefined'
      },
      {
        input: ``,
        expected: {},
        description: 'return empty object when empty string'
      },
      {
        input: `invalid`,
        expected: {},
        description: 'return empty object when invalid'
      },
      {
        input: `width:100%;height:auto;max-width:300px;`,
        expected: {
            "height": "auto",
            "max-width": "300px",
            "width": "100%",
        },
        description: 'return correct style from string'
      },
      {
        input: ` width : 100% ;   height:auto;    max-width:  300px ; `,
        expected: {
            "height": "auto",
            "max-width": "300px",
            "width": "100%",
        },
        description: 'return correct trimmed style from string'
      },
      {
        input: {
            width: `100%`,
            "max-width": `300px`,
            height: `auto`
        },
        expected: {
            "height": "auto",
            "max-width": "300px",
            "width": "100%",
        },
        description: 'return correct style from object'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
        expect( parseStyle( input ) ).toEqual( expected );
    } );
  } );

  describe( 'parseTo', () => {
    testParseNumberCases.forEach(( { description, input, expected } ) => {
      test( `it should ${ description } `, () => {
        // @ts-ignore
        expect( parseTo( input ) ).toBe( expected );
      } );
    } );
  } );

  describe( 'parseTabIndex', () => {
    test.each( [
      {
        ...testUndefined( undefined ),
      },
      {
        ...testEmptyString( undefined ),
      },
      {
        input: 'invalid',
        expected: undefined,
        description: 'return undefined when invalid'
      },
      {
        input: 12,
        expected: '12',
        description: 'return a correct tabindex from num'
      },
      {
        input: '23',
        expected: '23',
        description: 'return a correct tabindex from string'
      },
      {
        input: '  23  ',
        expected: '23',
        description: 'return a correct trimed tabindex from string'
      },
      {
        input: '  23.3  ',
        expected: undefined,
        description: 'return undefined as input is not an interger'
      },
    ] )( 'it should $description', ( { input, expected } ) => {
        expect( parseTabIndex( input ) ).toBe( expected );
    } );
  } );

  describe( 'parseTitle', () => {
    test.each( [
      {
        ...testUndefined( undefined ),
      },
      {
        input: 'a title',
        expected: 'a title',
        description: 'return correct title'
      },
      {
        input: ' a title ',
        expected: 'a title',
        description: 'return trimmed title',
      },
      {
        ...testEmptyString( '' ),
      }
    ] )( 'it should $description', ( { input, expected } ) => {
      // @ts-ignore
      expect( parseTitle( input ) ).toBe( expected );
    } );
  } );

  describe( 'parseTransition', () => {
    test.each( [
      {
        input: 'true',
        expected: {
          'fade': true
        },
        description: 'return fade transition from string true',
      },
      {
        input: 'false',
        expected: {
          'none': true
        },
        description: 'return none string from string false',
      },
      {
        input: true,
        expected: {
          'fade': true
        },
        description: 'return fade transition from true',
      },
      {
        input: false,
        expected: {
          'none': true
        },
        description: 'return none transition from false',
      },
      {
        input: 'fade',
        expected: {
          'fade': true
        },
        description: 'return fade',
      },
      {
        input: ' fade ',
        expected: {
          'fade': true
        },
        description: 'trim string and return fade',
      },
      {
        input: ' none ',
        expected: {
          'none': true
        },
        description: 'trim string and return none',
      },
      {
        input: ' zoom ',
        expected: {
          'zoom': true
        },
        description: 'trim string and return zoom',
      },
      {
        input: 'invalid',
        expected: {
          'fade': true
        },
        description: 'defaults to fade',
      },
    ] )( 'it should $description', ( { input, expected } ) => {
      expect( parseTransition( input ) ).toEqual( expected );
    } );
  } );

  describe( 'parseTransitionDelay', () => {
    testTrimOrUndefinedCases.forEach(( { description, input, expected } ) => {
      test( `it should ${ description } `, () => {
        // @ts-ignore
        expect( parseTransitionDelay( input ) ).toBe( expected );
      } );
    } );
  } );

  describe( 'parseTransitionDuration', () => {
    testTrimOrUndefinedCases.forEach(( { description, input, expected } ) => {
      test( `it should ${ description } `, () => {
        // @ts-ignore
        expect( parseTransitionDuration( input ) ).toBe( expected );
      } );
    } );
  } );

  describe( 'parseTransitionTimingFunction', () => {
    testTrimOrUndefinedCases.forEach(( { description, input, expected } ) => {
      test( `it should ${ description } `, () => {
        // @ts-ignore
        expect( parseTransitionTimingFunction( input ) ).toBe( expected );
      } );
    } );
  } );

  describe( 'parseZoom', () => {
    test.each( [
      {
        ...testUndefined( undefined ),
      },
      {
        ...testEmptyString( undefined ),
      },
      {
        input: 2,
        expected: 2,
        description: 'parse 2 for zoom=2',
      },
      {
        input: '2',
        expected: 2,
        description: 'parse 2 for zoom="2"',
      },
      {
        input: ' 2 ',
        expected: 2,
        description: 'trim input and parse 2 for zoom=" 2 "',
      },
      {
        input: 2.5,
        expected: 2.5,
        description: 'parse decimal zoom from number',
      },
      {
        input: '2.5',
        expected: 2.5,
        description: 'parse decimal zoom from string',
      },
      {
        input: ' 2.5 ',
        expected: 2.5,
        description: 'trim and parse decimal zoom from string',
      }
    ] )( 'it should $description', ( { input, expected } ) => {
      // @ts-ignore
      expect( parseZoom( input ) ).toBe( expected );
    } );
  } );
} );
