<svelte:options tag={null}/>

<script context="module" lang="ts">
import type {
    Anchor,
    Mode,
} from "./_utils.js";
import {
    parseAlt,
    parseAnchors,
    parseClassName,
    parseFocuses,
    parseMode,
    parseEager,
    parsePosition,
    parsePreTransform,
    parseRatios,
    parseRefit,
    parseSizes,
    parseSrc,
    parseTitle,
    preComputeArtDirectives,
    computePictureData,
    computeAlt,
    isWebComponents,
} from "./_utils.js";
import { get_current_component } from "svelte/internal";
</script>
<script lang="ts">
export let alt: string = undefined;
export let anchor: Anchor = undefined;
let className: string = undefined;
export { className as class };
export let eager: boolean = false;
export let focus: string = undefined;
export let mode: Mode = undefined;
export let position: string = undefined;
export let preTransform: string = undefined;
export let ratio: number | string = undefined;
export let refit: boolean | string = undefined;
export let src: string;
export let sizes: string;
export let title: string = undefined;

let hostElement: any;

$: parsedAlt = parseAlt( alt );
$: parsedAnchors = parseAnchors( anchor );
$: parsedClassName = parseClassName( className ) || ``;
$: parsedEager = parseEager( eager );
$: parsedFocuses = parseFocuses( focus );
$: parsedMode = parseMode( mode );
$: parsedPosition = parsePosition( position );
$: parsedPreTransform = parsePreTransform( preTransform );
$: parsedRatios = parseRatios( ratio );
$: parsedRefit = parseRefit( refit );
$: parsedSizes = parseSizes( sizes );
$: parsedSrc = parseSrc( src );
$: parsedTitle = parseTitle( title );

$: {
    if ( isWebComponents ) {
        hostElement = get_current_component();
        hostElement.className = `${ parsedClassName } twic-d twic-i`;
    }
}

$: parsedArtDirectives = preComputeArtDirectives(
    {
      anchors: parsedAnchors,
      focuses: parsedFocuses,
      ratios: parsedRatios,
      sizes: parsedSizes,
    }
  );

$: _alt = computeAlt( parsedAlt, `img` );
$: _computePictureData = computePictureData(
      parsedArtDirectives,
      parsedEager,
      parsedMode,
      parsedPreTransform,
      parsedRefit,
      parsedSrc
    );
</script>
{#if isWebComponents}
    <picture title = { parsedTitle }>
      {#if _computePictureData?.sources}
          {#each _computePictureData.sources as data }
              <source { ...data } />
          {/each}
      {/if}
      <img
          alt = { _alt }
          { ..._computePictureData?.fallback }
      />
    </picture>
{:else}
<div class = {`twic-i ${ parsedClassName }`}>
  <picture title = { parsedTitle }>
    {#if _computePictureData?.sources}
        {#each _computePictureData.sources as data }
            <source { ...data } />
        {/each}
    {/if}
    <img
        alt = { _alt }
        { ..._computePictureData?.fallback }
    />
  </picture>
</div>
{/if}
