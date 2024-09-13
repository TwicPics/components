<svelte:options tag={null}/>

<script context="module" lang="ts">
import {
    getCurrentComponent,
    isWebComponents,
    parseClassName,
    parseStyle,
    splitProperties,
    styleToString,
    type State
} from "./_utils.js";
import TwicMedia from "./TwicMedia.svelte";
</script>
<script lang="ts">

let className: string = undefined;
export { className as class };
export let mediaTag: string = `div`;
export let state: State = undefined;
export let style: string | Record< string, unknown > = {};

$: parsedClassName = parseClassName( className ) || ``;
$: parsedStyle = parseStyle( style );

$: _hostStyle = styleToString( parsedStyle );

let hostElement:HTMLDivElement | any;
let hostProps, mediaProps;

$: ( { hostProps, mediaProps } = splitProperties( {
    role: 'img',
    ...$$props
} ) );

$: {
    if ( isWebComponents ) {
        hostElement = getCurrentComponent();
        hostElement.className = `${ parsedClassName } twic-d twic-i`;
        hostElement.role = hostProps.role;
        hostElement.setAttribute( 'style', _hostStyle );
    }
}
</script>
{#if isWebComponents}
<TwicMedia { mediaTag } bind:state { ...mediaProps } on:statechange></TwicMedia>
{:else}
<div
    { ...hostProps }
    class = { `twic-i ${ parsedClassName }` }
    style={ _hostStyle }
>
    <TwicMedia { mediaTag } bind:state { ...mediaProps } on:statechange></TwicMedia>
</div>
{/if}
