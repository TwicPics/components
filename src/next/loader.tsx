import type { ImageLoaderProps } from 'next/image';
import { config } from '../_/config';
import { parseSrc } from '../_/parse';
import { createUrl } from '../_/url';

export default ( props: ImageLoaderProps ): string => {
    const { src, width, quality } = props;
    return createUrl(
        {
            "context": {
                "mode": `resize`,
                width,
            },
            "domain": config.domain,
            quality,
            "src": parseSrc( src ),
        }
    );
};
