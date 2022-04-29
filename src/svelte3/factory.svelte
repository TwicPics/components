<svelte:options tag={null}/>

<script context="module" lang="ts">
import type { Attributes as BaseAttributes, Mode, Placeholder } from "../_/types";

import { configBasedStyle, markComponentsChain } from "../_/install";
import { computeAlt, computeData, computeStyle, computeWrapperClass, computeWrapperStyle } from "../_/compute";
import { createPlaceholderHandler } from "../_/placeholder";
import { isBrowser, isWebComponents } from "../_/utils";
import { onDestroy, onMount } from "svelte/internal";
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
import { styleToString } from "./utils";

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
export let transition: boolean | string = undefined;
export let transitionDelay: string = undefined;
export let transitionDuration: string = undefined;
export let transitionTimingFunction: string = undefined;

let wrapper: HTMLDivElement;

let _wrapperBackgroundImage=``;
const placeholderHandler = createPlaceholderHandler( bgImage => {
    _wrapperBackgroundImage = bgImage ? `background-image:${ bgImage }` : ``;
} );

$: parsedAlt = parseAlt( alt );
$: parsedBot = parseBot( bot );
$: parsedFocus = parseFocus( focus );
$: parsedMode = parseMode( mode );
$: parsedPlaceholder = parsePlaceholder( placeholder, src );
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
    parsedTransitionDelay,
    parsedTransitionDuration,
    parsedTransitionTimingFunction
) );
$: _wrapperStyle = styleToString( computeWrapperStyle(
    parsedFocus,
    parsedMode,
    parsedPlaceholder,
    parsedPosition,
    parsedRatio,
    parsedSrc,
    parsedTransition,
    placeholderHandler.setData,
) );

if ( isBrowser ) {
    onMount( () => {
        placeholderHandler.setWrapper( wrapper );
        if ( isWebComponents ) {
            markComponentsChain( wrapper.parentNode as Element );
        }
    } );
    onDestroy( placeholderHandler.delete );
}
</script>

{#if isWebComponents }
<span>/*STYLE*/{ configBasedStyle() }</span>
{/if}
<div class = {`twic-i ${ isWebComponents ? `` : parseClassName( className ) || `` }`}>
    <div
        bind:this = { wrapper }
        class = { computeWrapperClass( parsedTransition, src ) }
        style = "{ _wrapperStyle }{ _wrapperBackgroundImage }"
    >
        <img
            alt = { _alt }
            style = { _style }
            { ..._data }
        />
    </div>
</div>
