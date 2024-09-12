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
    parseClassName,
    parseFocus,
    parseIntrinsic,
    parseMediaTag,
    parseMode,
    parseEager,
    parsePlaceholder,
    parsePosition,
    parsePreTransform,
    parseRatio,
    parseRefit,
    parseSrc,
    parseStep,
    parseTitle,
    parseTransition,
    parseTransitionDelay,
    parseTransitionDuration,
    parseTransitionTimingFunction,
} from "../_/parse";
import { preComputePlaceholder } from "../_/preCompute";
import { rValidAnchor, rValidIntrinsic, rValidMode, rValidPlaceholder, rValidRatio } from "../_/validate";
import { booleanProp, defineStringProp, intProp, stringProp, videoOptionsProp } from "./props";
import { callFactory } from "./utils";

const computed = {};
const props = {};
const emits = [ `stateChange` ];

for ( const [ propName, type, parseMethod ] of [
    [ `alt`, stringProp, parseAlt ],
    [ `anchor`, defineStringProp( rValidAnchor ), parseAnchor ],
    [ `bot`, stringProp, parseBot ],
    [ `className`, stringProp, parseClassName ],
    [ `focus`, stringProp, parseFocus ],
    [ `intrinsic`, defineStringProp( rValidIntrinsic ), parseIntrinsic ],
    [ `mediaTag`, stringProp, parseMediaTag ],
    [ `mode`, defineStringProp( rValidMode ), parseMode ],
    [ `eager`, booleanProp( null, false ), parseEager ],
    [ `placeholder`, defineStringProp( rValidPlaceholder ), parsePlaceholder ],
    [ `position`, stringProp, parsePosition ],
    [ `preTransform`, stringProp, parsePreTransform ],
    [ `ratio`, defineStringProp( rValidRatio ), parseRatio ],
    [ `refit`, booleanProp( null, false ), parseRefit ],
    [ `src`, stringProp, parseSrc ],
    [ `step`, intProp, parseStep ],
    [ `title`, stringProp, parseTitle ],
    [ `transition`, booleanProp( null, true ), parseTransition ],
    [ `transitionDelay`, stringProp, parseTransitionDelay ],
    [ `transitionDuration`, stringProp, parseTransitionDuration ],
    [ `transitionTimingFunction`, stringProp, parseTransitionTimingFunction ],
    [ `videoOptions`, videoOptionsProp, v => v ],
] ) {
    computed[ `p_${ propName }` ] = callFactory( parseMethod, [ `*${ propName }*` ] );
    props[ propName ] = type;
}
computed[ `p_undefined` ] = () => undefined;

for ( const [ propName, func, args ] of [
    [ `_alt`, computeAlt, [ `alt`, `mediaTag` ] ],
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
            `refit`,
            `src`,
            `step`,
            `videoOptions`,
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
            `placeholder_`,
            `position`,
            `preTransform`,
            `ratio`,
            `refit`,
            `src`,
            `transition`,
            `transitionDelay`,
            `transitionDuration`,
            `transitionTimingFunction`,
            `videoOptions`,
            c => c.observer.setPlaceholderData,
        ],
    ],
    [
        `p_placeholder_`,
        preComputePlaceholder,
        [
            `placeholder`,
            `src`,
        ],
    ],
    [ `_wrapperClass`, computeWrapperClass, [ `className`, `src`, `transition` ] ],
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
        <div
            v-if="p_placeholder_"
            :style="_placeholderStyle"
        />
    </div>
</template>
<style src="../_/style.css"></style>
