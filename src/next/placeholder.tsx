import { createUrl } from '../_/url';

const PLACEHOLDER_SIZE = 1000;
export default async ( src: string ): Promise< string > => {
    const response = await fetch( createUrl(
        {
            // eslint-disable-next-line no-undef
            "domain": process.env.NEXT_PUBLIC_TWICPICS_DOMAIN,
            // eslint-disable-next-line no-undef
            "path": process.env.NEXT_PUBLIC_TWICPICS_PATH,
            src,
            "transform": `resize=${ PLACEHOLDER_SIZE }`,
            "output": `output=preview`,
        }
    ) );
    const arrayBuffer = await response.arrayBuffer();
    const dataURL = `data:${
        response.headers.get( `content-type` )
    };base64,${
        // eslint-disable-next-line no-undef
        Buffer.from( arrayBuffer ).toString( `base64` )
    }`;
    return dataURL;
};

