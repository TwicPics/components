import { useEffect, useState } from 'react';
import { logWarning } from '../_/utils';

type Expo = {
  Image?: unknown;
  Video?: unknown;
}
type Module = `Image` | `Video`;

const requireOrImportConfig: Record< Module, () => Promise< Expo > > = {
    "Image": async () => {
        let _expo:Expo = {};
        try {
        // eslint-disable-next-line no-undef
            _expo = require( `expo-image` );
        } catch {
            try {
                _expo = await import( `expo-image` );
            } catch {}
        }
        if ( _expo?.Image === undefined ) {
            // eslint-disable-next-line max-len
            logWarning( `Image Caching requires 'Expo' and 'Expo-Image' dependencies. For more information, refer to the documentation: https://www.twicpics.com/docs/components/react-native` );
        }
        return _expo;
    },
    "Video": async () => {
        let _expo:Expo = {};
        try {
        // eslint-disable-next-line no-undef
            _expo = require( `expo-av` );
        } catch {
            try {
                _expo = await import( `expo-av` );
            } catch {}
        }
        if ( _expo?.Video === undefined ) {
            // eslint-disable-next-line max-len
            logWarning( `TwicVideo requires 'Expo' and 'Expo-AV' dependencies. For more information, refer to the documentation: https://www.twicpics.com/docs/components/react-native` );
        }
        return _expo;
    },
};

export const useExpoFactory = ( module: Module ) => {
    let cache: Promise< Expo >;

    // eslint-disable-next-line dot-notation
    const requireOrImport = requireOrImportConfig[ module ];

    const useExpo = () => {
        const [ expoModule, setExpoModule ] = useState< Expo >( {} );
        useEffect( () => {
            if ( !cache ) {
                cache = requireOrImport();
            }
            cache.then( _module => {
                setExpoModule( _module || {} );
            } );
        }, [] );
        return expoModule;
    };
    return useExpo;
};
