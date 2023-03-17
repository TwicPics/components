<script>
import {
    computeAlt,
    computeData,
    computePlaceholderStyle,
    computeStyle,
    computeWrapperClass,
    computeWrapperStyle,
} from "../_/compute";
import { Observer } from "../_/Observer";
import {
    parseAlt,
    parseAnchor,
    parseBot,
    parseFocus,
    parseIntrinsic,
    parseMediaTag,
    parseMode,
    parseEager,
    parsePlaceholder,
    parsePosition,
    parsePreTransform,
    parseRatio,
    parseSrc,
    parseStep,
    parseTitle,
    parseTransition,
    parseTransitionDelay,
    parseTransitionDuration,
    parseTransitionTimingFunction,
} from "../_/parse";
import { rValidAnchor, rValidIntrinsic, rValidMode, rValidPlaceholder, rValidRatio } from "../_/validate";
import { booleanProp, defineStringProp, intProp, stringProp } from "./props";
import { callFactory } from "./utils";

const computed = {};
const props = {};
const emits = [ `stateChange` ];

for ( const [ propName, type, parseMethod ] of [
    [ `alt`, stringProp, parseAlt ],
    [ `anchor`, defineStringProp( rValidAnchor ), parseAnchor ],
    [ `bot`, stringProp, parseBot ],
    [ `focus`, stringProp, parseFocus ],
    [ `intrinsic`, defineStringProp( rValidIntrinsic ), parseIntrinsic ],
    [ `mediaTag`, stringProp, parseMediaTag ],
    [ `mode`, defineStringProp( rValidMode ), parseMode ],
    [ `eager`, booleanProp( null, false ), parseEager ],
    [ `placeholder`, defineStringProp( rValidPlaceholder ), parsePlaceholder ],
    [ `position`, stringProp, parsePosition ],
    [ `preTransform`, stringProp, parsePreTransform ],
    [ `ratio`, defineStringProp( rValidRatio ), parseRatio ],
    [ `src`, stringProp, parseSrc ],
    [ `step`, intProp, parseStep ],
    [ `title`, stringProp, parseTitle ],
    [ `transition`, booleanProp( null, true ), parseTransition ],
    [ `transitionDelay`, stringProp, parseTransitionDelay ],
    [ `transitionDuration`, stringProp, parseTransitionDuration ],
    [ `transitionTimingFunction`, stringProp, parseTransitionTimingFunction ],
] ) {
    computed[ `p_${ propName }` ] = callFactory( parseMethod, [ propName ], true );
    props[ propName ] = type;
}

for ( const [ propName, func, args ] of [
    [ `_alt`, computeAlt, [ `alt`, `mediaTag`, `src` ] ],
    [
        `_dataAttributes`,
        computeData,
        [
            `anchor`,
            `bot`,
            `eager`,
            `focus`,
            `intrinsic`,
            `mediaTag`,
            `mode`,
            `preTransform`,
            `src`,
            `step`,
        ],
    ],
    [
        `_style`,
        computeStyle,
        [
            `anchor`,
            `mediaTag`,
            `mode`,
            `position`,
            `transitionDelay`,
            `transitionDuration`,
            `transitionTimingFunction`,
        ],
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
            `transitionDelay`,
            `transitionDuration`,
            `transitionTimingFunction`,
            c => c.observer.setPlaceholderData,
        ],
    ],
    [ `_wrapperClass`, computeWrapperClass, [ `src`, `transition` ] ],
    [ `_wrapperStyle`, computeWrapperStyle, [ `ratio` ] ],
] ) {
    computed[ propName ] = callFactory( func, args );
}

export default {
    "inheritAttrs": false,
    props,
    emits,
    computed,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    beforeCreate() {
        this.observer = new Observer( state => {
            this.$emit( `stateChange`, {
                state,
            } );
        } );
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    mounted() {
        this.observer.setMedia( this.$refs.media );
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    unmounted() {
        this.observer.destroy();
    },
};
</script>
<template>
    <div
        :class="_wrapperClass"
        :style="_wrapperStyle"
        :title="p_title"
    >
        <component
            :is="p_mediaTag"
            ref="media"
            :alt="p_mediaTag === `img` ? _alt : undefined"
            :style="_style"
            v-bind="{ ..._dataAttributes }"
        />
        <div :style="_placeholderStyle" />
    </div>
</template>
<style src="../_/style.css"></style>
