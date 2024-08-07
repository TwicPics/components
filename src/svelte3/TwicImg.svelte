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
    parseTabIndex,
    parseStyle,
    parseZoom,
    sanitize,
    setAttributes,
    styleToString,
    type Anchor,
    type CrossOrigin,
    type Decoding,
    type Mode,
    type Placeholder,
    type ReferrerPolicy,
    type State,
    parseAria,
} from "./_utils.js";
import TwicMedia from "./TwicMedia.svelte";
import { onMount } from "svelte";
</script>
<script lang="ts">
export let alt: string = undefined;
export let anchor: Anchor = undefined;
export let aria: boolean | string = undefined;
export let bot: string = undefined;
let className: string = undefined;
export { className as class };
export let crossorigin: CrossOrigin = undefined;
export let decoding: Decoding = undefined;
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
export let referrerpolicy: ReferrerPolicy = undefined;
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
$: parsedZoom = parseZoom( zoom );
$: hostAttributes = computeHostAttributes( {
    aria: parseAria( aria ),
    draggable: parseDraggable( draggable ),
    id: parseId( id ),
    tabindex: parseTabIndex( tabindex ),
} );
$: hostStyle = styleToString( computeHostStyle( {
    style: parseStyle( style ),
    zoom: parsedZoom,
} ) );

$: props = {
    alt,
    anchor,
    bot,
    crossorigin,
    decoding,
    focus,
    intrinsic,
    mode,
    eager,
    placeholder,
    position,
    preTransform,
    ratio,
    referrerpolicy,
    refit,
    src,
    step,
    title,
    transition,
    transitionDelay,
    transitionDuration,
    transitionTimingFunction
}
$: {
    if ( isWebComponents ) {
        hostElement = getCurrentComponent();
        setAttributes(
            {
                ...{
                    id: undefined,
                    tabindex: undefined,
                    class: sanitize( `${ parsedClassName } ${ parsedZoom ? `twic-z` : `` } twic-d twic-i` ),
                },
                ...hostAttributes,
                ...{
                  style: hostStyle,
                }
            },
            hostElement
        );
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
    style = { hostStyle }
    { ...hostAttributes }
>
    {#if parsedZoom}
        <TwicMedia { ...props } class="twic-m" mediaTag="div" mode="cover"></TwicMedia>
    {/if}
    <TwicMedia { ...props } bind:state mediaTag="img" on:statechange></TwicMedia>
</div>
{/if}

