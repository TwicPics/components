<svelte:options tag="twic-media" />
<script context="module" lang="ts">
/* eslint-disable no-duplicate-imports */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    type Anchor,
    type CrossOrigin,
    type Decoding,
    type Mode,
    type Placeholder,
    type ReferrerPolicy,
    type State,
    type VideoOptions,
} from "./_utils.js";
import {
    computeData,
    computeMediaAttributes,
    computePlaceholderStyle,
    computeStyle,
    computeWrapperClass,
    computeWrapperStyle,
    isBrowser,
    Observer,
    parseAlt,
    parseAnchor,
    parseBot,
    parseClassName,
    parseCrossOrigin,
    parseDecoding,
    parseFocus,
    parseIntrinsic,
    parseMediaTag,
    parseMode,
    parseEager,
    parsePlaceholder,
    parsePosition,
    parsePreTransform,
    parseRatio,
    parseReferrerPolicy,
    parseRefit,
    parseSrc,
    parseStep,
    parseTitle,
    parseTransition,
    parseTransitionDelay,
    parseTransitionDuration,
    parseTransitionTimingFunction,
    preComputePlaceholder,
    styleToString,
} from "./_utils.js";
/* eslint-disable-next-line camelcase */
import { createEventDispatcher, onDestroy, onMount } from "svelte";
</script>

<script lang="ts">
export let alt: string = undefined;
export let anchor: Anchor = undefined;
export let bot: string = undefined;
let className: string = undefined;
export { className as class };
export let crossorigin: CrossOrigin = undefined;
export let decoding: Decoding = undefined;
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
export let referrerpolicy: ReferrerPolicy = undefined;
export let refit: boolean | string = undefined;
export let src: string;
export let step: number | string = undefined;
export let state: State = undefined;
export let title: string = undefined;
export let transition: boolean | string = undefined;
export let transitionDelay: string = undefined;
export let transitionDuration: string = undefined;
export let transitionTimingFunction: string = undefined;
export let videoOptions: VideoOptions = undefined;

const observer = new Observer( ( _state: State )=> {
    state = _state;
} );

const stateDispatcher = createEventDispatcher();
$: stateDispatcher( `statechange`, { state } );

$: parsedAlt = parseAlt( alt );
$: parsedAnchor = parseAnchor( anchor );
$: parsedBot = parseBot( bot );
$: parsedClassName = parseClassName( className ) || ``;
$: parsedCrossOrigin = parseCrossOrigin( crossorigin );
$: parsedDecoding = parseDecoding( decoding );
$: parsedEager = parseEager( eager );
$: parsedFocus = parseFocus( focus );
$: parsedIntrinsic = parseIntrinsic( intrinsic );
$: parsedMediaTag = parseMediaTag( mediaTag );
$: parsedMode = parseMode( mode );
$: parsedPlaceholder = parsePlaceholder( placeholder );
$: parsedPosition = parsePosition( position );
$: parsedPreTransform = parsePreTransform( preTransform );
$: parsedRatio = parseRatio( ratio );
$: parsedReferrerpolicy = parseReferrerPolicy ( referrerpolicy );
$: parsedRefit = parseRefit( refit );
$: parsedSrc = parseSrc( src );
$: parsedStep = parseStep( step );
$: parsedTitle = parseTitle( title );
$: parsedTransition = parseTransition( transition );
$: parsedTransitionDelay = parseTransitionDelay( transitionDelay );
$: parsedTransitionDuration = parseTransitionDuration( transitionDuration );
$: parsedTransitionTimingFunction = parseTransitionTimingFunction( transitionTimingFunction );
$: parsedVideoOptions = videoOptions;

$: parsedPlaceholder_ = preComputePlaceholder( parsedPlaceholder, parsedSrc );
$: _data = computeData(
    parsedAnchor,
    parsedBot,
    parsedEager,
    parsedFocus,
    parsedIntrinsic,
    parsedMediaTag,
    parsedMode,
    parsedPreTransform,
    parsedRefit,
    parsedSrc,
    parsedStep,
    parsedVideoOptions,
);
$: _mediaAttributes = computeMediaAttributes( {
    alt: parsedAlt,
    crossorigin: parsedCrossOrigin,
    decoding: parsedDecoding,
    mediaTag: parsedMediaTag,
    referrerpolicy: parsedReferrerpolicy,
} );
$: _placeholderStyle = styleToString( computePlaceholderStyle(
    parsedAnchor,
    parsedFocus,
    parsedMode,
    parsedPlaceholder_,
    parsedPosition,
    parsedPreTransform,
    parsedRatio,
    parsedRefit,
    parsedSrc,
    parsedTransition,
    parsedTransitionDelay,
    parsedTransitionDuration,
    parsedTransitionTimingFunction,
    parsedVideoOptions,
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
    class = { computeWrapperClass( parsedClassName, src, parsedTransition ) }
    style = { _wrapperStyle }
    title = { parsedTitle }
>
    <svelte:element this={ mediaTag }
        bind:this = { media }
        style = { _style }
        { ..._data }
        { ..._mediaAttributes }
    ></svelte:element>
    {#if parsedPlaceholder_ }
        <div style = { _placeholderStyle } />
    {/if}
</div>
