<script>
    import {
        computeDataBot,
        computeDataFocus,
        computeDataSrc,
        computeDataStep,
        computeHeight,
        computeStyle,
        computeWidth,
        computeWrapperClass,
        computeWrapperStyle,
    } from "../_/compute.js";

    export let bot = undefined;
    export let focus = undefined;
    export let height = undefined;
    export let mode = `cover`;
    export let placeholder = `preview`;
    export let position = `center`;
    export let ratio = undefined;
    export let step = undefined;
    export let transition = true;
    export let transitionDelay = undefined;
    export let transitionDuration = undefined;
    export let transitionTimingFunction = undefined;
    export let width = undefined;

    $: _dataBot = computeDataBot( { bot } );
    $: _dataFocus = computeDataFocus( { focus, mode } );
    $: _dataSrc = computeDataSrc( { src } );
    $: _dataStep = computeDataStep( { step } );
    $: _height = computeHeight( { height } );
    $: _style = computeStyle(
        { mode, position, transition, transitionDelay, transitionDuration, transitionTimingFunction }
    );
    $: _width = computeWidth( { width } );
    $: _wrapperClass = computeWrapperClass( { transition } );
    $: _wrapperStyle = computeWrapperStyle(
        { focus, height, mode, position, placeholder, ratio, src, width }
    );
</script>

<div
    class={ _wrapperClass }
    style={ _wrapperStyle }
>
    <video
        style={ _style }
        width={ _width }
        height={ _height }
        { ..._dataBot }
        { ..._dataFocus }
        { ..._dataSrc }
        { ..._dataStep }
    >
    </video>
</div>
