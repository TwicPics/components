<svelte:options tag={null}/>

<script context="module" lang="ts">
import {
    computeMagnifierStyle,
    isBrowser,
    isWebComponents,
    initMagnifier,
    parseClassName,
    parseZoom,
    styleToString,
    type Anchor,
    type Mode,
    type Placeholder,
    type State,
} from "./_utils.js";
import TwicMedia from "./TwicMedia.svelte";
import { get_current_component, onMount } from "svelte/internal";
</script>
<script lang="ts">
export let alt: string = undefined;
export let anchor: Anchor = undefined;
export let bot: string = undefined;
let className: string = undefined;
export { className as class };
export let focus: string = undefined;
export let intrinsic: string = undefined;
export let mode: Mode = undefined;
export let eager: boolean = false;
export let placeholder: Placeholder = undefined;
export let position: string = undefined;
export let preTransform: string = undefined;
export let ratio: number | string = undefined;
export let refit: boolean | string = undefined;
export let src: string;
export let step: number | string = undefined;
export let state: State = undefined;
export let title: string = undefined;
export let transition: boolean | string = undefined;
export let transitionDelay: string = undefined;
export let transitionDuration: string = undefined;
export let transitionTimingFunction: string = undefined;
export let zoom: number | string = undefined;

let hostElement:HTMLDivElement | any;

$: parsedClassName = parseClassName( className ) || ``;
$: parsedZoom = parseZoom( zoom );
$: props = {
    alt,
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
    refit,
    src,
    step,
    title,
    transition,
    transitionDelay,
    transitionDuration,
    transitionTimingFunction
}
$: _magnifierStyle = styleToString( computeMagnifierStyle( parsedZoom ) );
$: {
    if ( isWebComponents ) {
        hostElement = get_current_component();
    }
}
$: {
    if ( hostElement && isWebComponents) {
        hostElement.className = `${ parsedClassName } ${ parsedZoom ? `twic-z` : `` } twic-d twic-i`;
        hostElement.style = _magnifierStyle;
    }
}
if ( isBrowser ) {
    onMount( () => {
        if ( parsedZoom ) {
            initMagnifier( hostElement );
        }
    } );
}
</script>
{#if isWebComponents}
    {#if parsedZoom}
        <TwicMedia { ...props } class="twic-m" mediaTag="div" mode="cover"></TwicMedia>
    {/if}
    <TwicMedia { ...props } bind:state mediaTag="img" on:statechange></TwicMedia>
{:else}
<div
    bind:this={ hostElement }
    class = {`twic-i ${ parsedClassName } ${ parsedZoom ? `twic-z` : `` }`}
    style = { _magnifierStyle }
>
    {#if parsedZoom}
        <TwicMedia { ...props } class="twic-m" mediaTag="div" mode="cover"></TwicMedia>
    {/if}
    <TwicMedia { ...props } bind:state mediaTag="img" on:statechange></TwicMedia>
</div>
{/if}

