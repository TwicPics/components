import React from "react";
import type { AssetAttributes } from "./types";
import { isSameAsset } from "./utils";
import { ResizeMode, Video } from "expo-av";
import { styles } from "./styles";
import { Image } from "react-native";

// eslint-disable-next-line react/display-name
export default React.memo( ( props: AssetAttributes ) => {
    const { onLoad, poster, uri } = props;
    return (
        uri && <Video
            isLooping
            isMuted
            onReadyForDisplay={() => {
                console.log( `Video loaded` );
                onLoad();
            }}
            PosterComponent={() => (
                <Image
                    onLoad={ () => {
                        console.log( `poster loaded` );
                        onLoad();
                    } }
                    source={ {
                        "uri": poster,
                    } }
                    style={ [ styles.asset ] }
                />
            )}
            resizeMode={ ResizeMode.COVER }
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
        ></Video>
    );
}, isSameAsset );

