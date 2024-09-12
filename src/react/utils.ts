import React from 'react';
import { parseRole } from '../_/parse';
import type { HtmlDivAttributes } from './types';

/**
 * in React 19+ and Canary (versions that expose `use`) we must use camelCase attribute
 * to avoid "Warning: Invalid DOM property".
 * in React version that does not expose `use`, we must use lowercase attribute
 * to avoid "Warning: Invalid DOM property".
 *
 * see https://github.com/vercel/next.js/pull/65235
 */
export const fetchPriorityName = React.use ? `fetchPriority` : `fetchpriority`;

export const splitProperties = < T extends HtmlDivAttributes >(
    { id, draggable, role, style, tabIndex, ...props }: T
) => (
        {
            "hostProps": {
                ...Object.fromEntries(
                    Object.entries( props )
                        .filter( ( [ key ] ) => key.startsWith( `aria-` ) )
                ),
                id,
                draggable,
                "role": parseRole( role ),
                style,
                tabIndex,
            },
            "mediaProps": {
                ...props,
            },
        }
    );
