/* eslint-disable max-lines */
/* eslint-disable no-nested-ternary */
/* eslint max-params: off, no-shadow: [ "error", { "allow": [ "focus" ] } ] */
import type {
    AnchorObject,
    Context,
    Mode,
    Placeholder,
    PlaceholderData,
    PreTransformData,
    VideoOptions,
} from "./types";

import { config, getDataAttributeName } from "./config";
import { cssWithoutPx } from "./dom";
import { parseMode } from "./parse";
import { createUrl, shouldApplyFinalTransform } from "./url";

const computePosition = ( { x, y }: AnchorObject, mode: Mode, position: string ): string =>
    ( mode === `contain` ) && ( position || ( y ? ( x ? `${ x } ${ y }` : y ) : x ) );

const computeRefit = ( anchor: string, { height, mode, width }: Context, refit: string ) : string =>
    ( refit !== undefined ) &&
    `${
        mode === `contain` ?
        `auto` :
        `${ width || `W` }x${ height || `H` }`
    }${
        refit ? `(${ refit })` : ``
    }${
        ( anchor && ( mode !== `contain` ) ) ? `@${ anchor }` : ``
    }`;

export const computePreTransform = (
    { "anchor": { x, y }, context, debug, focus, preTransform, refit, videoTransform } : PreTransformData
): string => {
    const anchor = y ? ( x ? `${ y }-${ x }` : y ) : x;
    const { mode } = context || {};
    const actualFocus = ( ( mode !== `contain` ) && ( refit === undefined ) ) && ( focus || anchor );
    const actualRefit = computeRefit( anchor, context, refit );
    return `${
        debug ? `debug/` : ``
    }${
        preTransform || ``
    }${
        actualFocus ? `focus=${ actualFocus }/` : ``
    }${
        videoTransform || ``
    }${
        actualRefit ? `refit=${ actualRefit }/` : ``
    }`;
};

/* eslint-disable dot-notation */
const preComputeStyle = (
    transitionDelay: string,
    transitionDuration: string,
    transitionTimingFunction: string
): Record< string, string > => {
    const preComputedStyle: Record< string, string > = {};
    if ( transitionDuration ) {
        preComputedStyle[ `transitionDuration` ] = transitionDuration;
    }
    if ( transitionDelay ) {
        preComputedStyle[ `transitionDelay` ] = transitionDelay;
    }
    if ( transitionTimingFunction ) {
        preComputedStyle[ `transitionTimingFunction` ] = transitionTimingFunction;
    }
    return preComputedStyle;
};
/* eslint-enable dot-notation */

