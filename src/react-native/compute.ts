import { Animated, Easing, PixelRatio, Platform, type EasingFunction } from 'react-native';
export * from "../_/compute";
import { computePreTransform } from '../_/compute';
import type { AnchorObject, Mode, Placeholder } from '../_/types';
import { config } from './install';
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

const checkLqip = ( placeholder: Placeholder, special: string ) =>
    placeholder && ( special !== `placeholder` );

const rPath = /^(?:(auth|placeholder|rel)|(image|media|video)|[^:]*):(\/*)((v[0-9]+(?=[/?]))?[^?]*(\?.*)?)$/;
const FULL_PATH = 4;
const MEDIA = 2;
const QUERY = 6;
const RESERVED = 5;
const SLASHES = 3;
const SPECIAL = 1;
const VERSION = `v1`;
const computeUrl = (
    // eslint-disable-next-line no-shadow
    { anchor, focus, lqip = false, mode, placeholder, preTransform, src, step, viewSize }: UrlData
) => {
    const { debug, "domain": _domain, "path": _path } = config;
    const domain = `${ _domain }/`;
    const isAbsolute = ( src.slice( 0, domain.length ) === domain );
    const path = isAbsolute ? `media:${ src.slice( domain.length ) }` : src;
    const parsed = rPath.exec( path );

    if ( lqip && !checkLqip( placeholder, parsed[ SPECIAL ] ) ) {
        return undefined;
    }

    const isMedia = parsed && parsed[ MEDIA ];
    // eslint-disable-next-line no-nested-ternary
    const actualPath = isMedia ? (
        ( _path && !isAbsolute ) ?
            `${ _path }${ parsed[ SLASHES ] ? parsed[ SLASHES ][ 0 ] : `` }${ parsed[ FULL_PATH ] }` :
            parsed[ FULL_PATH ]
    ) : path;
    const { width, height } = actualSize( step, lqip, viewSize );

    const actualMode = mappingMode[ mode ];
    const actualDebug = ( debug && ( Platform.OS === `web` ) ) ? `/debug` : ``;
    const actualTransform = `${ computePreTransform(
        anchor,
        focus,
        mode,
        preTransform,
        false
    ) }${ actualMode }=${ width }x${ height }`;
    const actualOutput = lqip ? `/output=${ placeholder }` : ``;
    return `${
        domain
    }${
        ( parsed && ( parsed[ SPECIAL ] || parsed[ RESERVED ] ) ) ?
        // old syntax
        `${
            VERSION
        }${
            actualDebug
        }/${
            actualTransform
        }${
            actualOutput
        }/${
            isMedia ? `${ parsed[ MEDIA ] }:${ actualPath }` : actualPath
        }` :
        // catch-all syntax
        `${
            actualPath
        }${
           parsed[ QUERY ] ? `&` : `?`
        }twic=${
            VERSION
        }${
            actualDebug
        }/${
            actualTransform
        }${
            actualOutput
        }`
    }`;
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

