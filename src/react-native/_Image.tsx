import React from "react";
import { Image } from 'react-native';
import type { AssetAttributes } from "./types";
import { isSameAsset } from "./utils";
import { styles } from "./styles";

// eslint-disable-next-line react/display-name
export default React.memo( ( props: AssetAttributes ) => {
    const { alt, uri, onLoad } = props;
    return (
        uri && <Image
            alt = { alt }
            onLoad={ onLoad }
            source={ {
                uri,
            } }
            style={ [ styles.asset ] }
        ></Image>
    );
}, isSameAsset );

