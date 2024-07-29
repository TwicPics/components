<svelte:options tag={null}/>

<script context="module" lang="ts">
import {
    computeHostAttributes,
    computeHostStyle,
    getCurrentComponent,
    isBrowser,
    isWebComponents,
    initMagnifier,
    parseClassName,
    parseDraggable,
    parseId,
    parseStyle,
    parseZoom,
    styleToString,
    type Anchor,
    type Mode,
    type Placeholder,
    type State,
    sanitize,
    parseTabIndex,
    setAttributes,
} from "./_utils.js";
import TwicMedia from "./TwicMedia.svelte";
import { onMount } from "svelte";
</script>
<script lang="ts">
export let alt: string = undefined;
export let anchor: Anchor = undefined;
export let bot: string = undefined;
let className: string = undefined;
export { className as class };
export let draggable: boolean | string = undefined;
export let focus: string = undefined;
export let id: string = undefined;
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
export let style: string | Record< string, unknown >;
export let tabindex: number | string = undefined;
export let title: string = undefined;
export let transition: boolean | string = undefined;
export let transitionDelay: string = undefined;
export let transitionDuration: string = undefined;
export let transitionTimingFunction: string = undefined;
export let zoom: number | string = undefined;

let hostElement:HTMLDivElement | any;

$: parsedClassName = parseClassName( className ) || ``;
$: parsedDraggable = parseDraggable( draggable );
$: parsedId = parseId( id );
$: parsedTabIndex = parseTabIndex( tabindex );
$: parsedStyle = parseStyle( style );

console.log("Style", style, parsedStyle);
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
$: hostStyle = styleToString( computeHostStyle( {
    style: parsedStyle,
    zoom: parsedZoom,
} ) );
$: {
    if ( isWebComponents ) {
        hostElement = getCurrentComponent();
        hostElement.className = sanitize( `${ parsedClassName } ${ parsedZoom ? `twic-z` : `` } twic-d twic-i` );
        setAttributes( `draggable`, parsedDraggable, hostElement  );
        setAttributes( `id`, parsedId, hostElement  );
        setAttributes( `tabindex`, parsedTabIndex, hostElement  );
        setAttributes( `style`, hostStyle, hostElement  );
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
    class = { sanitize( `twic-i ${ parsedClassName } ${ parsedZoom ? `twic-z` : `` }` ) }
    { ...computeHostAttributes( {
        draggable: parsedDraggable,
        id: parsedId,
        tabindex: parsedTabIndex,
    } ) }
    style = { hostStyle }
>
    {#if parsedZoom}
        <TwicMedia { ...props } class="twic-m" mediaTag="div" mode="cover"></TwicMedia>
    {/if}
    <TwicMedia { ...props } bind:state mediaTag="img" on:statechange></TwicMedia>
</div>
{/if}

