import { expect } from 'vitest';
import units from '../units.js';
import { getPlaceholderData, goto, setupUnitTests } from '../helpers.js';
import { isTruthy } from '../utils.js';

const testCases = [
    {
        description: 'TwicImg should render correct HTML with placeholder',
        fn: async ( page, port ) => {
            const params = {
              src: 'football.jpg',
            };
            await goto( { page, params, port } );
            const asset = await page.$( `.twic-i > .twic-w > img, .twic-i > twicmedia > .twic-w > img` );
            const placeholderData = await getPlaceholderData( page, `img~div` );
            expect( asset ).not.toBe( null );
            expect( isTruthy( placeholderData[ 'background-image' ] ) ).toBe( true );
        },
    },
    {
        description: 'TwicImg should render correct HTML without placeholder',
        fn: async ( page, port ) => {
            const params = {
              src: 'football.jpg',
              placeholder: 'none',
            };
            await goto( { page, params, port } );
            const asset = await page.$( `.twic-i > .twic-w > img, .twic-i > twicmedia > .twic-w > img` );
            const placeholderData = await getPlaceholderData( page, `img~div` );
            expect( asset ).not.toBe( null );
            expect( isTruthy( placeholderData[ 'background-image' ] ) ).toBe( false );
        },
    },
    {
        description: 'TwicVideo should render correct HTML with placeholder',
        fn: async ( page, port ) => {
            const params = {
              src: 'video/skater.mp4',
              media: 'video',
            };
            await goto( { page, params, port } );
            const asset = await page.$( `.twic-i > .twic-w > video, .twic-i > twicmedia > .twic-w > video` );
            const placeholderData = await getPlaceholderData( page, `video~div` );
            expect( asset ).not.toBe( null );
            expect( isTruthy( placeholderData[ 'background-image' ] ) ).toBe( true );
        },
    },
    {
        description: 'TwicVideo should render correct HTML without placeholder',
        fn: async (page, port ) => {
            const params = {
                src: 'video/skater.mp4',
                media: 'video',
                placeholder: 'none'
            };
            await goto( { page, params, port } );
            const asset = await page.$( `.twic-i > .twic-w > video, .twic-i > twicmedia > .twic-w > video` );
            const placeholderData = await getPlaceholderData( page, `video~div` );
            expect( asset ).not.toBe( null );
            expect( isTruthy( placeholderData[ 'background-image' ] ) ).toBe( false );
        },
    },
    {
      description: 'TwicPicture should render correct HTML',
      fn: async (page, port ) => {
          const params = {
              src: 'football.jpg',
              media: 'picture',
          };
          await goto( { page, params, port } );
          const asset = await page.$( `.twic-i > picture.twic-p > img, twicpicture > picture.twic-p > img` );
          expect( asset ).not.toBe( null );
      },
  },
];

setupUnitTests( units, testCases );
