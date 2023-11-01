import React from "react";
// eslint-disable-next-line no-shadow
import { Image } from "react-native";
import { styles } from "./styles";
import type { AssetAttributes } from "./types";
import useExpoAV from "./useExpoAv";
import { isSameAsset } from "./utils";

// eslint-disable-next-line react/display-name
export default React.memo( ( { onLoad, poster, uri }: AssetAttributes ) => {
    const Video = useExpoAV();
    return (
        uri && Video && <Video
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
            resizeMode={ `cover` }
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
