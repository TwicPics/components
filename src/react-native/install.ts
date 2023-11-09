/* eslint-disable no-import-assign */

import { installTwicPics } from '../_/install';
import type { Options } from '../_/types';
import { config } from '../_/config';

const ANTICIPATION = 0.2;
export default ( options: Options ): void => {
    const { anticipation = ANTICIPATION } = options;
    installTwicPics( {
        ...{
            "maxDPR": 2,
            "step": 10,
        },
        ...options,
    } );
    config.anticipation = anticipation;
};
