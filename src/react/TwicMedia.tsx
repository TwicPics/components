/* eslint-disable max-lines */
import "../_/style.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
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
    parseMode,
    parseEager,
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
    parseMediaTag,
} from "../_/parse";
import type { Attributes, Anchor, Mode, Placeholder, State, StateEvent } from "../_/types";
import { validAnchors, validModes, validPlaceholders } from "../_/validate";

type onStateChangeType = ( stateEvent: StateEvent ) => void;
export interface BaseAttributes extends Attributes {
    className?: string,
    onStateChange?: onStateChangeType,
}
interface MediaAttributes extends BaseAttributes {
    mediaTag: string,
}

const { oneOf, string } = PropTypes;
const number = PropTypes.oneOfType( [ PropTypes.number, string ] );
interface MediaPropTypes {
    alt: PropTypes.Requireable<string>;
    anchor: PropTypes.Requireable<Anchor>;
    bot: PropTypes.Requireable<string>;
    className: PropTypes.Requireable<string>;
    focus: PropTypes.Requireable<string>;
    intrinsic: PropTypes.Requireable<string>;
    mode: PropTypes.Requireable<Mode>;
    eager: PropTypes.Requireable<boolean | string>;
    mediaTag: PropTypes.Requireable<string>;
    onStateChange: PropTypes.Requireable<onStateChangeType>;
    placeholder: PropTypes.Requireable<Placeholder>;
    position: PropTypes.Requireable<string>;
    preTransform: PropTypes.Requireable<string>;
    ratio: PropTypes.Requireable<number | string>;
    src: PropTypes.Validator<string>;
    step: PropTypes.Requireable<number | string>;
    transition: PropTypes.Requireable<boolean | string>;
    transitionDelay: PropTypes.Requireable<string>;
    transitionDuration: PropTypes.Requireable<string>;
    transitionTimingFunction: PropTypes.Requireable<string>;
}

class TwicMedia extends Component< MediaAttributes > {
    static propTypes: MediaPropTypes;
    private media: React.RefObject< HTMLElement >;
    private observer: Observer;
    constructor( attributes: MediaAttributes ) {
        super( attributes );
        this.observer = new Observer( ( state: State ) => {
            if ( this.props.onStateChange ) {
                this.props.onStateChange(
                    {
                        "target": this,
                        state,
                    }
                );
            }
        } );
        this.media = React.createRef();
    }
    componentDidMount() {
        this.observer.setMedia( this.media.current );
    }
    componentWillUnmount() {
        this.observer.destroy();
    }
    render() {
        const { props } = this;
        const alt = parseAlt( props.alt );
        const anchor = parseAnchor( props.anchor );
        const bot = parseBot( props.bot );
        const className = parseClassName( props.className ) || ``;
        const eager = parseEager( props.eager );
        // eslint-disable-next-line no-shadow
        const focus = parseFocus( props.focus );
        const intrinsic = parseIntrinsic( props.intrinsic );
        const MediaTag = parseMediaTag( props.mediaTag );
        const mode = parseMode( props.mode );
        const placeholder = parsePlaceholder( props.placeholder );
        const position = parsePosition( props.position );
        const preTransform = parsePreTransform( props.preTransform );
        const ratio = parseRatio( props.ratio );
        const src = parseSrc( props.src );
        const step = parseStep( props.step );
        const transition = parseTransition( props.transition );
        const transitionDelay = parseTransitionDelay( props.transitionDelay );
        const transitionDuration = parseTransitionDuration( props.transitionDuration );
        const transitionTimingFunction = parseTransitionTimingFunction( props.transitionTimingFunction );

        return (
            <div className= { `twic-i ${ className }` }>
                <div
                    className = { computeWrapperClass( props.src, transition ) }
                    style = { computeWrapperStyle( ratio ) }
                >
                    <MediaTag
                        ref={ this.media }
                        alt = { MediaTag === `img` ? computeAlt( alt, src ) : undefined }
                        style = {
                            computeStyle(
                                anchor,
                                MediaTag,
                                mode,
                                position,
                                transitionDelay,
                                transitionDuration,
                                transitionTimingFunction
                            )
                        }
                        {
                            ...computeData(
                                anchor,
                                bot,
                                eager,
                                focus,
                                intrinsic,
                                MediaTag,
                                mode,
                                preTransform,
                                src,
                                step
                            )
                        }
                    />
                    <div
                        style = {
                            computePlaceholderStyle(
                                anchor,
                                focus,
                                mode,
                                placeholder,
                                position,
                                preTransform,
                                ratio,
                                src,
                                transition,
                                transitionDelay,
                                transitionDuration,
                                transitionTimingFunction,
                                this.observer.setPlaceholderData
                            )
                        }
                    />
                </div>
            </div>
        );
    }
}
TwicMedia.propTypes = {
    "alt": string,
    "anchor": oneOf< Anchor >( validAnchors ),
    "bot": string,
    "className": string,
    "focus": string,
    "intrinsic": string,
    "mode": oneOf< Mode >( validModes ),
    "eager": PropTypes.oneOfType( [
        PropTypes.bool,
        PropTypes.string,
    ] ),
    "mediaTag": string,
    "onStateChange": PropTypes.func,
    "placeholder": oneOf< Placeholder >( validPlaceholders ),
    "position": string,
    "preTransform": string,
    "ratio": string,
    "src": string,
    "step": number,
    "transition": PropTypes.oneOfType( [
        PropTypes.bool,
        PropTypes.string,
    ] ),
    "transitionDelay": string,
    "transitionDuration": string,
    "transitionTimingFunction": string,
};

export default TwicMedia;
