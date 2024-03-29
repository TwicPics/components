import React from "react";
// eslint-disable-next-line no-shadow
import type { AssetAttributes } from "./types";
import { useExpoFactory } from "./useExpo";
import { isSameAsset } from "./utils";
import { styles } from "./styles";

const useExpoImage = useExpoFactory( `Image` );

// eslint-disable-next-line react/display-name
export default React.memo( ( { alt, cachePolicy, uri, onLoad }: AssetAttributes ) => {
    // eslint-disable-next-line no-shadow
    const { Image } = useExpoImage();
    return (
        uri && Image && <Image
            alt = { alt }
            cachePolicy = { cachePolicy }
            onLoad={ onLoad }
            source={ {
                uri,
            } }
            style={ [ styles.asset ] }
        ></Image>
    );
}, isSameAsset );

