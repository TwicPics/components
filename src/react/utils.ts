import { version } from "react";

const [ major, minor ] = version.split( `.` ).map( n => {
    const parsed = Number( n );
    return isNaN( parsed ) ? 0 : parsed;
} );

/**
 * in React 18.3.0 or newer, we must use camelCase attribute
 * to avoid "Warning: Invalid DOM property".
 * in React 18.2.0 or older, we must use lowercase attribute
 * to avoid "Warning: Invalid DOM property".
 * see https://github.com/facebook/react/pull/25927
 */
// eslint-disable-next-line no-magic-numbers
export const fetchPriorityName = ( major > 18 ) || ( ( major === 18 ) && ( minor >= 3 ) ) ?
    `fetchPriority` :
    `fetchpriority`;
