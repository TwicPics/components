<svelte:options tag={null}/>

<script context="module" lang="ts">
import { configBasedStyle, markComponentsChain } from "../_/install";
import { computeAlt, computeData, computeStyle, computeWrapperClass, computeWrapperStyle } from "../_/compute";
import { getParent } from "../_/dom";
import { handlePlaceholder, unhandlePlaceholder } from "../_/placeholder";
import {
    parseAlt,
    parseBot,
    parseClassName,
    parseFocus,
    parseMode,
    parsePlaceholder,
    parsePosition,
    parseRatio,
    parseSrc,
    parseStep,
    parseTransition,
    parseTransitionDelay,
    parseTransitionDuration,
    parseTransitionTimingFunction,
} from "../_/parse";

import { isBrowser, isWebComponents } from "../_/utils";

import { onDestroy, onMount } from "svelte/internal";

import { styleToString } from "./utils";

import type { Attributes as BaseAttributes, Mode, Placeholder } from "../_/types";

export interface Attributes extends BaseAttributes {
    class?: string,
}

declare const MEDIA_TAG: string;
</script>
<script lang="ts">
export let alt: string = undefined;
export let bot: string = undefined;
let className: string = undefined;
export { className as class };
export let focus: string = undefined;
export let mode: Mode = undefined;
export let placeholder: Placeholder = undefined;
export let position: string = undefined;
export let ratio: number | string = undefined;
export let src: string;
export let step: number = undefined;
export let transition: boolean = true;
export let transitionDelay: string = undefined;
export let transitionDuration: string = undefined;
export let transitionTimingFunction: string = undefined;

let wrapper: HTMLDivElement;

$: parsedAlt = parseAlt( alt );
$: parsedBot = parseBot( bot );
$: parsedFocus = parseFocus( focus );
$: parsedMode = parseMode( mode );
$: parsedPlaceholder = parsePlaceholder( placeholder );
$: parsedPosition = parsePosition( position );
$: parsedRatio = parseRatio( ratio );
$: parsedSrc = parseSrc( src );
$: parsedStep = parseStep( step );
$: parsedTransition = parseTransition( transition );
$: parsedTransitionDelay = parseTransitionDelay( transitionDelay );
$: parsedTransitionDuration = parseTransitionDuration( transitionDuration );
$: parsedTransitionTimingFunction = parseTransitionTimingFunction( transitionTimingFunction );

$: _alt = ( MEDIA_TAG === "video" ? undefined : computeAlt( parsedAlt, parsedSrc ) );
$: _data = computeData( parsedBot, parsedFocus, parsedSrc, parsedStep );
$: _style = styleToString( computeStyle(
    parsedMode,
    parsedPosition,
    parsedTransition,
    parsedTransitionDelay,
    parsedTransitionDuration,
    parsedTransitionTimingFunction
) );
$: _wrapperStyle = styleToString( computeWrapperStyle(
    wrapper,
    parsedFocus,
    parsedMode,
    parsedPlaceholder,
    parsedPosition,
    parsedRatio,
    parsedSrc
) );

if ( isBrowser ) {
    onMount( () => {
        handlePlaceholder( wrapper );
        if ( isWebComponents ) {
            markComponentsChain( wrapper.parentNode as Element );
        }
    } );
    onDestroy( () => unhandlePlaceholder( wrapper ) );
}
</script>

{#if isWebComponents }
<span>/*STYLE*/{ configBasedStyle() }</span>
{/if}
<div
    bind:this = { wrapper }
    class = { computeWrapperClass( isWebComponents ? undefined : parseClassName( className ) ) }
    style = { _wrapperStyle }
>
    <img
        alt = { _alt }
        style = { _style }
        { ..._data }
    />
</div>
