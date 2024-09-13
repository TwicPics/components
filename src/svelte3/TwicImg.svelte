<svelte:options tag={null}/>

<script context="module" lang="ts">
import {
    computeMagnifierStyle,
    getCurrentComponent,
    isBrowser,
    isWebComponents,
    initMagnifier,
    parseClassName,
    parseStyle,
    parseZoom,
    splitProperties,
    styleToString,
    type State,
} from "./_utils.js";
import TwicMedia from "./TwicMedia.svelte";
import { onMount } from "svelte";
</script>
<script lang="ts">
let className: string = undefined;
export { className as class };
export let state: State = undefined;
export let style: string | Record< string, unknown > = {};
export let zoom: number | string = undefined;

let hostElement:HTMLDivElement | any;
let hostProps, mediaProps;

$: ( { hostProps, mediaProps } = splitProperties( {
    role: 'img',
    ...$$props
} ) );

$: parsedClassName = parseClassName( className ) || ``;
$: parsedStyle = parseStyle( style );
$: parsedZoom = parseZoom( zoom );
$: _hostStyle = styleToString( {
    ...computeMagnifierStyle( parsedZoom ),
    ...parsedStyle,
} );
$: {
    if ( isWebComponents ) {
        hostElement = getCurrentComponent();
        hostElement.className = `${ parsedClassName } ${ parsedZoom ? `twic-z` : `` } twic-d twic-i`;
        hostElement.role = hostProps.role;
        _hostStyle && hostElement.setAttribute( 'style', _hostStyle );
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
        <TwicMedia { ...mediaProps } class="twic-m" mediaTag="div" mode="cover"></TwicMedia>
    {/if}
    <TwicMedia { ...mediaProps } bind:state mediaTag="img" on:statechange></TwicMedia>
{:else}
<div
    bind:this={ hostElement }
    { ...hostProps }
    class = {`twic-i ${ parsedClassName } ${ parsedZoom ? `twic-z` : `` }`}
    style = { _hostStyle }
>
    {#if parsedZoom}
        <TwicMedia { ...mediaProps } class="twic-m" mediaTag="div" mode="cover"></TwicMedia>
    {/if}
    <TwicMedia { ...mediaProps } bind:state mediaTag="img" on:statechange></TwicMedia>
</div>
{/if}

