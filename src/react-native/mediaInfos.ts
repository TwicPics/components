// eslint-disable-next-line no-shadow
import { Image, Platform } from "react-native";
import type { IMediaData, MediaData, SizeObject } from "./types";

const BLUR_RADIUS = 5;

const COLOR = 3;
const HEIGHT = 2;
const URI = 4;
const WIDTH = 1;

// eslint-disable-next-line max-len
const rLqipData = /(?:(?:width="([0-9]*)").*(?:height="([0-9]*)").*)(?:(?:background:(#[0-9a-fA-F]*)")|(?:href="([^"]*)))/;

const getPlaceholderData = async (
    url: string
): Promise< IMediaData > => {
    const resp = await fetch( url );
    const data = await resp.text();
    const parsed = rLqipData.exec( data );
    return {
        "placeholder": {
            "blurRadius": Platform.OS === `web` ? 0 : BLUR_RADIUS,
            "color": parsed && parsed[ COLOR ],
            "uri": Platform.OS === `web` ? url : parsed && parsed[ URI ],
        },
        "height": ( parsed && Number( parsed[ HEIGHT ] ) ) || undefined,
        "width": ( parsed && Number( parsed[ WIDTH ] ) ) || undefined,
    };
};

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
        return success( await getPlaceholderData( srcLqip ) );
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
