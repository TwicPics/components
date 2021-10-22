<script>
import {
    callWithProps,
    defineProp,
    defineStringProp,
    numberProp,
    parseFactory,
    requiredStringProp,
    stringProp,
} from "./utils";
import { computeAlt, computeData, computeStyle, computeWrapperStyle } from "../_/compute";
import { handlePlaceholder, unhandlePlaceholder } from "../_/placeholder";
import { rValidMode, rValidPlaceholder, rValidRatio } from "../_/types";

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

const getPDataAndDelete = c => {
    const data = c._p;
    // eslint-disable-next-line no-param-reassign
    delete c._p;
    return data;
};
// eslint-disable-next-line no-param-reassign
const getWrapperOrCallback = c => c.$refs.w || ( data => ( c._p = data ) );

export default {
    "props": {
        "alt": stringProp,
        "bot": stringProp,
        "focus": stringProp,
        "mode": defineStringProp( rValidMode ),
        "placeholder": defineStringProp( rValidPlaceholder ),
        "position": stringProp,
        "ratio": defineStringProp( rValidRatio ),
        "src": requiredStringProp,
        "step": numberProp,
        "transition": defineProp( Boolean ),
        "transitionDuration": stringProp,
        "transitionTimingFunction": stringProp,
        "transitionDelay": stringProp,
    },
    "computed": {
        "parsedAlt": parseFactory( parseAlt, `alt` ),
        "parsedBot": parseFactory( parseBot, `bot` ),
        "parsedFocus": parseFactory( parseFocus, `focus` ),
        "parsedMode": parseFactory( parseMode, `mode` ),
        "parsedPlaceholder": parseFactory( parsePlaceholder, `placeholder` ),
        "parsedPosition": parseFactory( parsePosition, `position` ),
        "parsedRatio": parseFactory( parseRatio, `ratio` ),
        "parsedSrc": parseFactory( parseSrc, `src` ),
        "parsedStep": parseFactory( parseStep, `step` ),
        "parsedTransition": parseFactory( parseTransition, `transition` ),
        "parsedTransitionDelay": parseFactory( parseTransitionDelay, `transitionDelay` ),
        "parsedTransitionDuration": parseFactory( parseTransitionDuration, `transitionDuration` ),
        "parsedTransitionTimingFunction": parseFactory( parseTransitionTimingFunction, `transitionTimingFunction` ),
        "_alt": callWithProps( computeAlt, `parsedAlt`, `parsedSrc` ),
        "_dataAttributes": callWithProps( computeData, `parsedBot`, `parsedFocus`, `parsedSrc`, `parsedStep` ),
        "_style": callWithProps(
            computeStyle,
            `parsedMode`,
            `parsedPosition`,
            `parsedTransition`,
            `parsedTransitionDelay`,
            `parsedTransitionDuration`,
            `parsedTransitionTimingFunction`
        ),
        "_wrapperStyle": callWithProps(
            computeWrapperStyle,
            getWrapperOrCallback,
            `parsedFocus`,
            `parsedMode`,
            `parsedPlaceholder`,
            `parsedPosition`,
            `parsedRatio`,
            `parsedSrc`
        ),
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    "mounted": callWithProps( handlePlaceholder, getWrapperOrCallback, getPDataAndDelete ),
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    "unmounted": callWithProps( unhandlePlaceholder, getWrapperOrCallback ),
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
