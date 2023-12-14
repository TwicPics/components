import "../_/style.css";
import React, { useEffect, useRef } from "react";
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
import { preComputePlaceholder } from "../_/preCompute";
import type {
    Anchor,
    ScriptAttributes,
    Mode,
    Placeholder,
    State,
    VideoOptions,
} from "../_/types";
import { validAnchors, validModes, validPlaceholders } from "../_/validate";

import { boolean, func, number, oneOf, oneOfType, string } from "./props";
import type { BaseAttributes } from "./types";

export interface MediaAttributes extends BaseAttributes, ScriptAttributes {
    mediaTag: string,
    refit?: boolean | string,
    videoOptions?: VideoOptions,
}

const TwicMedia: React.FC< MediaAttributes > = props => {
    const media = useRef< HTMLElement >( null );
    const observer = useRef< Observer >(
        new Observer( ( state: State ) => {
            if ( props.onStateChange ) {
                props.onStateChange( {
                    "target": media,
                    state,
                } );
            }
        } )
    ).current;
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
                alt={ computeAlt( alt, MediaTag ) }
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
    "alt": string,
    "anchor": oneOf< Anchor >( validAnchors ),
    "bot": string,
    "className": string,
    "focus": string,
    "intrinsic": string,
    "mode": oneOf< Mode >( validModes ),
    "eager": oneOfType( [ boolean, string ] ),
    "onStateChange": func,
    "placeholder": oneOf< Placeholder >( validPlaceholders ),
    "position": string,
    "preTransform": string,
    "ratio": number,
    "src": string,
    "step": number,
    "title": string,
    "transition": oneOfType( [ boolean, string ] ),
    "transitionDelay": string,
    "transitionDuration": string,
    "transitionTimingFunction": string,
};

export default TwicMedia;
