import units from '../units.js';
import { getAssetData, getPlaceholderData, goto, setupUnitTests } from '../helpers';

const testCases = [
  {
      description: `should display an image`,
      fn: async ( page, port ) => {
          const params = {
              src: 'football.jpg',
              mode: 'contain',
          };
          await goto( { page, params, port } );

          await page.waitForSelector('.twic-done');

          //console.log('Background Image URL:', await getPlaceholderData(page));
          //console.log('Image src:', await getAssetData(page));

          await page.setViewport({
            width: 200,
            height: 200,
            deviceScaleFactor: 1,
          });

          await page.waitForSelector('.twic-loading');
          await page.waitForSelector('.twic-done');
      },
  },
];

setupUnitTests( units, testCases );
