import type { ImageLoaderProps } from 'next/image';
import { createUrl } from '../_/url';
import { config } from '../_/install';
import { parseSrc } from '../_/parse';

export default ( props: ImageLoaderProps ): string => {
    const { src, width, quality } = props;
    return createUrl(
        {
            "domain": config.domain,
            quality,
            "src": parseSrc( src ),
            "transform": `resize=${ width }`,
        }
    );
};
