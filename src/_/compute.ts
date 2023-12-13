/* eslint-disable max-lines */
/* eslint-disable no-nested-ternary */
/* eslint max-params: off, no-shadow: [ "error", { "allow": [ "focus" ] } ] */
import type {
    AnchorObject,
    ArtDirective,
    FetchPriority,
    Mode,
    Placeholder,
    PlaceholderData,
    PreTransformData,
    VideoOptions,
} from "./types";

import { config, getDataAttributeName } from "./config";
import { cssWithoutPx } from "./dom";
import { parseMode } from "./parse";
import { createUrl, finalTransform } from "./url";

const computePosition = ( { x, y }: AnchorObject, mode: Mode, position: string ): string =>
    ( mode === `contain` ) && ( position || ( y ? ( x ? `${ y } ${ x }` : y ) : x ) );

const computeRefit = ( anchor: string, mode: Mode, refit: string ) : string =>
    ( refit !== undefined ) &&
    `${
        mode === `contain` ? `auto` : `WxH`
    }${
        refit ? `(${ refit })` : ``
    }${
        ( anchor && ( mode !== `contain` ) ) ? `@${ anchor }` : ``
    }`;

/* eslint-disable dot-notation */
export const computePictureData = (
    artDirectives: ArtDirective [] | undefined,
    eager: boolean,
    fetchPriority: FetchPriority,
    preTransform: string,
    refit: string,
    src: string
) => {
    if ( !config.domain ) {
        return undefined;
    }

    const datas = artDirectives &&
          artDirectives
              .sort( ( a, b ) => b.breakpoint - a.breakpoint )
              .map(
                  ( artDirective, index ) => {
                      const attributes: Record< string, string > = {};
                      const { anchor,
                          focus,
                          media,
                          mode,
                          position,
                          ratio,
                          resolutions,
                          sizes,
                          width,
                          height } = artDirective;

                      const actualMode = mode === `contain` ? `inside` : mode;
                      const actualPosition = computePosition( anchor, mode, position );
                      const actualPreTransform = `${
                            // eslint-disable-next-line @typescript-eslint/no-use-before-define
                            computePreTransform(
                                {
                                    anchor,
                                    focus,
                                    mode,
                                    preTransform,
                                    refit,
                                }
                            ) }${
                                finalTransform( mode, refit ) || ``
                            }${
                                actualPosition ? `@${ actualPosition.replace( /(\s)/g, `-` ) }` : ``
                            }`;

                      const actualResolutionSet = new Set< number >();
                      for ( let dpr = 1; dpr <= config.maxDPR; dpr++ ) {
                          resolutions.forEach( resolution => actualResolutionSet.add( resolution * dpr ) );
                      }

                      const srcMap = new Map < number, string >();
                      for ( const _width of Array.from( actualResolutionSet ).sort( ( a, b ) => b - a ) ) {
                          srcMap.set(
                              _width,
                              createUrl( {
                                  "context": {
                                      "height": ratio ? Math.round( _width * ratio ) : undefined,
                                      "mode": actualMode,
                                      "width": _width,
                                  },
                                  "domain": config.domain,
                                  "transform": actualPreTransform,
                                  src,
                              } )
                          );
                      }

                      attributes[ `height` ] = height;
                      attributes[ `media` ] = ( index === ( artDirectives.length - 1 ) ) ? undefined : media;
                      attributes[ `sizes` ] = sizes;
                      attributes[ `srcSet` ] = Array.from(
                          srcMap,
                          ( [ _width, _src ] ) => `${ _src } ${ _width }w`
                      ).join( `,` );
                      attributes[ `width` ] = `${ width }`;
                      if ( index === ( artDirectives.length - 1 ) ) {
                          attributes[ `fetchpriority` ] = eager ? ( fetchPriority || `high` ) : fetchPriority;
                          attributes[ `loading` ] = eager ? `eager` : `lazy`;
                          attributes[ `src` ] = srcMap.get( width );
                      }
                      return attributes;
                  }
              );
    return {
        "sources": datas.slice( 0, -1 ),
        "fallback": datas[ datas.length - 1 ],
    };
};
/* eslint-enable dot-notation */

export const computePreTransform = (
    { "anchor": { x, y }, debug, focus, mode, preTransform, refit } : PreTransformData
): string => {
    const anchor = y ? ( x ? `${ y }-${ x }` : y ) : x;
    const actualFocus = ( ( mode !== `contain` ) && ( refit === undefined ) ) && ( focus || anchor );
    const actualRefit = computeRefit( anchor, mode, refit );
    return `${
        debug ? `/debug` : ``
    }${
        preTransform ? `/${ preTransform }` : ``
    }${
        actualFocus ? `/focus=${ actualFocus }` : ``
    }${
        actualRefit ? `/refit=${ actualRefit }` : ``
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

export const computeAlt =
    ( alt: string, mediaTag: string ): string => ( ( mediaTag === `img` ) ? alt : undefined );

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
        "debug": config.env === `debug`,
        focus,
        mode,
        preTransform,
        refit,
    } );
    if ( actualPreTransform || videoTransform ) {
        attributes[ getDataAttributeName( `transform` ) ] = `${
            actualPreTransform
        }${
            videoTransform || ``
        }${
            finalTransform( mode, refit ) || ``
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
            `/*/output=image`
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
    if ( !config.domain || !element || !placeholder || ( transitions.hasOwnProperty( `zoom` ) ) ) {
        return ``;
    }
    const computedStyle = getComputedStyle( element );
    const actualMode = mode || parseMode( computedStyle.backgroundSize );
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
    const actualTransform = `${ computePreTransform( {
        anchor,
        focus,
        mode,
        preTransform,
        refit,
    } ) }${
        videoTransform || ``
    }${
        finalTransform( actualMode, refit ) || ``
    }`;
    return createUrl(
        {
            "context": {
                "height": Math.max( 1, Math.round( height ) ),
                "mode": actualMode,
                "width": Math.max( 1, Math.round( width ) ),
            },
            "domain": config.domain,
            "transform": actualTransform,
            src,
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
