// cache.ts
import { useState, useEffect } from 'react';
import useExpo from './useExpo';
import { Platform } from 'react-native';

type ImageWithCache = {
    getCachePathAsync: ( uri: string ) => Promise<string | null>;
};

const isImageWithCache = ( _image: unknown ): _image is ImageWithCache =>
    _image && ( ( Platform.OS === `ios` ) || ( Platform.OS === `android` ) );

// hook to get the cache path from expo-image
export const useIsInCache = ( uri: string | undefined ) => {
    const [ isInCache, setIsInCache ] = useState<boolean>( false );
    // eslint-disable-next-line no-shadow
    const { Image } = useExpo( `Image` );

    useEffect( () => {
        const fetchCachePath = async () => {
            if ( uri && isImageWithCache( Image ) ) {
                try {
                    const path = await Image.getCachePathAsync( uri );
                    setIsInCache( Boolean( path ) );
                } catch {}
            }
        };

        fetchCachePath();
    }, [ uri, Image ] );

    return isInCache;
};
