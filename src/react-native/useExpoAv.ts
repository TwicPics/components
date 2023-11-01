import { useEffect, useState } from 'react';
import { logWarning } from '../_/utils';

type Expo_AV = {
  Video?: unknown;
}
let cache:Promise< Expo_AV >;
const requireOrImport = async () => {
    let _expoAV:Expo_AV = {};
    try {
        // eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
        _expoAV = require( `expo-av` );
    } catch {
        try {
            _expoAV = await import( `expo-av` );
        } catch {}
    }
    const Video = _expoAV?.Video;
    if ( Video === undefined ) {
        // eslint-disable-next-line max-len
        logWarning( `TwicVideo requires 'Expo' and 'Expo-AV' dependencies. For more information, refer to the documentation: https://www.twicpics.com/docs/components/react-native` );
    }
    return {
        Video,
    };
};

export default () => {
    const [ expoAV, setExpoAV ] = useState< Expo_AV >( {} );
    useEffect( () => {
        if ( !cache ) {
            cache = requireOrImport();
        }
        cache.then( _expoAV => {
            setExpoAV( _expoAV );
        } );
    }, [] );
    return expoAV;
};

