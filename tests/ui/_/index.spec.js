// tests/twicComponents.test.js
import { expect } from 'vitest';
import units from '../units.js';
import { goto, setupUnitTests } from '../helpers';

const testCases = [
    {
        description: 'TwicImg should render correct HTML with placeholder',
        fn: async ( page, port ) => {
            const params = {
              src: 'football.jpg',
            };
            await goto( { page, params, port } );
            const asset = await page.$( `.twic-i > .twic-w.twic-tf >img, .twic-i > twicmedia > .twic-w.twic-tf > img` );
            const placeholder = await page.$( `.twic-i > .twic-w.twic-tf >img~div, .twic-i > twicmedia > .twic-w.twic-tf >img~div`);
            expect( asset ).not.toBe( null );
            expect( placeholder ).not.toBe( null );
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
            const asset = await page.$( `.twic-i > .twic-w.twic-tf >img, .twic-i > twicmedia > .twic-w.twic-tf > img` );
            const placeholder = await page.$( `.twic-i > .twic-w.twic-tf >img~div, .twic-i > twicmedia > .twic-w.twic-tf >img~div`);
            expect( asset ).not.toBe( null );
            expect( placeholder ).toBe( null );
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
            const asset = await page.$( `.twic-i > .twic-w.twic-tf >video, .twic-i > twicmedia > .twic-w.twic-tf > video` );
            const placeholder = await page.$( `.twic-i > .twic-w.twic-tf >video~div, .twic-i > twicmedia > .twic-w.twic-tf >video~div`);
            expect( asset ).not.toBe( null );
            expect( placeholder ).not.toBe( null );
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
            const asset = await page.$( `.twic-i > .twic-w.twic-tf >video, .twic-i > twicmedia > .twic-w.twic-tf > video` );
            const placeholder = await page.$( `.twic-i > .twic-w.twic-tf >video~div, .twic-i > twicmedia > .twic-w.twic-tf >video~div`);
            expect( asset ).not.toBe( null );
            expect( placeholder ).toBe( null );
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
