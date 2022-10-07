<svelte:options tag={null}/>

<script context="module" lang="ts">
import type { Anchor, Attributes as BaseAttributes, Media, Mode, Placeholder, State } from "../_/types";

import {
    computeAlt,
    computeData,
    computePlaceholderStyle,
    computeStyle,
    computeWrapperClass,
    computeWrapperStyle,
} from "../_/compute";
import { isBrowser, isWebComponents } from "../_/utils";
import { createEventDispatcher, onDestroy, onMount } from "svelte/internal";
import {
    parseAlt,
    parseAnchor,
    parseBot,
    parseClassName,
    parseFocus,
    parseIntrinsic,
    parseMode,
    parseEager,
    parsePlaceholder,
    parsePosition,
    parsePreTransform,
    parseRatio,
    parseSrc,
    parseStep,
    parseTransition,
    parseTransitionDelay,
    parseTransitionDuration,
    parseTransitionTimingFunction,
} from "../_/parse";
import { styleToString } from "./utils";
import { Observer } from "../_/Observer";

export interface Attributes extends BaseAttributes {
    class?: string,
    state?: State
}

declare const MEDIA_TAG: string;
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
export let transition: boolean | string = undefined;
export let transitionDelay: string = undefined;
export let transitionDuration: string = undefined;
export let transitionTimingFunction: string = undefined;

let media: Media;

const observer = new Observer( ( _state: State )=> {
    state = _state;
}  );

const stateDispatcher = createEventDispatcher();
$: stateDispatcher( `statechange`, { state } );

$: parsedAlt = parseAlt( alt );
$: parsedAnchor = parseAnchor( anchor );
$: parsedBot = parseBot( bot );
$: parsedEager = parseEager( eager );
$: parsedFocus = parseFocus( focus );
$: parsedIntrinsic = parseIntrinsic( intrinsic );
$: parsedMode = parseMode( mode );
$: parsedPlaceholder = parsePlaceholder( placeholder, src );
$: parsedPosition = parsePosition( position );
$: parsedPreTransform = parsePreTransform( preTransform );
$: parsedRatio = parseRatio( ratio );
$: parsedSrc = parseSrc( src );
$: parsedStep = parseStep( step );
$: parsedTransition = parseTransition( transition );
$: parsedTransitionDelay = parseTransitionDelay( transitionDelay );
$: parsedTransitionDuration = parseTransitionDuration( transitionDuration );
$: parsedTransitionTimingFunction = parseTransitionTimingFunction( transitionTimingFunction );

$: _alt = ( MEDIA_TAG === "video" ? undefined : computeAlt( parsedAlt, parsedSrc ) );
$: _data = computeData(
    parsedAnchor,
    parsedBot,
    parsedEager,
    parsedFocus,
    parsedIntrinsic,
    parsedMode,
    parsedPreTransform,
    parsedSrc,
    parsedStep
);
$: _placeholderStyle = styleToString( computePlaceholderStyle(
    parsedAnchor,
    parsedFocus,
    parsedMode,
    parsedPlaceholder,
    parsedPosition,
    parsedPreTransform,
    parsedRatio,
    parsedSrc,
    parsedTransition,
    parsedTransitionDelay,
    parsedTransitionDuration,
    parsedTransitionTimingFunction,
    observer.setPlaceholderData,
) );

$: _style = styleToString( computeStyle(
    parsedAnchor,
    parsedMode,
    parsedPosition,
    parsedTransitionDelay,
    parsedTransitionDuration,
    parsedTransitionTimingFunction
) );
$: _wrapperStyle = styleToString( computeWrapperStyle( parsedRatio ) );

// this happens BEFORE onMount
$: isWebComponents && media && ( media.parentElement.parentElement.className += ` twic-d twic-i ` );

if ( isBrowser ) {
    onMount( () => {
        observer.setMedia( media );
    } );
    onDestroy( () => {
        observer.destroy();
    } );
}
</script>

{#if isWebComponents}
<div
    class = { computeWrapperClass( src, parsedTransition ) }
    style = { _wrapperStyle }
>
    <img
        bind:this = { media }
        alt = { _alt }
        style = { _style }
        { ..._data }
    />
    <div style = "{ _placeholderStyle }" />
</div>
{:else}
<div class = {`twic-i ${ parseClassName( className ) || `` }`}>
    <div
        class = { computeWrapperClass( src, parsedTransition ) }
        style = { _wrapperStyle }
    >
        <img
            bind:this = { media }
            alt = { _alt }
            style = { _style }
            { ..._data }
        />
        <div style = "{ _placeholderStyle }" />
    </div>
</div>
{/if}
