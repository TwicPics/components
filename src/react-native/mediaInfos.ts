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

    const resp = await fetch( `${ src }` );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { "output": { color, image, height, intrinsicWidth, width } } = resp.ok ?
        await resp.json() :
        {
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
