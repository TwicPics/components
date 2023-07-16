import type { ImageLoaderProps } from 'next/image';
import { config } from '../_/config';
import { parseSrc } from '../_/parse';
import { createUrl } from '../_/url';

export default ( { src, width, quality }: ImageLoaderProps ): string => createUrl(
    {
        "context": {
            "mode": `resize`,
            width,
        },
        "domain": config.domain,
        quality,
        "src": parseSrc( src ),
        "transform": `*`,
    }
);
