<svelte:options tag={null}/>

<script context="module" lang="ts">
import type {
    Anchor,
    CrossOrigin,
    Decoding,
    Mode,
    ReferrerPolicy,
} from "./_utils.js";
import {
    computeHostAttributes,
    computeHostStyle,
    computeMediaAttributes,
    computePicture,
    getCurrentComponent,
    isWebComponents,
    parseAlt,
    parseAnchors,
    parseAria,
    parseClassName,
    parseCrossOrigin,
    parseDecoding,
    parseDraggable,
    parseEager,
    parseFetchPriority,
    parseFocuses,
    parseId,
    parseModes,
    parsePositions,
    parsePreTransforms,
    parseRatios,
    parseReferrerPolicy,
    parseRefit,
    parseSizes,
    parseSrc,
    parseStyle,
    parseTabIndex,
    parseTitle,
    sanitize,
    setAttributes,
    styleToString,
} from "./_utils.js";
</script>
<script lang="ts">
export let alt: string = undefined;
export let anchor: Anchor = undefined;
export let aria: boolean | string = undefined;
let className: string = undefined;
export { className as class };
export let crossorigin: CrossOrigin = undefined;
export let decoding: Decoding = undefined;
export let draggable: boolean | string = undefined;
export let eager: boolean = false;
export let fetchpriority: string = undefined;
export let focus: string = undefined;
export let id: string = undefined;
export let mode: Mode = undefined;
export let position: string = undefined;
export let preTransform: string = undefined;
export let ratio: number | string = undefined;
export let referrerpolicy: ReferrerPolicy = undefined;
export let refit: boolean | string = undefined;
export let src: string;
export let sizes: string = undefined;
export let style: string | Record< string, unknown >;
export let tabindex: number | string = undefined;
export let title: string = undefined;

$: parsedAlt = parseAlt( alt );
$: parsedAnchors = parseAnchors( anchor );
$: parsedClassName = parseClassName( className ) || ``;
$: parsedCrossOrigin = parseCrossOrigin( crossorigin );
$: parsedDecoding = parseDecoding( decoding );
$: parsedEager = parseEager( eager );
$: parsedFetchPriority = parseFetchPriority( fetchpriority );
$: parsedFocuses = parseFocuses( focus );
$: parsedModes = parseModes( mode );
$: parsedPositions = parsePositions( position );
$: parsedPreTransforms = parsePreTransforms( preTransform );
$: parsedRatios = parseRatios( ratio );
$: parsedReferrerpolicy = parseReferrerPolicy( referrerpolicy );
$: parsedRefit = parseRefit( refit );
$: parsedSizes = parseSizes( sizes );
$: parsedSrc = parseSrc( src );
$: parsedTitle = parseTitle( title );
$: hostAttributes = computeHostAttributes( {
    aria: parseAria( aria ),
    draggable: parseDraggable( draggable ),
    id: parseId( id ),
    tabindex: parseTabIndex( tabindex ),
} );
$: hostStyle = styleToString( computeHostStyle( {
    style: parseStyle( style ),
} ) );
$: {
    if ( isWebComponents ) {
        setAttributes(
            {
                ...{
                    id: undefined,
                    tabindex: undefined,
                    class: sanitize( `${ parsedClassName } twic-d twic-i` ),
                },
                ...hostAttributes,
                ...{
                  style: hostStyle,
                }
            },
            getCurrentComponent()
        );
    }
}
$: _computedMediaAttributes = computeMediaAttributes( {
    alt: parsedAlt,
    crossorigin: parsedCrossOrigin,
    decoding: parsedDecoding,
    mediaTag: `img`,
    referrerpolicy: parsedReferrerpolicy,
} );
$: _computedPictureData = computePicture(
    parsedAnchors,
    parsedEager,
    parsedFetchPriority,
    parsedFocuses,
    parsedModes,
    parsedPositions,
    parsedPreTransforms,
    parsedRatios,
    parsedRefit,
    parsedSizes,
    parsedSrc
);
</script>
{#if isWebComponents}
    <picture class="twic-p" title = { parsedTitle }>
      {#if _computedPictureData?.sources}
          {#each _computedPictureData.sources as data }
              <source { ...data } />
          {/each}
      {/if}
      <!-- svelte-ignore a11y-missing-attribute -->
      <img
          { ..._computedMediaAttributes }
          { ..._computedPictureData?.img }
      />
    </picture>
{:else}
<div
    class = { sanitize( `twic-i ${ parsedClassName }` ) }
    style = { hostStyle }
    { ...hostAttributes }
>
    <picture class="twic-p" title = { parsedTitle }>
        {#if _computedPictureData?.sources}
            {#each _computedPictureData.sources as data }
                <source { ...data } />
            {/each}
        {/if}
        <!-- svelte-ignore a11y-missing-attribute -->
        <img
            { ..._computedPictureData?.img }
            { ..._computedMediaAttributes }
        />
    </picture>
</div>
{/if}
