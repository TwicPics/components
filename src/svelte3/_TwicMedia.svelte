<svelte:options tag="twic-media" />
<script context="module" lang="ts">
/* eslint-disable no-duplicate-imports */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Anchor, Media, Mode, Placeholder, State } from "./_utils.js";
import {
    computeAlt,
    computeData,
    computePlaceholderStyle,
    computeStyle,
    computeWrapperClass,
    computeWrapperStyle,
    isBrowser,
    isWebComponents,
    Observer,
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
    styleToString,
} from "./_utils.js";
/* eslint-disable-next-line camelcase */
import { createEventDispatcher, get_current_component, onDestroy, onMount } from "svelte/internal";
</script>

<script lang="ts">
export let alt: string = undefined;
export let anchor: Anchor = undefined;
export let bot: string = undefined;
export let className: string = undefined;
export let focus: string = undefined;
export let intrinsic: string = undefined;
export let mediaTag: 'img' | 'video';
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
} );

const stateDispatcher = createEventDispatcher();
$: stateDispatcher( `statechange`, { state } );

$: isVideo = mediaTag === `video`;
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
$: parsedSrc = mediaTag && parseSrc( src );
$: parsedStep = parseStep( step );
$: parsedTransition = parseTransition( transition );
$: parsedTransitionDelay = parseTransitionDelay( transitionDelay );
$: parsedTransitionDuration = parseTransitionDuration( transitionDuration );
$: parsedTransitionTimingFunction = parseTransitionTimingFunction( transitionTimingFunction );

$: _alt = ( isVideo ? undefined : computeAlt( parsedAlt, parsedSrc ) );
$: _data = computeData(
    parsedAnchor,
    parsedBot,
    parsedEager,
    parsedFocus,
    parsedIntrinsic,
    isVideo,
    parsedMode,
    parsedPreTransform,
    parsedSrc,
    parsedStep,
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
$: {
    if ( isWebComponents ) {
        get_current_component().className = `${ parseClassName( className ) || `` } twic-d twic-i`;
    }
}

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
    <svelte:element this={ mediaTag }
        bind:this = { media }
        alt = { _alt }
        style = { _style }
        { ..._data }
    ></svelte:element>
    <div style = { _placeholderStyle } />
</div>
{:else}
<div class = {`twic-i ${ parseClassName( className ) || `` }`}>
    <div
        class = { computeWrapperClass( src, parsedTransition ) }
        style = { _wrapperStyle }
    >
        <svelte:element this={ mediaTag }
            bind:this = { media }
            alt = { _alt }
            style = { _style }
            { ..._data }
        ></svelte:element>
        <div style = { _placeholderStyle } />
    </div>
</div>
{/if}
