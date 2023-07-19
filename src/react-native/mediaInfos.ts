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
        const { "output": { color, image, height, width } } = await resp.json();
        return success( {
            "placeholder": {
                "blurRadius": Platform.OS === `web` ? 0 : BLUR_RADIUS,
                color,
                "uri": Platform.OS === `web` ? srcLqip : image,
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
