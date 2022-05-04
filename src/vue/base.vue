<script>
import { booleanProp, defineStringProp, intProp, stringProp } from "./props";
import {
    computeAlt,
    computeData,
    computeStyle,
    computeWrapperClass,
    computeWrapperStyle,
} from "../_/compute";
import { createPlaceholderHandler } from "../_/placeholder";
import {
    parseAlt,
    parseBot,
    parseFocus,
    parseMode,
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
import { rValidMode, rValidPlaceholder, rValidRatio } from "../_/validation";

const callFactory = ( func, _args, isProp = false ) => {
    const args = _args.map( arg => ( ( typeof arg === `function` ) ? {
        "f": arg,
    } : {
        "s": isProp ? `${ arg }` : `p_${ arg }`,
    } ) );
    return function() {
        // eslint-disable-next-line no-invalid-this
        return func( ...args.map( ( { f, s } ) => ( f ? f( this ) : this[ s ] ) ) );
    };
};

const computed = {};
const props = {};

for ( const [ propName, type, parseMethod, args ] of [
    [ `alt`, stringProp, parseAlt ],
    [ `bot`, stringProp, parseBot ],
    [ `focus`, stringProp, parseFocus ],
    [ `mode`, defineStringProp( rValidMode ), parseMode ],
    [ `placeholder`, defineStringProp( rValidPlaceholder ), parsePlaceholder, [ `placeholder`, `src` ] ],
    [ `position`, stringProp, parsePosition ],
    [ `preTransform`, stringProp, parsePreTransform ],
    [ `ratio`, defineStringProp( rValidRatio ), parseRatio ],
    [ `src`, stringProp, parseSrc ],
    [ `step`, intProp, parseStep ],
    [ `transition`, booleanProp( null, true ), parseTransition ],
    [ `transitionDelay`, stringProp, parseTransitionDelay ],
    [ `transitionDuration`, stringProp, parseTransitionDuration ],
    [ `transitionTimingFunction`, stringProp, parseTransitionTimingFunction ],
] ) {
    computed[ `p_${ propName }` ] = callFactory( parseMethod, args || [ propName ], true );
    props[ propName ] = type;
}

for ( const [ propName, func, args ] of [
    [ `_alt`, computeAlt, [ `alt`, `src` ] ],
    [ `_dataAttributes`, computeData, [ `bot`, `focus`, `preTransform`, `src`, `step` ] ],
    [
        `_style`,
        computeStyle,
        [ `mode`, `position`, `transitionDelay`, `transitionDuration`, `transitionTimingFunction` ],
    ],
    [
        `_wrapperClass`,
        computeWrapperClass,
        [ `transition`, `src` ],
    ],
    [
        `_wrapperStyle`,
        computeWrapperStyle,
        [
            `focus`,
            `mode`,
            `placeholder`,
            `position`,
            `preTransform`,
            `ratio`,
            `src`,
            `transition`,
            c => c._p.setData,
        ],
    ],
] ) {
    computed[ propName ] = callFactory( func, args );
}

export default {
    props,
    computed,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    beforeCreate() {
        this._p = createPlaceholderHandler();
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    mounted() {
        this._p.setWrapper( this.$refs.w );
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    unmounted() {
        this._p.delete();
    },
};
</script>
<template>
    <div class="twic-i">
        <div
            ref="w"
            :class="_wrapperClass"
            :style="_wrapperStyle"
        >
            <component
                :is="_is"
                :alt="_alt"
                :style="_style"
                v-bind="{ ..._dataAttributes }"
            />
        </div>
    </div>
</template>
<style src="../_/style.css"></style>
