<svelte:options tag={null}/>

<script context="module" lang="ts">
import type { Anchor, Mode, Placeholder, State } from "./utils.js";
import TwicMedia from "./TwicMedia.svelte";
</script>
<script lang="ts">
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
$: props = {
    anchor,
    bot,
    className,
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
    transition,
    transitionDelay,
    transitionDuration,
    transitionTimingFunction
}
</script>
<TwicMedia mediaTag="video" bind:state { ...props } on:statechange></TwicMedia>
