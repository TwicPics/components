<svelte:options tag={null}/>

<script context="module" lang="ts">
import type {
    Anchor,
    CrossOrigin,
    Decoding,
    Mode,
} from "./_utils.js";
import {
    getCurrentComponent,
    parseAlt,
    parseAnchors,
    parseClassName,
    parseFocuses,
    parseEager,
    parsePreTransforms,
    parseRatios,
    parseRefit,
    parseSizes,
    parseSrc,
    parseStyle,
    parseTitle,
    computePicture,
    isWebComponents,
    parseFetchPriority,
    parseModes,
    parsePositions,
    splitProperties,
    styleToString,
    computeMediaAttributes,
} from "./_utils.js";
</script>
<script lang="ts">
export let alt: string = undefined;
export let anchor: Anchor = undefined;
let className: string = undefined;
export { className as class };
export let crossorigin: CrossOrigin = undefined;
export let decoding: Decoding = undefined;
export let eager: boolean = false;
export let fetchpriority: string = undefined;
export let focus: string = undefined;
export let mode: Mode = undefined;
export let position: string = undefined;
export let preTransform: string = undefined;
export let ratio: number | string = undefined;
export let referrerpolicy: ReferrerPolicy = undefined;
export let refit: boolean | string = undefined;
export let src: string;
export let style: string | Record< string, unknown > = {};
export let sizes: string = undefined;
export let title: string = undefined;

$: parsedAlt = parseAlt( alt );
$: parsedAnchors = parseAnchors( anchor );
$: parsedClassName = parseClassName( className ) || ``;
$: parsedEager = parseEager( eager );
$: parsedFetchPriority = parseFetchPriority( fetchpriority );
$: parsedFocuses = parseFocuses( focus );
$: parsedModes = parseModes( mode );
$: parsedPositions = parsePositions( position );
$: parsedPreTransforms = parsePreTransforms( preTransform );
$: parsedRatios = parseRatios( ratio );
$: parsedRefit = parseRefit( refit );
$: parsedSizes = parseSizes( sizes );
$: parsedSrc = parseSrc( src );
$: parsedStyle = parseStyle( style );
$: parsedTitle = parseTitle( title );

let hostElement:HTMLDivElement | any;
let hostProps;

$: ( { hostProps } = splitProperties( {
    role: 'img',
    ...$$props
} ) );

$: _hostStyle = styleToString( parsedStyle );

$: {
    if ( isWebComponents ) {
        hostElement = getCurrentComponent();
        hostElement.className = `${ parsedClassName } twic-d twic-i`;
        hostElement.role = hostProps.role;
        _hostStyle && hostElement.setAttribute( 'style', _hostStyle );
    }
}
$: _computedMediaAttributes = computeMediaAttributes( {
    alt: parsedAlt,
    crossorigin,
    decoding,
    mediaTag: `img`,
    referrerpolicy,
} );
$: _computePictureData = computePicture(
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
      {#if _computePictureData?.sources}
          {#each _computePictureData.sources as data }
              <source { ...data } />
          {/each}
      {/if}
      <img
          { ..._computePictureData?.img }
          { ..._computedMediaAttributes }
      />
    </picture>
{:else}
<div
    { ...hostProps }
    class = { `twic-i ${ parsedClassName }` }
    style = { _hostStyle }
>
  <picture class="twic-p" title = { parsedTitle }>
    {#if _computePictureData?.sources}
        {#each _computePictureData.sources as data }
            <source { ...data } />
        {/each}
    {/if}
    <img
        { ..._computePictureData?.img }
        { ..._computedMediaAttributes }
    />
  </picture>
</div>
{/if}
