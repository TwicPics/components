<svelte:options tag={null}/>

<script context="module" lang="ts">
import {
    computeHostAttributes,
    computeHostStyle,
    getCurrentComponent,
    isWebComponents,
    parseClassName,
    parseDraggable,
    parseDuration,
    parseFrom,
    parseId,
    parseStyle,
    parseTabIndex,
    parseTo,
    preComputeVideoOptions,
    sanitize,
    setAttributes,
    styleToString,
    type Anchor,
    type Mode,
    type Placeholder,
    type State
} from "./_utils.js";
import TwicMedia from "./TwicMedia.svelte";
</script>
<script lang="ts">
export let anchor: Anchor = undefined;
export let bot: string = undefined;
let className: string = undefined;
export { className as class };
export let crossorigin: string = undefined;
export let draggable: boolean | string = undefined;
export let duration: number | string = undefined;
export let focus: string = undefined;
export let from: number | string = undefined;
export let id: string = undefined;
export let intrinsic: string = undefined;
export let mode: Mode = undefined;
export let eager: boolean = false;
export let placeholder: Placeholder = undefined;
export let position: string = undefined;
export let posterFrom: number | string = undefined;
export let preTransform: string = undefined;
export let ratio: number | string = undefined;
export let src: string;
export let step: number | string = undefined;
export let style: string | Record< string, unknown >;
export let state: State = undefined;
export let title: string = undefined;
export let tabindex: number | string = undefined;
export let to: number | string = undefined;
export let transition: boolean | string = undefined;
export let transitionDelay: string = undefined;
export let transitionDuration: string = undefined;
export let transitionTimingFunction: string = undefined;

$: parsedClassName = parseClassName( className ) || ``;
$: parsedDraggable = parseDraggable( draggable );
$: parsedDuration = parseDuration( duration );
$: parsedFrom = parseFrom( from );
$: parsedId = parseId( id );
$: parsedPosterFrom = parseFrom( posterFrom );
$: parsedStyle = parseStyle( style );
$: parsedTabIndex = parseTabIndex( tabindex );
$: parsedTo = parseTo( to );

$: props = {
    anchor,
    bot,
    crossorigin,
    focus,
    intrinsic,
    mode,
    eager,
    placeholder,
    position,
    preTransform,
    ratio,
    src,
    step,
    title,
    transition,
    transitionDelay,
    transitionDuration,
    transitionTimingFunction
}

$: videoOptions = preComputeVideoOptions( parsedDuration, parsedFrom, parsedPosterFrom, parsedTo);

$: hostStyle = styleToString( computeHostStyle( {
    style: parsedStyle,
} ) );

$: {
    if ( isWebComponents ) {
        const hostElement = getCurrentComponent();
        hostElement.className = sanitize( `${ parsedClassName } twic-d twic-i` );
        setAttributes( `draggable`, parsedDraggable, hostElement  );
        setAttributes( `id`, parsedId, hostElement  );
        setAttributes( `tabindex`, parsedTabIndex, hostElement  );
        setAttributes( `style`, hostStyle, hostElement  );
    }
}
</script>
{#if isWebComponents}
<TwicMedia
    mediaTag="video"
    bind:state
    { ...props }
    { videoOptions }
    on:statechange
></TwicMedia>
{:else}
<div
    class = { sanitize( `twic-i ${ parsedClassName }` ) }
    { ...computeHostAttributes( {
        draggable: parsedDraggable,
        id: parsedId,
        tabindex: parsedTabIndex,
    } ) }
    style = { hostStyle }
>
    <TwicMedia
        mediaTag="video"
        bind:state
        { ...props }
        { videoOptions }
        on:statechange
    ></TwicMedia>
</div>
{/if}
