import type { ImageLoaderProps } from 'next/image';
import { parseSrc } from '../_/parse';
import { createUrl } from '../_/url';

export default ( { src, width, quality }: ImageLoaderProps ): string => createUrl(
    {
        "context": {
            "mode": `resize`,
            width,
        },
        quality,
        "src": parseSrc( src ),
        "transform": `*`,
    }
);
