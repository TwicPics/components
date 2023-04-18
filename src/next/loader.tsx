import type { ImageLoaderProps } from 'next/image';
import { createUrl } from '../_/url';
import { parseSrc, getDomain } from './utils';

export default ( props: ImageLoaderProps ): string => {
    const { src, width, quality } = props;
    return createUrl(
        {
            "domain": getDomain(),
            quality,
            "src": parseSrc( src ),
            "transform": `resize=${ width }`,
        }
    );
};
