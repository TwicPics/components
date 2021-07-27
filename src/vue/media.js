import {
    computeMediaAlt,
    computeMediaDataBot,
    computeMediaDataFocus,
    computeMediaDataSrc,
    computeMediaDataStep,
    computeMediaHeight,
    computeMediaSource,
    computeMediaStyle,
    computeMediaWidth,
    computeWrapperClass,
    computeWrapperStyle,
} from "../_/compute.js";

export const computed = {
    _alt() {
        return computeMediaAlt( this );
    },
    _dataAttributes() {
        return {
            ...this._dataBot,
            ...this._dataFocus,
            ...this._dataSrc,
            ...this._dataStep,
        };
    },
    _dataBot() {
        return computeMediaDataBot( this );
    },
    _dataFocus() {
        return computeMediaDataFocus( this );
    },
    _dataSrc() {
        return computeMediaDataSrc( this );
    },
    _dataStep() {
        return computeMediaDataStep( this );
    },
    _height() {
        return computeMediaHeight( this );
    },
    _src() {
        return computeMediaSource( this );
    },
    _style() {
        return computeMediaStyle( this );
    },
    _width() {
        return computeMediaWidth( this );
    },
    _wrapperClass() {
        return computeWrapperClass( this );
    },
    _wrapperStyle() {
        return computeWrapperStyle( this );
    },
};

const rDigit = /^\d+$/;
const rMode = /^(?:contain|cover)$/;
const rPlaceholder = /^(?:maincolor|meancolor|none|preview)$/;
const rRatio = /^\d+\/\d+$/;

export const props = {
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
};
