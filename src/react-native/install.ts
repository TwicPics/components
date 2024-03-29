/* eslint-disable no-import-assign */

import { installTwicPics } from '../_/install';
import { config } from '../_/config';
import type { Options } from './types';

const ANTICIPATION = 0.2;
const STEP = 10;
export default ( options: Options ): void => {
    const { anticipation = ANTICIPATION, cachePolicy, step } = options;
    installTwicPics( {
        ...{
            "maxDPR": 2,
        },
        ...options,
    } );
    config.anticipation = anticipation;
    config.step = step || STEP;
    config.cachePolicy = cachePolicy || `none`;
};
