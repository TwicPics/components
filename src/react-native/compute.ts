import { Animated, Easing, PixelRatio, Platform, type EasingFunction } from 'react-native';
export * from "../_/compute";
import { computePreTransform } from '../_/compute';
import { config } from '../_/config';
import type { AnchorObject, Mode } from '../_/types';
import { createUrl } from '../_/url';
import type { MediaData, SizeObject, UrlData } from './types';

const PLACEHOLDER_DIM = 1000;
const actualSize = ( step: number, lqip: boolean, viewSize: SizeObject ): SizeObject => {
    const actualWidth = ( w: number ): number => {
        const _step = step || config.step;
        return Math.max( _step, _step * Math.floor( w / _step ) );
    };
    const pixelRatio = Math.min( Math.max( 1, PixelRatio.get() ), config.maxDPR );
    let _actualWidth = actualWidth( viewSize.width * pixelRatio );
    let _actualHeight = viewSize.ratio ? _actualWidth * viewSize.ratio : viewSize.height * pixelRatio;
    if ( config.debug ) {
        // eslint-disable-next-line no-console
        console.debug( `size and pixelRatio`, viewSize, pixelRatio, {
            _actualWidth,
            _actualHeight,
        } );
    }
    if ( lqip ) {
        const actualRatio = _actualWidth / _actualHeight;
        // eslint-disable-next-line no-multi-assign
        _actualWidth = _actualHeight = PLACEHOLDER_DIM;
        if ( actualRatio > 1 ) {
            _actualHeight = Math.floor( _actualHeight / actualRatio );
        } else {
            _actualWidth = Math.floor( _actualWidth * actualRatio );
        }
    }
    return {
        "width": Math.round( _actualWidth ),
        "height": Math.round( _actualHeight ),
    };
};

const mappingMode: { [key: string]: string; } = {
    "center": `contain-max`,
    "cover": `cover`,
    "contain": `contain`,
    "stretch": `resize`,
    "repeat": `contain-max`,
};

const computeUrl = (
    // eslint-disable-next-line no-shadow
    { anchor, focus, lqip = false, mode, placeholder, preTransform, src, step, viewSize }: UrlData
) => {
    if ( lqip && /^placeholder:.*$/.test( src ) ) {
        return undefined;
    }
    const { debug, domain } = config;
    const { width, height } = actualSize( step, lqip, viewSize );
    return createUrl(
        {
            "debug": debug && ( Platform.OS === `web` ),
            domain,
            src,
            "transform": `${ computePreTransform(
                anchor,
                focus,
                mode,
                preTransform,
                false
            ) }${ mappingMode[ mode ] }=${ width }x${ height }`,
            "output": lqip ? placeholder : ``,
        }
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const computeContainerStyle = ( value: any, ratio: number | undefined ) => {
    if ( ratio ) {
        let tmp = value || {};
        if ( Array.isArray( value ) ) {
            tmp = value.reduce( ( p, c ) => ( {
                ...p,
                ...c,
            } ), {} );
        }
        tmp = JSON.parse( JSON.stringify( tmp ) );
        tmp.height = undefined;
        tmp.aspectRatio = 1 / ratio;
        return tmp;
    }
    return value;
};

const mappingPosition: { [key: string]: string; } = {
    "left": `flex-start`,
    "right": `flex-end`,
    "top": `flex-start`,
    "bottom": `flex-end`,
};

export const computePosition = (
    anchor: AnchorObject,
    mode: Mode
) : Record<string, string> => {
    if ( mode === `contain` ) {
        const { x, y } = anchor;
        return {
            "alignItems": mappingPosition[ x ] || `center`,
            "justifyContent": mappingPosition[ y ] || `center`,
        };
    }
    return {};
};

export const computeTimingConfig = (
    newValue: number,
    transitionDelay: string,
    transitionDuration: string,
    transitionTimingFunction: EasingFunction
):
Animated.TimingAnimationConfig =>
    (
        {
            "delay": Number( transitionDelay || 0 ),
            // eslint-disable-next-line no-magic-numbers
            "duration": Number( transitionDuration || 200 ),
            "easing": transitionTimingFunction || Easing.ease,
            "toValue": newValue,
            "useNativeDriver": true,
        }
    );

/**
 * returns both the url of the final image and the url of the LQIP image
 */
export const computeUrls = (
    urlData: UrlData
): Record< string, string> => ( {
    "media": computeUrl( urlData ),
    "lqip": computeUrl(
        {
            ...urlData,
            ...{
                "lqip": true,
            },
        }
    ),
} );

export const computeWidth = ( mediaData: MediaData, viewSize: SizeObject ): number => {
    if ( mediaData ) {
        const { ratioIntrinsic } = mediaData;
        const ratioView = viewSize.width / viewSize.height;
        return Math.max(
            1,
            Math.round( ratioIntrinsic > ratioView ? viewSize.width : viewSize.height * ratioIntrinsic )
        );
    }
    return 0;
};

export const computeViewSize = (
    width: number,
    height: number,
    ratio: number
): SizeObject => ( {
    "height": ratio ? width * ratio : height,
    "ratio": ratio || ( width ? ( height / width ) : undefined ),
    width,
} );

