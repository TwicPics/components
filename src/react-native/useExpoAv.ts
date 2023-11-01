import { useEffect } from 'react';
import { logError } from '../_/utils';

let Video:unknown;
let mounted = false;

const requireOrImport = async () => {
    let _expoAv;
    try {
        // eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
        _expoAv = require( `expo-av` );
    } catch {
        try {
            _expoAv = await import( `expo-av` );
        } catch {}
    }
    const _video = _expoAv?.Video;
    if ( _video === undefined ) {
        // eslint-disable-next-line max-len
        logError( `TwicVideo requires 'Expo' and 'Expo-AV' dependencies. For more information, refer to the documentation: https://www.twicpics.com/docs/components/react-native` );
    }
    return _video;
};

export default () => {
    if ( mounted ) {
        return Video;
    }
    mounted = true;
    useEffect( () => {
        ( async () => {
            Video = await requireOrImport();
        } )();
    }, [] );
    return Video;
};
