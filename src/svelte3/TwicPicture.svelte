<svelte:options tag={null}/>

<script context="module" lang="ts">
import type {
    Anchor,
    Mode,
    State,
} from "./_utils.js";
import {
    parseAlt,
    parseAnchor,
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
} from "./_utils.js";
</script>
<script lang="ts">
export let alt: string = undefined;
export let anchor: Anchor = undefined;
let className: string = undefined;
export { className as class };
export let focus: string = undefined;
export let mode: Mode = undefined;
export let eager: boolean = false;
export let position: string = undefined;
export let preTransform: string = undefined;
export let ratio: number | string = undefined;
export let refit: boolean | string = undefined;
export let src: string;
export let sizes: string;
export let state: State = undefined;
export let title: string = undefined;

$: parsedAlt = parseAlt( alt );
$: parsedAnchor = parseAnchor( anchor );
$: parsedClassName = parseClassName( className ) || ``;
$: parsedEager = parseEager( eager );
$: parsedFocus = parseFocuses( focus );
$: parsedMode = parseMode( mode );
$: parsedPosition = parsePosition( position );
$: parsedPreTransform = parsePreTransform( preTransform );
$: parsedRatio = parseRatios( ratio );
$: parsedRefit = parseRefit( refit );
$: parsedSizes = parseSizes( sizes );
$: parsedSrc = parseSrc( src );
$: parsedTitle = parseTitle( title );
</script>

<picture>
</picture>