const rAlt = /\/?([^/?#.]+)(?:\.[^/?#]*)?(?:[?#].*)?$/;

export const computeAlt =
    ( alt: string, mediaTag: string, src: string ): string => {
        if ( mediaTag === `img` ) {
            if ( !alt ) {
                const tmp = rAlt.exec( src );
                // eslint-disable-next-line no-param-reassign
                alt = ( tmp && tmp[ 1 ] ) || `image`;
            }
            return alt;
        }
        return undefined;
    };

export const computeData = (
    anchor: AnchorObject,
    bot: string,
    eager: boolean,
    focus: string,
    intrinsic: string,
    mediaTag: string,
    mode: Mode,
    preTransform: string,
    refit: string,
    src: string,
    step: number,
    videoOptions: VideoOptions
): Record< string, string > => {
    const attributes: Record< string, string > = {};
    const { videoTransform, posterTransform } = videoOptions || {};
    const actualPreTransform = computePreTransform( {
        anchor,
        "context": {
            mode,
        },
        "debug": config.env === `debug`,
        focus,
        preTransform,
        refit,
        videoTransform,
    } );
    if ( actualPreTransform ) {
        attributes[ getDataAttributeName( `transform` ) ] = `${
            actualPreTransform
        }${
            shouldApplyFinalTransform( mode, refit ) ? `*` : ``
        }`;
    }
    if ( typeof bot === `string` ) {
        attributes[ getDataAttributeName( `bot` ) ] = bot || `/`;
    }
    if ( eager ) {
        attributes[ getDataAttributeName( `eager` ) ] = ``;
    }
    if ( intrinsic ) {
        attributes[ getDataAttributeName( `intrinsic` ) ] = intrinsic;
    }
    if ( src ) {
        if ( ( mediaTag === `img` ) || ( mediaTag === `video` ) ) {
            attributes[ getDataAttributeName( `src` ) ] = src;
        } else {
            attributes[ getDataAttributeName( `background` ) ] = `url(${ src })`;
        }
    }
    if ( src && ( mediaTag === `video` ) ) {
        attributes[ getDataAttributeName( `poster` ) ] = src;
        attributes[ getDataAttributeName( `poster-transform` ) ] = `${
            actualPreTransform
        }${
            posterTransform || ``
        }${
            `*/output=image`
        }`;
    }
    if ( step !== undefined ) {
        attributes[ getDataAttributeName( `step` ) ] = String( step );
    }
    return attributes;
};

/* eslint-disable dot-notation */
export const computePlaceholderStyle = (
    anchor: AnchorObject,
    focus: string,
    mode: Mode,
    placeholder: Placeholder,
    position: string,
    preTransform: string,
    ratio: number,
    refit: string,
    src: string,
    transitions: Record< string, boolean >,
    transitionDelay: string,
    transitionDuration: string,
    transitionTimingFunction: string,
    videoOptions: VideoOptions,
    placeholderDataHandler: ( ( data: PlaceholderData ) => void )
): Record< string, string > => {
    const placeholderStyle = preComputeStyle( transitionDelay, transitionDuration, transitionTimingFunction );
    placeholderDataHandler( {
        anchor,
        focus,
        mode,
        placeholder,
        preTransform,
        ratio,
        refit,
        src,
        transitions,
        videoOptions,
    } );
    if ( mode ) {
        placeholderStyle[ `backgroundSize` ] = mode;
    }
    const actualPosition = computePosition( anchor, mode, position );
    if ( actualPosition ) {
        placeholderStyle[ `backgroundPosition` ] = actualPosition;
    }
    return placeholderStyle;
};
/* eslint-enable dot-notation */

const mappingPosition: { [ key: string ]: string; } = {
    "img": `objectPosition`,
    "video": `objectPosition`,
};
const mappingMode: { [ key: string ]: string; } = {
    "img": `objectFit`,
    "video": `objectFit`,
};
/* eslint-disable dot-notation */
export const computeStyle = (
    anchor: AnchorObject,
    mediaTag: string,
    mode: Mode,
    position: string,
    transitionDelay: string,
    transitionDuration: string,
    transitionTimingFunction: string
): Record< string, string > => {
    const computedStyle = preComputeStyle( transitionDelay, transitionDuration, transitionTimingFunction );
    const actualPosition = computePosition( anchor, mode, position );
    if ( actualPosition ) {
        computedStyle[
            mappingPosition[ mediaTag ] || `backgroundPosition`
        ] = actualPosition;
    }
    if ( mode ) {
        computedStyle[
            mappingMode[ mediaTag ] || `backgroundSize`
        ] = mode;
    }
    return computedStyle;
};
/* eslint-enable dot-notation */

const PLACEHOLDER_DIM = 1000;

// eslint-disable-next-line id-length
export const computePlaceholderBackground = (
    element: Element,
    { anchor, focus, mode, placeholder, preTransform, src, ratio, refit, transitions, videoOptions }: PlaceholderData
): string => {
    if ( !placeholder || ( transitions.hasOwnProperty( `zoom` ) ) || !config.domain ) {
        return ``;
    }
    const computedStyle = getComputedStyle( element );
    const actualMode = mode || parseMode( computedStyle.backgroundSize ) || `cover`;
    let _ratio;
    if ( ratio === 0 ) {
        _ratio = actualMode === `contain` ?
            1 :
            cssWithoutPx( computedStyle.height ) / Math.max( 1, cssWithoutPx( computedStyle.width ) );
    } else {
        _ratio = ratio ?? cssWithoutPx( computedStyle.fontSize );
    }
    let height = PLACEHOLDER_DIM;
    let width = PLACEHOLDER_DIM;
    if ( _ratio < 1 ) {
        height *= _ratio;
    } else {
        width /= _ratio;
    }
    const { videoTransform } = videoOptions || {};
    const context = {
        "height": Math.max( 1, Math.round( height ) ),
        "mode": actualMode,
        "width": Math.max( 1, Math.round( width ) ),
    };
    return createUrl(
        {
            context,
            "domain": config.domain,
            refit,
            src,
            "transform": computePreTransform( {
                anchor,
                context,
                focus,
                preTransform,
                refit,
                videoTransform,
            } ),
            "output": placeholder,
        }
    );
};

export const computeWrapperClass = (
    className: string,
    src: string,
    transitions: Record< string, boolean >
): string => {

    const wrapperClass = [ `twic-w` ];

    if ( className ) {
        wrapperClass.push( className );
    }

    if ( !transitions.hasOwnProperty( `none` ) ) {
        if ( transitions.hasOwnProperty( `fade` ) ) {
            wrapperClass.push( `twic-tf` );
        }

        if ( transitions.hasOwnProperty( `zoom` ) ) {
            wrapperClass.push( `twic-tz` );
        }
    }

    if ( config.env === `offline` ) {
        wrapperClass.push( `twic-offline` );
        if ( !src ) {
            wrapperClass.push( `twic-nosrc` );
        }
    }

    return wrapperClass.join( ` ` );
};

export const computeWrapperStyle = ( ratio: number ): Record< string, string > => (
    ( ratio === 0 ) ? {
        "height": `100%`,
        "paddingTop": `0`,
    } : {
        // eslint-disable-next-line no-magic-numbers
        "paddingTop": ( ratio === undefined ) ? `` : `${ ratio * 100 }%`,
    }
);

export const computeMagnifierStyle = ( zoom: boolean | number ) : Record < string, string > => {
    const magnifierStyle: Record< string, string > = {};
    if ( ( typeof zoom !== `boolean` ) && zoom ) {
        magnifierStyle[ `--twic-zoom` ] = `${ zoom }`;
    }
    return magnifierStyle;
};
