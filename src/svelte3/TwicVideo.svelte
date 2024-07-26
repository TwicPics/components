<svelte:options tag={null}/>

<script context="module" lang="ts">
import {
    computeHostAttributes,
    getCurrentComponent,
    isWebComponents,
    parseClassName,
    parseDraggable,
    parseDuration,
    parseFrom,
    parseId,
    parseTo,
    preComputeVideoOptions,
    sanitize,
    type Anchor,
    type Mode,
    type Placeholder,
    type State
} from "./_utils.js";
import TwicMedia from "./TwicMedia.svelte";
</script>
<script lang="ts">
export let anchor: Anchor = undefined;
export let bot: string = undefined;
let className: string = undefined;
export { className as class };
export let draggable: boolean | string = undefined;
export let duration: number | string = undefined;
export let focus: string = undefined;
export let from: number | string = undefined;
export let id: string = undefined;
export let intrinsic: string = undefined;
export let mode: Mode = undefined;
export let eager: boolean = false;
export let placeholder: Placeholder = undefined;
export let position: string = undefined;
export let posterFrom: number | string = undefined;
export let preTransform: string = undefined;
export let ratio: number | string = undefined;
export let src: string;
export let step: number | string = undefined;
export let state: State = undefined;
export let title: string = undefined;
export let to: number | string = undefined;
export let transition: boolean | string = undefined;
export let transitionDelay: string = undefined;
export let transitionDuration: string = undefined;
export let transitionTimingFunction: string = undefined;

$: parsedClassName = parseClassName( className ) || ``;
$: parsedDraggable = parseDraggable( draggable );
$: parsedDuration = parseDuration( duration );
$: parsedFrom = parseFrom( from );
$: parsedId = parseId( id );
$: parsedPosterFrom = parseFrom( posterFrom );
$: parsedTo = parseTo( to );

$: props = {
    anchor,
    bot,
    focus,
    intrinsic,
    mode,
    eager,
    placeholder,
    position,
    preTransform,
    ratio,
    src,
    step,
    title,
    transition,
    transitionDelay,
    transitionDuration,
    transitionTimingFunction
}

$: videoOptions = preComputeVideoOptions( parsedDuration, parsedFrom, parsedPosterFrom, parsedTo);

$: {
    if ( isWebComponents ) {
        const hostElement = getCurrentComponent();
        hostElement.className = sanitize( `${ parsedClassName } twic-d twic-i` );
        parsedDraggable !== undefined && hostElement.setAttribute( `draggable`, parsedDraggable );
        parsedId !== undefined ? hostElement.setAttribute( `id` , parsedId) : hostElement.removeAttribute( `id` );
    }
}
</script>
{#if isWebComponents}
<TwicMedia
    mediaTag="video"
    bind:state
    { ...props }
    { videoOptions }
    on:statechange
></TwicMedia>
{:else}
<div
    class = { sanitize( `twic-i ${ parsedClassName }` ) }
    { ...computeHostAttributes( parsedDraggable, parsedId ) }
>
    <TwicMedia
        mediaTag="video"
        bind:state
        { ...props }
        { videoOptions }
        on:statechange
    ></TwicMedia>
</div>
{/if}
