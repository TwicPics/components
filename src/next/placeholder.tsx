/* eslint-disable no-undef */
import { createUrl } from '../_/url';
import { parseSrc, getDomain } from './utils';

const PLACEHOLDER_SIZE = 1000;
export default async ( src: string ): Promise< string > => {
    const response = await fetch( createUrl(
        {
            "domain": getDomain(),
            "output": `preview`,
            "src": parseSrc( src ),
            "transform": `resize=${ PLACEHOLDER_SIZE }`,
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

