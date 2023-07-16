/* eslint-disable no-undef */

import { config } from '../_/config';
import { parseSrc } from '../_/parse';
import { createUrl } from '../_/url';

const PLACEHOLDER_SIZE = 1000;
export default async ( src: string ): Promise< string > => {
    const response = await fetch( createUrl(
        {
            "context": {
                "mode": `resize`,
                "width": PLACEHOLDER_SIZE,
            },
            "domain": config.domain,
            "output": `preview`,
            "src": parseSrc( src ),
            "transform": `*`,
        }
    ) );
    const arrayBuffer = await response.arrayBuffer();
    const dataURL = `data:${
        response.headers.get( `content-type` )
    };base64,${
        Buffer.from( arrayBuffer ).toString( `base64` )
    }`;
    return dataURL;
};

