// eslint-disable-next-line no-shadow
import { Platform } from "react-native";
import type { IMediaInfos, MediaInfos, SizeObject } from "./types";

const BLUR_RADIUS = 5;

const success = ( data: IMediaInfos, viewSize: SizeObject ): MediaInfos => {
    const { height, width, placeholder } = data;
    const ratioIntrinsic = ( height ) ? ( width / height ) : ( 1 / viewSize.ratio );
    return {
        placeholder,
        ratioIntrinsic,
    };
};

export const getMediaInfos = async ( src: string, viewSize: SizeObject ): Promise< MediaInfos > => {
    let data;
    try {
        const resp = await fetch( src );
        data = await resp.json();
    } catch ( _ ) {}
    const { "output": { color, image, height, intrinsicWidth, width } } = data || {
        "output": {},
    };
    // eslint-disable-next-line no-magic-numbers
    const deviation = image ? width / ( 2 * intrinsicWidth ) : 0;
    return success( {
        "placeholder": ( color || image ) ?
            {
                "blurRadius": Platform.OS === `web` ? deviation : BLUR_RADIUS,
                color,
                "offset": Platform.OS === `web` ? -1 * deviation : 0,
                "uri": image,
            } :
            undefined,
        width,
        height,
    },
    viewSize );
};
