<script context="module">
    import {
        computeAlt,
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

    import { styleToString } from "./utils";

    // svelte-ignore unused-export-let
    export let bot = undefined;
    // svelte-ignore unused-export-let
    export let focus = undefined;
    // svelte-ignore unused-export-let
    export let height = undefined;
    // svelte-ignore unused-export-let
    export let mode = undefined;
    // svelte-ignore unused-export-let
    export let placeholder = undefined;
    // svelte-ignore unused-export-let
    export let position = undefined;
    // svelte-ignore unused-export-let
    export let ratio = undefined;
    // svelte-ignore unused-export-let
    export let step = undefined;
    // svelte-ignore unused-export-let
    export let transition = undefined;
    // svelte-ignore unused-export-let
    export let transitionDelay = undefined;
    // svelte-ignore unused-export-let
    export let transitionDuration = undefined;
    // svelte-ignore unused-export-let
    export let transitionTimingFunction = undefined;
    // svelte-ignore unused-export-let
    export let width = undefined;
</script>

<script>
    $$props = Object.assign( {
        "mode": `cover`,
        "placeholder": `preview`,
        "position": `center`,
        "transition": true,
    }, $$props );

    const attributes = {
        "style": styleToString( computeStyle( $$props ) ),
        "width": computeWidth( $$props ),
        "height": computeHeight( $$props ),
        ...computeDataBot( $$props ),
        ...computeDataFocus( $$props ),
        ...computeDataSrc( $$props ),
        ...computeDataStep( $$props ),
    };
    const _wrapperClass = computeWrapperClass( $$props );
    const _wrapperStyle = styleToString( computeWrapperStyle( $$props ) );
</script>

<div
    class={ _wrapperClass }
    style={ _wrapperStyle }
>
    <!-- svelte-ignore a11y-media-has-caption -->
    <video
        { ...attributes }
    >
    </video>
</div>
