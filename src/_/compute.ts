/* eslint-disable max-lines */
/* eslint-disable no-nested-ternary */
/* eslint max-params: off, no-shadow: [ "error", { "allow": [ "focus" ] } ] */
import type {
    AnchorObject,
    ArtDirective,
    FetchPriority,
    Mode,
    Picture,
    Placeholder,
    PlaceholderData,
    PreTransformData,
    VideoOptions,
} from "./types";

import { config, getDataAttributeName } from "./config";
import { cssWithoutPx } from "./dom";
import { parseMode } from "./parse";
import { createUrl, finalTransform } from "./url";
import { isReact } from "./utils";

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

const preComputeArtDirectives = (
    anchors: Record< number, AnchorObject >,
    focuses:Record< number, string >,
    modes:Record< number, Mode >,
    positions: Record< number, string >,
    preTransforms: Record< number, string >,
    ratios: Record< number, number >,
    sizes: Record< number, string >
): ArtDirective[] => {

    // deduplicate breakpoints by merging keys from various objects
    const allBreakpoints = new Set( [
        ...Object.keys( anchors ).map( Number ),
        ...Object.keys( focuses ).map( Number ),
        ...Object.keys( modes ).map( Number ),
        ...Object.keys( positions ).map( Number ),
        ...Object.keys( preTransforms ).map( Number ),
        ...Object.keys( ratios ).map( Number ),
        ...Object.keys( sizes ).map( Number ),
    ] );
    // creates resolution list from config.breakpoints and potential custom breakpoint
    const resolutionsList = [
        ...new Set(
            [
                ...Object.values( config.breakpoints ),
                ...Array.from( allBreakpoints ).filter( w => w > 0 ),
            ]
        ),
    ].sort( ( a, b ) => a - b );
    // build array of art directives by sorting and mapping breakpoints
    const artDirectives: ArtDirective[] = Array
        .from( allBreakpoints )
        .sort( ( a, b ) => a - b )
        .map( breakpoint => (
            {
                breakpoint,
                "anchor": anchors[ breakpoint ],
                "focus": focuses[ breakpoint ],
                "mode": modes[ breakpoint ],
                "position": positions[ breakpoint ],
                "preTransform": preTransforms[ breakpoint ],
                "ratio": ratios[ breakpoint ],
                "sizes": sizes[ breakpoint ],
            }
        ) );
    // fill the missing values with the one of previous item (mobile-first approach)
    for ( let i = 1; i < artDirectives.length; i++ ) {
        const previous = artDirectives[ i - 1 ];
        const current = artDirectives[ i ];
        for ( const key of Object.keys( artDirectives[ 0 ] ) ) {
            current[ key ] = current[ key ] ?? previous[ key ];
        }
    }
    return artDirectives.map(
        ( source, index ) => {
            // eslint-disable-next-line no-shadow, @typescript-eslint/no-shadow
            const { anchor, breakpoint, focus, mode, position, preTransform, ratio, sizes } = source;
            const nextBreakpoint = artDirectives[ index + 1 ]?.breakpoint ?? undefined;
            // current asset width is:
            //    breakpoint if not equal to zero
            //    or next breakpoint if defined
            //    or max resolution
            const width = breakpoint || nextBreakpoint || Math.max( ...resolutionsList );
            return {
                anchor,
                breakpoint,
                focus,
                "media": `(min-width: ${ breakpoint }px)`,
                mode,
                position,
                preTransform,
                ratio,
                "resolutions": resolutionsList.filter(
                    resolution =>
                        ( resolution >= breakpoint ) &&
                        (
                            ( ( nextBreakpoint === undefined ) || ( resolution < nextBreakpoint ) ) ||
                            ( ( breakpoint === 0 ) && ( resolution <= nextBreakpoint ) )
                        )
                ),
                sizes,
                width,
                "height": ratio ? `${ Math.round( width * ratio ) }` : undefined,
            };
        }
    ).sort( ( a, b ) => b.breakpoint - a.breakpoint );
};

const srcSetName = isReact ? `srcSet` : `srcset`;
/* eslint-disable dot-notation */
export const computePicture = (
    anchors: Record< number, AnchorObject >,
    eager: boolean,
    fetchPriority: FetchPriority,
    focuses:Record< number, string | undefined >,
    modes:Record< number, Mode >,
    positions: Record< number, string >,
    preTransforms: Record< number, string | undefined >,
    ratios: Record< number, number >,
    refit: string,
    sizes: Record< number, string >,
    src: string
): Picture => {
    if ( !config.domain ) {
        return undefined;
    }
    const artDirectives = preComputeArtDirectives(
        anchors,
        focuses,
        modes,
        positions,
        preTransforms,
        ratios,
        sizes
    );

    const datas = artDirectives.map(
        ( artDirective, index ) => {
            const { anchor,
                focus,
                media,
                mode,
                position,
                preTransform,
                ratio,
                resolutions,
                "sizes": _sizes,
                width,
                height } = artDirective;
            // we use `inside` rather than `contain` to avoid cls when using TwicPicture
            // (padding-trick can not be used there)
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

            const srcMap = new Map<number, string>();
            Array.from( actualResolutionSet )
                .sort( ( a, b ) => b - a )
                .forEach( _width => {
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
                } );

            const attributes: Record<string, string> = {
                height,
                "sizes": _sizes,
                "width": `${ width }`,
            };
            attributes[ srcSetName ] = Array.from(
                srcMap,
                ( [ _width, _src ] ) => `${ _src } ${ _width }w`
            ).join( `,` );
            if ( index === ( artDirectives.length - 1 ) ) {
                attributes[ `fetchPriority` ] = eager ? ( fetchPriority || `high` ) : fetchPriority;
                attributes[ `loading` ] = eager ? `eager` : `lazy`;
                attributes[ `src` ] = srcMap.get( width );
            } else {
                attributes[ `media` ] = media;
            }
            return attributes;
        }
    );
    return {
        "img": datas.pop(),
        "sources": datas,
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
export const computeHostAttributes = ( draggable: boolean | undefined ): Record< string, unknown > => {
    const hostElementData: Record< string, unknown > = {};
    if ( draggable !== undefined ) {
        hostElementData[ `draggable` ] = draggable;
    }
    return hostElementData;
};
/* eslint-enable dot-notation */

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
