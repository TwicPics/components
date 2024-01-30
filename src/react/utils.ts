import { version } from "react";

/**
 * in React 18.3.0 or newer, we must use camelCase attribute
 * to avoid "Warning: Invalid DOM property".
 * in React 18.2.0 or older, we must use lowercase attribute
 * to avoid "Warning: Invalid DOM property".
 * see https://github.com/facebook/react/pull/25927
 */
const fetchPriorityAttrFactory = () => {
    const [ _major, _minor ] = version.split( `.` ).map( Number );
    const major = isNaN( _major ) ? 0 : _major;
    const minor = isNaN( _minor ) ? 0 : _minor;
    // eslint-disable-next-line no-magic-numbers
    const actual = ( major > 18 ) || ( ( major === 18 ) && ( minor >= 3 ) ) ?
      `fetchPriority` :
      `fetchpriority`;
    return ( fetchPriority: string ): Record<string, string> => ( {
        [ actual ]: fetchPriority,
    } );
};

export const fetchPriorityAttr = fetchPriorityAttrFactory();
