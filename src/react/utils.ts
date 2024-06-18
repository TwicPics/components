import React from 'react';

/**
 * in React 19+ and Canary (versions that expose `use`) we must use camelCase attribute
 * to avoid "Warning: Invalid DOM property".
 * in React version that does not expose `use`, we must use lowercase attribute
 * to avoid "Warning: Invalid DOM property".
 *
 * see https://github.com/vercel/next.js/pull/65235
 */
export const fetchPriorityName = React.use ? `fetchPriority` : `fetchpriority`;
