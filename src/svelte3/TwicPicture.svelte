<svelte:options tag={null}/>

<script context="module" lang="ts">
import type {
    Anchor,
    Mode,
} from "./_utils.js";
import {
    getCurrentComponent,
    parseAlt,
    parseAnchors,
    parseClassName,
    parseFocuses,
    parseEager,
    parsePreTransform,
    parseRatios,
    parseRefit,
    parseSizes,
    parseSrc,
    parseTitle,
    computePicture,
    computeAlt,
    isWebComponents,
    parseFetchPriority,
    parseModes,
    parsePositions,
} from "./_utils.js";
</script>
<script lang="ts">
export let alt: string = undefined;
export let anchor: Anchor = undefined;
let className: string = undefined;
export { className as class };
export let eager: boolean = false;
export let fetchpriority: string = undefined;
export let focus: string = undefined;
export let mode: Mode = undefined;
export let position: string = undefined;
export let preTransform: string = undefined;
export let ratio: number | string = undefined;
export let refit: boolean | string = undefined;
export let src: string;
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
$: parsedPreTransform = parsePreTransform( preTransform );
$: parsedRatios = parseRatios( ratio );
$: parsedRefit = parseRefit( refit );
$: parsedSizes = parseSizes( sizes );
$: parsedSrc = parseSrc( src );
$: parsedTitle = parseTitle( title );

$: {
    if ( isWebComponents ) {;
        getCurrentComponent().className = `${ parsedClassName } twic-d twic-i`;
    }
}

$: _alt = computeAlt( parsedAlt, `img` );
$: _computePictureData = computePicture(
    parsedAnchors,
    parsedEager,
    parsedFetchPriority,
    parsedFocuses,
    parsedModes,
    parsedPositions,
    parsedPreTransform,
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
          alt = { _alt }
          { ..._computePictureData?.img }
      />
    </picture>
{:else}
<div class = {`twic-i ${ parsedClassName }`}>
  <picture class="twic-p" title = { parsedTitle }>
    {#if _computePictureData?.sources}
        {#each _computePictureData.sources as data }
            <source { ...data } />
        {/each}
    {/if}
    <img
        alt = { _alt }
        { ..._computePictureData?.img }
    />
  </picture>
</div>
{/if}
