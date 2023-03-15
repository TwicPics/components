<svelte:options tag="twic-media" />
<script context="module" lang="ts">
/* eslint-disable no-duplicate-imports */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Anchor, Mode, Placeholder, State } from "./_utils.js";
import {
    computeAlt,
    computeData,
    computePlaceholderStyle,
    computeStyle,
    computeWrapperClass,
    computeWrapperStyle,
    isBrowser,
    Observer,
    parseAlt,
    parseAnchor,
    parseBot,
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
    parseTitle,
    parseTransition,
    parseTransitionDelay,
    parseTransitionDuration,
    parseTransitionTimingFunction,
    styleToString,
} from "./_utils.js";
/* eslint-disable-next-line camelcase */
import { createEventDispatcher, onDestroy, onMount } from "svelte/internal";

</script>

<script lang="ts">
export let alt: string = undefined;
export let anchor: Anchor = undefined;
export let bot: string = undefined;
export let focus: string = undefined;
export let intrinsic: string = undefined;
export let media: HTMLElement= undefined;
export let mediaTag: string = `img`;
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

const observer = new Observer( ( _state: State )=> {
    state = _state;
} );

const stateDispatcher = createEventDispatcher();
$: stateDispatcher( `statechange`, { state } );

$: parsedAlt = parseAlt( alt );
$: parsedAnchor = parseAnchor( anchor );
$: parsedBot = parseBot( bot );
$: parsedEager = parseEager( eager );
$: parsedFocus = parseFocus( focus );
$: parsedIntrinsic = parseIntrinsic( intrinsic );
$: parsedMediaTag = mediaTag;
$: parsedMode = parseMode( mode );
$: parsedPlaceholder = parsePlaceholder( placeholder );
$: parsedPosition = parsePosition( position );
$: parsedPreTransform = parsePreTransform( preTransform );
$: parsedRatio = parseRatio( ratio );
$: parsedSrc = parseSrc( src );
$: parsedStep = parseStep( step );
$: parsedTitle = parseAlt( title );
$: parsedTransition = parseTransition( transition );
$: parsedTransitionDelay = parseTransitionDelay( transitionDelay );
$: parsedTransitionDuration = parseTransitionDuration( transitionDuration );
$: parsedTransitionTimingFunction = parseTransitionTimingFunction( transitionTimingFunction );

$: _alt = ( mediaTag === `img`? computeAlt( parsedAlt, parsedSrc ) : undefined);
$: _data = computeData(
    parsedAnchor,
    parsedBot,
    parsedEager,
    parsedFocus,
    parsedIntrinsic,
    parsedMediaTag,
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
    parsedMediaTag,
    parsedMode,
    parsedPosition,
    parsedTransitionDelay,
    parsedTransitionDuration,
    parsedTransitionTimingFunction
) );
$: _wrapperStyle = styleToString( computeWrapperStyle( parsedRatio ) );

if ( isBrowser ) {
    onMount( () => {
        observer.setMedia( media );
    } );
    onDestroy( () => {
        observer.destroy();
    } );
}
</script>
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
    <div style = { _placeholderStyle } title = { parsedTitle } />
</div>
