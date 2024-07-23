<svelte:options tag={null}/>

<script context="module" lang="ts">
import {
    computeHostAttributes,
    getCurrentComponent,
    isWebComponents,
    parseClassName,
    parseDraggable,
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
export let focus: string = undefined;
export let intrinsic: string = undefined;
export let mediaTag: string = `div`;
export let mode: Mode = undefined;
export let eager: boolean = false;
export let placeholder: Placeholder = undefined;
export let position: string = undefined;
export let preTransform: string = undefined;
export let ratio: number | string = undefined;
export let src: string;
export let step: number | string = undefined;
export let state: State = undefined;
export let title: string = undefined;
export let transition: boolean | string = undefined;
export let transitionDelay: string = undefined;
export let transitionDuration: string = undefined;
export let transitionTimingFunction: string = undefined;

$: parsedClassName = parseClassName( className ) || ``;
$: parsedDraggable = parseDraggable( draggable );

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
    title,
    src,
    step,
    transition,
    transitionDelay,
    transitionDuration,
    transitionTimingFunction
}
$: {
    if ( isWebComponents ) {
        getCurrentComponent().className = `${ parsedClassName } twic-d twic-i`;
        parsedDraggable !== undefined && getCurrentComponent().setAttribute( `draggable`, parsedDraggable );
    }
}
</script>
{#if isWebComponents}
<TwicMedia { mediaTag } bind:state { ...props } on:statechange></TwicMedia>
{:else}
<div
    class = {`twic-i ${ parsedClassName }`}
    { ...computeHostAttributes( parsedDraggable ) }
>
    <TwicMedia { mediaTag } bind:state { ...props } on:statechange></TwicMedia>
</div>
{/if}
