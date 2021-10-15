<svelte:options tag={null}/>

<script context="module" lang="ts">
import { configBasedStyle, markComponentsChain } from "../_/install";

import {
    _computeAlt,
    _computeData,
    _computeStyle,
    _computeWrapperClass,
    _computeWrapperData,
    _computeWrapperStyle,
} from "../_/compute";

import { isWebComponents } from "../_/utils";

import { element, append, onMount } from "svelte/internal";

import { styleToString } from "./utils";

import type { Attributes as BaseAttributes, Mode, OptionalNumber, OptionalString, Placeholder } from "../_/types";

export interface Attributes extends BaseAttributes {
    class?: OptionalString,
}

declare const MEDIA_TAG: string;
</script>
<script lang="ts">
export let alt: OptionalString = undefined;
export let bot: OptionalString = undefined;
let className: OptionalString = undefined;
export { className as class };
export let focus: OptionalString = undefined;
export let height: OptionalNumber = undefined;
export let mode: Mode = undefined;
export let placeholder: Placeholder = `preview`;
export let position: OptionalString = undefined;
export let ratio: OptionalString = undefined;
export let src: string;
export let step: OptionalNumber = undefined;
export let transition: boolean = true;
export let transitionDelay: OptionalString = undefined;
export let transitionDuration: OptionalString = undefined;
export let transitionTimingFunction: OptionalString = undefined;
export let width: OptionalString = undefined;

$: _alt = ( MEDIA_TAG === "video" ? undefined : _computeAlt( alt, src ) );
$: _data = _computeData( bot, focus, src, step );
$: _style = styleToString( _computeStyle(
    mode,
    position,
    transition,
    transitionDelay,
    transitionDuration,
    transitionTimingFunction
) );
$: _wrapperData = _computeWrapperData( focus, placeholder, src );
$: _wrapperStyle = styleToString( _computeWrapperStyle( height, mode, position, ratio, width ) );

let container: HTMLDivElement;

if ( isWebComponents ) {
    onMount( () => {
        const { parentNode } = container;
        markComponentsChain( parentNode as Element );
        const style = element( `style` );
        style.textContent = `/*STYLE*/${ configBasedStyle() }`;
        append( parentNode, style );
    } );
}
</script>

<div
    bind:this = { container }
    class = { _computeWrapperClass( isWebComponents ? undefined : className ) }
    style = { _wrapperStyle }
    { ..._wrapperData }
>
    <img
        alt = { _alt }
        style = { _style }
        { ..._data }
    />
</div>
