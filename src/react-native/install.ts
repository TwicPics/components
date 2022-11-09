/* eslint-disable no-import-assign */

import installTwicPics, { config } from '../_/install';
import type { Options } from '../_/types';

export { config };
export default ( options: Options ): void => {
    installTwicPics( {
        ...{
            "maxDPR": 2,
            "step": 10,
        },
        ...options,
    } );
};