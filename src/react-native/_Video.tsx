import React, { useState } from "react";
import { Image } from "react-native";
import { styles } from "./styles";
import type { AssetAttributes } from "./types";
import { isSameAsset } from "./utils";
import { logError } from "../_/utils";

const getExpoAv = async () => {
    let _expoAV: unknown;
    try {
        // eslint-disable-next-line no-undef
        _expoAV = require( `expo-av` );
        return ( _expoAV.Video ? _expoAV : undefined );
    } catch {}
    try {
        return await import( `expo-av` );
    } catch {}
};

// eslint-disable-next-line react/display-name
export default React.memo( ( props: AssetAttributes ) => {
    const { onLoad, poster, uri } = props;
    const [ ExpoAV, setExpoAV ] = useState( undefined );
    if ( !ExpoAV && uri ) {
        ( async () => {
            const module = await getExpoAv();
            if ( module ) {
                setExpoAV( module );
            } else {
                // eslint-disable-next-line max-len
                logError( `TwicVideo requires 'Expo' and 'Expo-AV' dependencies. For more information, refer to the documentation: https://www.twicpics.com/docs/components/react-native` );
            }
        } )();
    }
    return (
        uri && ExpoAV && <ExpoAV.Video
            isLooping
            isMuted
            onReadyForDisplay={ onLoad }
            PosterComponent={() => (
                <Image
                    onLoad= { onLoad }
                    source={ {
                        "uri": poster,
                    } }
                    style={ [ styles.asset ] }
                />
            )}
            resizeMode={ ExpoAV.ResizeMode.COVER }
            shouldPlay
            source={ {
                uri,
            } }
            style={ [ styles.asset ] }
            usePoster
            videoStyle= { {
                "width": `100%`,
                "height": `100%`,
            }}
        ></ExpoAV.Video>
    );
}, isSameAsset );
