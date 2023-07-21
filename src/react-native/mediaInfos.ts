// eslint-disable-next-line no-shadow
import { Image, Platform } from "react-native";
import type { IMediaData, MediaData, SizeObject } from "./types";

const BLUR_RADIUS = 5;

export const getMediaData = async ( srcMedia: string, srcLqip: string, viewSize: SizeObject ): Promise< MediaData > => {
    const success = ( data: IMediaData ): MediaData => {
        const { height, width, placeholder } = data;
        const ratioIntrinsic = ( height ) ? ( width / height ) : ( 1 / viewSize.ratio );
        return {
            placeholder,
            ratioIntrinsic,
            "src": srcMedia,
        };
    };
    if ( srcLqip ) {
        const resp = await fetch( `${ srcLqip }/inspect` );
        const { "output": { color, image, height, intrinsicWidth, width } } = await resp.json();
        const deviation = image ? width / intrinsicWidth : 0;
        return success( {
            "placeholder": {
                // eslint-disable-next-line no-magic-numbers
                "blurRadius": Platform.OS === `web` ? deviation : BLUR_RADIUS,
                "offset": Platform.OS === `web` ? deviation : 0,
                color,
                "uri": image,
            },
            width,
            height,
        } );
    }
    return new Promise( resolve => {
        Image.getSize( srcMedia, ( width, height ) => {
            resolve( success( {
                width,
                height,
            } ) );
        } );
    } );
};
