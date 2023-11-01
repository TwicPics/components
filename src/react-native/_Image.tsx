import React from "react";
// eslint-disable-next-line no-shadow
import { Image } from 'react-native';
import type { AssetAttributes } from "./types";
import { isSameAsset } from "./utils";
import { styles } from "./styles";

// eslint-disable-next-line react/display-name
export default React.memo( ( { alt, uri, onLoad }: AssetAttributes ) => (
    uri && <Image
        alt = { alt }
        onLoad={ onLoad }
        source={ {
            uri,
        } }
        style={ [ styles.asset ] }
    ></Image>
), isSameAsset );

