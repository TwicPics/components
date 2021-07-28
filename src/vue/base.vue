<script>
/* eslint-disable vue/one-component-per-file */
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

const rDigit = /^\d+$/;
const rMode = /^(?:contain|cover)$/;
const rPlaceholder = /^(?:maincolor|meancolor|none|preview)$/;
const rRatio = /^\d+\/\d+$/;

export default {
    "props": {
        "alt": {
            "type": String,
            "default": undefined,
        },
        "bot": {
            "type": String,
            "default": undefined,
        },
        "focus": {
            "type": String,
            "default": undefined,
        },
        "height": {
            "type": [ String, Number ],
            "default": undefined,
            "validator": value => rDigit.test( value ),
        },
        "mode": {
            "type": String,
            "default": `cover`,
            "validator": value => rMode.test( value ),
        },
        "placeholder": {
            "type": String,
            "default": `preview`,
            "validator": value => rPlaceholder.test( value ),
        },
        "position": {
            "type": String,
            "default": `center`,
        },
        "ratio": {
            "type": String,
            "default": undefined,
            "validator": value => ( !value || rRatio.test( value ) ),
        },
        "src": {
            "type": String,
            "required": true,
        },
        "step": {
            "type": [ String, Number ],
            "default": undefined,
            "validator": value => rDigit.test( value ),
        },
        "transition": {
            "type": Boolean,
            "default": true,
        },
        "transitionDuration": {
            "type": String,
            "default": undefined,
        },
        "transitionTimingFunction": {
            "type": String,
            "default": undefined,
        },
        "transitionDelay": {
            "type": String,
            "default": undefined,
        },
        "width": {
            "type": [ String, Number ],
            "default": undefined,
            "validator": value => rDigit.test( value ),
        },
    },
    "computed": {
        _dataBot() {
            return computeDataBot( this );
        },
        _dataFocus() {
            return computeDataFocus( this );
        },
        _dataSrc() {
            return computeDataSrc( this );
        },
        _dataStep() {
            return computeDataStep( this );
        },
        _height() {
            return computeHeight( this );
        },
        _style() {
            return computeStyle( this );
        },
        _width() {
            return computeWidth( this );
        },
        _wrapperClass() {
            return computeWrapperClass( this );
        },
        _wrapperStyle() {
            return computeWrapperStyle( this );
        },
    },
};

</script>

<template>
    <div
        :class="_wrapperClass"
        :style="_wrapperStyle"
    >
        <!-- eslint-disable-next-line vue/require-component-is -->
        <component
            :is="_is"
            :alt="_alt"
            :style="_style"
            :width="_width"
            :height="_height"
            v-bind="{
                ..._dataBot,
                ..._dataFocus,
                ..._dataSrc,
                ..._dataStep,
            }"
        />
    </div>
</template>

<style src="../_/style.css"></style>
