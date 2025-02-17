/* eslint-disable no-import-assign */
import { Platform } from 'react-native';

import type { Options } from './types';
import { installTwicPics } from '../_/install';
import { config } from '../_/config';
import { parseCachePolicy } from './parse';

const DEFAULT_ANTICIPATION = 0.2;
// eslint-disable-next-line no-magic-numbers
const DEFAULT_STEP = Platform.OS === `web` ? 100 : 10;
export default ( options: Options ): void => {
    const { anticipation = DEFAULT_ANTICIPATION, cachePolicy, step = DEFAULT_STEP } = options;
    installTwicPics( {
        ...{
            "maxDPR": 2,
        },
        ...options,
    } );
    config.anticipation = Math.max( 0, anticipation );
    config.step = step;
    config.cachePolicy = parseCachePolicy( cachePolicy ) ?? `none`;
};
