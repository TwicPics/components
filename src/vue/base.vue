<script>
import { defineProp, defineStringProp, intProp, requiredStringProp, stringProp } from "./props";
import { computeAlt, computeData, computeStyle, computeWrapperStyle } from "../_/compute";
import { createPlaceholderHandler } from "../_/placeholder";
import {
    parseAlt,
    parseBot,
    parseFocus,
    parseMode,
    parsePlaceholder,
    parsePosition,
    parseRatio,
    parseSrc,
    parseStep,
    parseTransition,
    parseTransitionDelay,
    parseTransitionDuration,
    parseTransitionTimingFunction,
} from "../_/parse";
import { rValidMode, rValidPlaceholder, rValidRatio, rValidTransition } from "../_/types";

const callFactory = ( func, _args ) => {
    const args = _args.map( arg => ( ( typeof arg === `function` ) ? {
        "f": arg,
    } : {
        "s": `p_${ arg }`,
    } ) );
    return function() {
        // eslint-disable-next-line no-invalid-this
        return func( ...args.map( ( { f, s } ) => ( f ? f( this ) : this[ s ] ) ) );
    };
};

const computed = {};
const props = {};

for ( const [ propName, type, parseMethod ] of [
    [ `alt`, stringProp, parseAlt ],
    [ `bot`, stringProp, parseBot ],
    [ `focus`, stringProp, parseFocus ],
    [ `mode`, defineStringProp( rValidMode ), parseMode ],
    [ `placeholder`, defineStringProp( rValidPlaceholder ), parsePlaceholder ],
    [ `position`, stringProp, parsePosition ],
    [ `ratio`, defineStringProp( rValidRatio ), parseRatio ],
    [ `src`, requiredStringProp, parseSrc ],
    [ `step`, intProp, parseStep ],
    [ `transition`, defineProp( Boolean, rValidTransition ), parseTransition ],
    [ `transitionDelay`, stringProp, parseTransitionDelay ],
    [ `transitionDuration`, stringProp, parseTransitionDuration ],
    [ `transitionTimingFunction`, stringProp, parseTransitionTimingFunction ],
] ) {
    computed[ `p_${ propName }` ] = function() {
        return parseMethod( this[ propName ] );
    };
    props[ propName ] = type;
}

for ( const [ propName, func, args ] of [
    [ `_alt`, computeAlt, [ `alt`, `src` ] ],
    [ `_dataAttributes`, computeData, [ `bot`, `focus`, `src`, `step` ] ],
    [
        `_style`,
        computeStyle,
        [ `mode`, `position`, `transition`, `transitionDelay`, `transitionDuration`, `transitionTimingFunction` ],
    ],
    [
        `_wrapperStyle`,
        computeWrapperStyle,
        [ `focus`, `mode`, `placeholder`, `position`, `ratio`, `src`, c => c._p.setData ],
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
    <div
        ref="w"
        class="twic-w"
        :style="_wrapperStyle"
    >
        <component
            :is="_is"
            :alt="_alt"
            :style="_style"
            v-bind="{ ..._dataAttributes }"
        />
    </div>
</template>
<style src="../_/style.css"></style>
