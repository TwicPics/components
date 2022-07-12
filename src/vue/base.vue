<script>
import { booleanProp, defineStringProp, intProp, stringProp } from "./props";
import {
    computeAlt,
    computeData,
    computePlaceholderStyle,
    computeStyle,
    computeWrapperClass,
    computeWrapperStyle,
} from "../_/compute";
import { createPlaceholderHandler } from "../_/placeholder";
import {
    parseAlt,
    parseAnchor,
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

const rInitialProps = /^(\*+)(.*[^*])(\*+)$/;

const callFactory = ( func, _args, isProp = false ) => {
    const args = _args.map( arg => ( ( typeof arg === `function` ) ? {
        "f": arg,
    } : {
        // eslint-disable-next-line no-nested-ternary
        "s": isProp ?
            `${ arg }` :
            ( rInitialProps.test( `${ arg }` ) ? `${ `${ arg }`.replace( rInitialProps, `$2` ) }` : `p_${ arg }` ),
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
    [ `anchor`, stringProp, parseAnchor ],
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
    [ `_dataAttributes`, computeData, [ `anchor`, `bot`, `focus`, `mode`, `preTransform`, `src`, `step` ] ],
    [
        `_style`,
        computeStyle,
        [ `anchor`, `mode`, `position`, `transitionDelay`, `transitionDuration`, `transitionTimingFunction` ],
    ],
    [
        `_placeholderStyle`,
        computePlaceholderStyle,
        [
            `anchor`,
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
    [ `_wrapperClass`, computeWrapperClass, [ `src`, `transition` ] ],
    [ `_wrapperStyle`, computeWrapperStyle, [ `ratio` ] ],
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
        this._p.setPlaceholderElement( this.$refs.p );
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
            :class="_wrapperClass"
            :style="_wrapperStyle"
        >
            <component
                :is="_is"
                :alt="_alt"
                :style="_style"
                v-bind="{ ..._dataAttributes }"
            />
            <div
                ref="p"
                :style="_placeholderStyle"
            />
        </div>
    </div>
</template>
<style src="../_/style.css"></style>
