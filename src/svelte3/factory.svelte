<script context="module" lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars, vue/comment-directive */
import {
    _computeAlt,
    _computeDataBot,
    _computeDataFocus,
    _computeDataSrc,
    _computeDataStep,
    _computeHeight,
    _computeNoScriptSrc,
    _computeStyle,
    _computeWidth,
    _computeWrapperClass,
    _computeWrapperStyle,
} from "../_/compute";

import { isBrowser } from "../_/utils";

import { styleToString } from "./utils";

import type { Mode, OptionalNumber, OptionalString, Placeholder } from "../_/types";
declare const MEDIA_TAG: string;
</script>
<script lang="ts">
export let alt: OptionalString = undefined;
export let bot: OptionalString = undefined;
export let focus: OptionalString = undefined;
export let height: OptionalNumber = undefined;
export let mode: Mode = `cover`;
export let placeholder: Placeholder = `preview`;
export let position: OptionalString = `center`;
export let ratio: OptionalString = undefined;
export let src: string;
export let step: OptionalNumber = undefined;
export let transition: boolean = true;
export let transitionDelay: OptionalString = undefined;
export let transitionDuration: OptionalString = undefined;
export let transitionTimingFunction: OptionalString = undefined;
export let width: OptionalString = undefined;

$: _alt = ( MEDIA_TAG === "video" ? undefined : _computeAlt( alt, src ) );
$: _dataBot = _computeDataBot( bot );
$: _dataFocus = _computeDataFocus( focus, mode );
$: _dataSrc = _computeDataSrc( src );
$: _dataStep = _computeDataStep( step );
$: _height = _computeHeight( height );
$: _noScriptSrc = !isBrowser && _computeNoScriptSrc( focus, height, mode, ratio, src, width );
$: _style = styleToString( _computeStyle(
    mode,
    position,
    transition,
    transitionDelay,
    transitionDuration,
    transitionTimingFunction
) );
$: _width = _computeWidth( width );
$: _wrapperClass = _computeWrapperClass( transition );
$: _wrapperStyle = styleToString( _computeWrapperStyle(
    focus,
    height,
    mode,
    placeholder,
    position,
    ratio,
    src,
    width
) );
</script>

<div
    class={ _wrapperClass }
    style={ _wrapperStyle }
>
    {#if _noScriptSrc}
        <noscript>
            <img
                alt={ _alt }
                src={ _noScriptSrc }
                style={ _style }
                width={ _width }
                height={ _height }
                loading="lazy"
            />
        </noscript>
    {/if}
    <img
        alt={ _alt }
        style={ _style }
        width={ _width }
        height={ _height }
        { ..._dataBot }
        { ..._dataFocus }
        { ..._dataSrc }
        { ..._dataStep }
    />
</div>
