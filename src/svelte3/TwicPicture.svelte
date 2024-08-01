<svelte:options tag={null}/>

<script context="module" lang="ts">
import type {
    Anchor,
    CrossOrigin,
    Mode,
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
    parseClassName,
    parseCrossOrigin,
    parseDraggable,
    parseEager,
    parseFetchPriority,
    parseFocuses,
    parseId,
    parseModes,
    parsePositions,
    parsePreTransforms,
    parseRatios,
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
let className: string = undefined;
export { className as class };
export let crossorigin: CrossOrigin = undefined;
export let draggable: boolean | string = undefined;
export let eager: boolean = false;
export let fetchpriority: string = undefined;
export let focus: string = undefined;
export let id: string = undefined;
export let mode: Mode = undefined;
export let position: string = undefined;
export let preTransform: string = undefined;
export let ratio: number | string = undefined;
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
$: parsedDraggable = parseDraggable( draggable );
$: parsedEager = parseEager( eager );
$: parsedFetchPriority = parseFetchPriority( fetchpriority );
$: parsedFocuses = parseFocuses( focus );
$: parsedId = parseId( id );
$: parsedModes = parseModes( mode );
$: parsedPositions = parsePositions( position );
$: parsedPreTransforms = parsePreTransforms( preTransform );
$: parsedRatios = parseRatios( ratio );
$: parsedRefit = parseRefit( refit );
$: parsedSizes = parseSizes( sizes );
$: parsedSrc = parseSrc( src );
$: parsedStyle = parseStyle( style );
$: parsedTabIndex = parseTabIndex( tabindex );
$: parsedTitle = parseTitle( title );
$: hostStyle = styleToString( computeHostStyle( {
    style: parsedStyle,
} ) );
$: {
    if ( isWebComponents ) {
        const hostElement = getCurrentComponent();
        hostElement.className = sanitize( `${ parsedClassName } twic-d twic-i` );
        setAttributes( `draggable`, parsedDraggable, hostElement  );
        setAttributes( `id`, parsedId, hostElement  );
        setAttributes( `tabindex`, parsedTabIndex, hostElement  );
        setAttributes( `style`, hostStyle, hostElement  );
    }
}
$: _computedMediaAttributes = computeMediaAttributes( {
    alt: parsedAlt,
    crossOrigin: parsedCrossOrigin,
    mediaTag: `img`
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
    { ...computeHostAttributes( {
        draggable: parsedDraggable,
        id: parsedId,
        tabIndex: parsedTabIndex,
    } ) }
    style = { hostStyle }
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
