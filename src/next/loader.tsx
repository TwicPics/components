import type { ImageLoaderProps } from 'next/image';
import { createUrl } from '../_/url';

export default ( props: ImageLoaderProps ): string => {
    const { src, width, quality } = props;
    return createUrl(
        {
            // eslint-disable-next-line no-undef
            "domain": process.env.NEXT_PUBLIC_TWICPICS_DOMAIN,
            // eslint-disable-next-line no-undef
            "path": process.env.NEXT_PUBLIC_TWICPICS_PATH,
            src,
            quality,
            "transform": `resize=${ width }`,
        }
    );
};
