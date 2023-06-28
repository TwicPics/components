import "../_/style.css";
import React, { useEffect, useRef } from "react";
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
    parseTitle,
    parseTransition,
    parseTransitionDelay,
    parseTransitionDuration,
    parseTransitionTimingFunction,
    parseMediaTag,
    parseClassName,
    parseRefit,
} from "../_/parse";
import type {
    Anchor,
    Mode,
    Placeholder,
    State,
    VideoOptions,
} from "../_/types";
import { validAnchors, validModes, validPlaceholders } from "../_/validate";
import { preComputePlaceholder } from "../_/preCompute";
import { number } from "./props";
import type { BaseAttributes } from "./types";

export interface MediaAttributes extends BaseAttributes {
    mediaTag: string,
    refit?: boolean | string,
    videoOptions?: VideoOptions,
}

const TwicMedia: React.FC< MediaAttributes > = props => {
    const media = useRef< HTMLElement >( null );
    const observer = new Observer( ( state: State ) => {
        if ( props.onStateChange ) {
            props.onStateChange( {
                "target": media.current,
                state,
            } );
        }
    } );
    useEffect(
        () => {
            observer.setMedia( media.current );
            return () => {
                observer.destroy();
            };
        },
        []
    );
    const alt = parseAlt( props.alt );
    const anchor = parseAnchor( props.anchor );
    const bot = parseBot( props.bot );
    const className = parseClassName( props.className );
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
    const refit = parseRefit( props.refit );
    const src = parseSrc( props.src );
    const step = parseStep( props.step );
    const title = parseTitle( props.title );
    const transition = parseTransition( props.transition );
    const transitionDelay = parseTransitionDelay( props.transitionDelay );
    const transitionDuration = parseTransitionDuration( props.transitionDuration );
    const transitionTimingFunction = parseTransitionTimingFunction( props.transitionTimingFunction );
    const { videoOptions } = props;
    const placeholder_ = preComputePlaceholder( placeholder, src );
    return (
        <div
            className={ computeWrapperClass( className, props.src, transition ) }
            style={ computeWrapperStyle( ratio ) }
            title={ title }
        >
            <MediaTag
                ref={ media }
                alt={ computeAlt( alt, MediaTag, src ) }
                style={ computeStyle(
                    anchor,
                    MediaTag,
                    mode,
                    position,
                    transitionDelay,
                    transitionDuration,
                    transitionTimingFunction
                ) }
                { ...computeData(
                    anchor,
                    bot,
                    eager,
                    focus,
                    intrinsic,
                    MediaTag,
                    mode,
                    preTransform,
                    refit,
                    src,
                    step,
                    videoOptions
                ) }
            />
            { placeholder_ && (
                <div
                    style = {
                        computePlaceholderStyle(
                            anchor,
                            focus,
                            mode,
                            placeholder_,
                            position,
                            preTransform,
                            ratio,
                            refit,
                            src,
                            transition,
                            transitionDelay,
                            transitionDuration,
                            transitionTimingFunction,
                            videoOptions,
                            observer.setPlaceholderData
                        )
                    }
                />
            ) }
        </div>
    );
};

TwicMedia.propTypes = {
    "alt": PropTypes.string,
    "anchor": PropTypes.oneOf< Anchor >( validAnchors ),
    "bot": PropTypes.string,
    "className": PropTypes.string,
    "focus": PropTypes.string,
    "intrinsic": PropTypes.string,
    "mode": PropTypes.oneOf< Mode >( validModes ),
    "eager": PropTypes.oneOfType( [ PropTypes.bool, PropTypes.string ] ),
    "onStateChange": PropTypes.func,
    "placeholder": PropTypes.oneOf< Placeholder >( validPlaceholders ),
    "position": PropTypes.string,
    "preTransform": PropTypes.string,
    "ratio": number,
    "src": PropTypes.string,
    "step": number,
    "title": PropTypes.string,
    "transition": PropTypes.oneOfType( [ PropTypes.bool, PropTypes.string ] ),
    "transitionDelay": PropTypes.string,
    "transitionDuration": PropTypes.string,
    "transitionTimingFunction": PropTypes.string,
};

export default TwicMedia;
