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
export let src: string;
export let step: number = undefined;
export let state: State = undefined;
export let title: string = undefined;
export let transition: boolean | string = undefined;
export let transitionDelay: string = undefined;
export let transitionDuration: string = undefined;
export let transitionTimingFunction: string = undefined;
export let zoom: number | string = undefined;

let magnifier:HTMLDivElement;

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
    src,
    step,
    title,
    transition,
    transitionDelay,
    transitionDuration,
    transitionTimingFunction
}

$: _magnifiedStyle = styleToString( computeMagnifierStyle( parsedZoom ) );

$: {
    if ( isWebComponents ) {
        get_current_component().className = `${ parsedClassName } ${ parsedZoom ? `twic-z` : `` } twic-d twic-i`;
    }
}
if ( isBrowser ) {
    onMount( () => {
        if ( magnifier ) {
            initMagnifier( magnifier );
        }
    } );
}
</script>
{#if isWebComponents}
<TwicMedia mediaTag="img" bind:state { ...props } on:statechange></TwicMedia>
{#if parsedZoom}
    <div bind:this={ magnifier } style = { _magnifiedStyle } class="twic-m">
        <TwicMedia mediaTag="div" { ...props }></TwicMedia>
    </div>
{/if}
{:else}
<div class = {`twic-i ${ parsedClassName } ${ parsedZoom ? `twic-z` : `` }`}>
    <TwicMedia mediaTag="img" bind:state { ...props } on:statechange></TwicMedia>
    {#if parsedZoom}
        <div bind:this={ magnifier } style = { _magnifiedStyle } class="twic-m">
            <TwicMedia mediaTag="div"{ ...props }></TwicMedia>
        </div>
    {/if}
</div>
{/if}

