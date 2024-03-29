import { useEffect, useState } from 'react';
import { logWarning } from '../_/utils';

type Expo = {
    Image?: unknown;
    Video?: unknown;
}
type Module = `Image` | `Video`;

const messageConfig: Record< Module, string > = {
    "Image":
        // eslint-disable-next-line max-len
        `Image Caching requires 'expo' and 'expo-image' dependencies. For more information, refer to the documentation: https://www.twicpics.com/docs/components/react-native`,
    "Video":
        // eslint-disable-next-line max-len
        `TwicVideo requires 'expo' and 'expo-av' dependencies. For more information, refer to the documentation: https://www.twicpics.com/docs/components/react-native`,
};

/**
 * stores already loaded libraries
 */
const _expo: Expo = {};

/**
 * requires optional `expo-av`
 * this can be `expo-av` but also `expo-image` if `expo-av` is not installed
 */
const requireExpoAv = ( module: Module ) => {
    try {
        // eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires, no-shadow
        const { Image, Video } = require( `expo-av` );
        _expo.Video = Video || ( module === `Video` ? null : Video );
        _expo.Image = Image;
    } catch {
        // if there is no `expo-av,` we should have found `expo-image` instead
        // as it is not the case, it means that there is no `expo-image` either
        _expo.Image = module === `Image` ? null : undefined;
        _expo.Video = module === `Video` ? null : undefined;
    }
};

/**
 * requires optional `expo-image`
 * this can only be `expo-image`
 */
const requireExpoImage = ( module: Module ) => {
    if ( ( module === `Image` ) && ( _expo.Image === undefined ) ) {
        try {
            // eslint-disable-next-line no-shadow, no-undef, @typescript-eslint/no-var-requires
            const { Image } = require( `expo-image` );
            _expo.Image = Image;
        } catch {
            _expo.Image = null;
        }
    }
};

export default ( module: Module ) => {
    const [ expo, setExpo ] = useState< Expo >( {} );
    useEffect( () => {
        if (
            ( ( module === `Image` ) && ( _expo.Image === undefined ) ) ||
            ( ( module === `Video` ) && ( _expo.Video === undefined ) )
        ) {
            requireExpoAv( module );
            requireExpoImage( module );
            if ( !_expo[ module ] ) {
                logWarning( messageConfig[ module ] );
            }
        }
        setExpo( _expo );
    }, [] );
    return expo;
};
