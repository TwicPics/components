<svelte:options tag={null}/>

<script context="module" lang="ts">
import {
    getCurrentComponent,
    isWebComponents,
    parseClassName,
    parseDuration,
    parseFrom,
    parseStyle,
    parseTo,
    preComputeVideoOptions,
    splitProperties,
    styleToString,
    type State
} from "./_utils.js";
import TwicMedia from "./TwicMedia.svelte";
</script>
<script lang="ts">
let className: string = undefined;
export { className as class };
export let duration: number | string = undefined;
export let from: number | string = undefined;
export let posterFrom: number | string = undefined;
export let state: State = undefined;
export let style: string | Record< string, unknown > = {};
export let to: number | string = undefined;

let hostElement:HTMLDivElement | any;
let hostProps, mediaProps;

$: ( { hostProps, mediaProps } = splitProperties( $$props ) );

$: parsedClassName = parseClassName( className ) || ``;
$: parsedDuration = parseDuration( duration );
$: parsedFrom = parseFrom( from );
$: parsedPosterFrom = parseFrom( posterFrom );
$: parsedStyle = parseStyle( style );
$: parsedTo = parseTo( to );
$: videoOptions = preComputeVideoOptions( parsedDuration, parsedFrom, parsedPosterFrom, parsedTo);

$: _hostStyle = styleToString( parsedStyle );

$: {
    if ( isWebComponents ) {
        hostElement = getCurrentComponent();
        hostElement.className = `${ parsedClassName } twic-d twic-i`;
        _hostStyle && hostElement.setAttribute( 'style', _hostStyle );
    }
}
</script>
{#if isWebComponents}
<TwicMedia
    mediaTag="video"
    bind:state
    { ...mediaProps }
    { videoOptions }
    on:statechange
></TwicMedia>
{:else}
<div
    { ...hostProps }
    class = { `twic-i ${ parsedClassName }` }
    style = { _hostStyle }
>
    <TwicMedia
        mediaTag="video"
        bind:state
        { ...mediaProps }
        { videoOptions }
        on:statechange
    ></TwicMedia>
</div>
{/if}
