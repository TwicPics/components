
import { config } from "./config";
import { ResolutionMax, Resolutions } from "./const";
import type { AnchorObject, ArtDirective, Placeholder, VideoOptions } from "./types";
import { urlInfos } from "./url";

interface ArtDirectivesData {
  anchors: Record< number, AnchorObject >,
  focuses: Record< number, string >,
  ratios: Record< number, number >,
  sizes: Record< number, string >,
}

export const preComputeArtDirectives = ( { anchors, focuses, ratios, sizes }: ArtDirectivesData ): ArtDirective[] => {
    // deduplicate breakpoints by merging keys from various objects
    const allBreakpoints = new Set( [
        ...Object.keys( anchors ).map( Number ),
        ...Object.keys( focuses ).map( Number ),
        ...Object.keys( ratios ).map( Number ),
        ...Object.keys( sizes ).map( Number ),
    ] );

    // build array of art directives by sorting and mapping breakpoints
    const artDirectives: ArtDirective[] = Array
        .from( allBreakpoints )
        .sort( ( a, b ) => a - b )
        .map( breakpoint => (
            {
                breakpoint,
                "anchor": anchors[ breakpoint ],
                "focus": focuses[ breakpoint ],
                "ratio": ratios[ breakpoint ],
                "sizes": sizes[ breakpoint ],
            }
        ) );

    // fill the missing values with the one of previous item (mobile-first approach)
    for ( let i = 1; i < artDirectives.length; i++ ) {
        const previous = artDirectives[ i - 1 ];
        const current = artDirectives[ i ];
        for ( const key of Object.keys( artDirectives[ 0 ] ) ) {
            current[ key ] ||= previous[ key ];
        }
    }

    return artDirectives.map(
        ( source, index ) => {
            // eslint-disable-next-line no-shadow, @typescript-eslint/no-shadow
            const { anchor, breakpoint, focus, ratio, sizes } = source;
            const nextBreakpoint = artDirectives[ index + 1 ]?.breakpoint ?? undefined;
            const width = breakpoint || nextBreakpoint || ResolutionMax;
            return {
                anchor,
                breakpoint,
                focus,
                "media": `(min-width: ${ breakpoint }px)`,
                ratio,
                "resolutions": Resolutions.filter(
                    resolution =>
                        ( resolution >= breakpoint ) &&
                        ( ( nextBreakpoint === undefined ) || ( resolution <= nextBreakpoint ) )
                ),
                sizes,
                width,
                "height": ratio ? `${ Math.round( width * ratio ) }` : undefined,
            };
        }
    );
};

export const preComputeVideoOptions = (
    duration: number,
    from: number,
    posterFrom: number,
    to: number
): VideoOptions => ( {
    "videoTransform": `${
            from ? `/from=${ from }` : ``
        }${
            to ? `/to=${ to }` : ``
        }${
            duration ? `/duration=${ duration }` : ``
        }`,
    "posterTransform": `${
            ( posterFrom || from ) ? `/from=${ posterFrom === undefined ? from : posterFrom }` : ``
        }`,
} );

export const preComputePlaceholder = ( placeholder: Placeholder, src: string ) =>
    ( urlInfos( src, config.domain ).isSpecial ? undefined : placeholder );
