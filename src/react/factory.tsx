import "../_/style.css";

import type { Anchor, Attributes as BaseAttributes, Mode, Placeholder, PlaceholderHandler } from "../_/types";
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
    parseClassName,
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

// eslint-disable-next-line no-use-before-define
import React from "react";
import PropTypes from "prop-types";
import { validAnchors, validModes, validPlaceholders } from "../_/validate";

export interface Attributes extends BaseAttributes {
    className?: string,
}

const defaultProps: Attributes = {
    "alt": undefined,
    "anchor": undefined,
    "bot": undefined,
    "className": undefined,
    "focus": undefined,
    "mode": undefined,
    "placeholder": undefined,
    "position": undefined,
    "preTransform": undefined,
    "ratio": undefined,
    "src": undefined,
    "step": undefined,
    "transition": undefined,
    "transitionDelay": undefined,
    "transitionDuration": undefined,
    "transitionTimingFunction": undefined,
};

const { oneOf, string } = PropTypes;

const number = PropTypes.oneOfType( [ PropTypes.number, string ] );

const propTypes = {
    "alt": string,
    "anchor": oneOf< Anchor >( validAnchors ),
    "bot": string,
    "className": string,
    "focus": string,
    "mode": oneOf< Mode >( validModes ),
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

export default ( Tag: `img` | `video`, withAlt?: boolean ):
    React.ComponentType< Attributes > => {
    class Component extends React.Component< Attributes > {
        static defaultProps: Attributes;
        static propTypes: {
            alt: PropTypes.Requireable<string>;
            anchor: PropTypes.Requireable<Anchor>;
            bot: PropTypes.Requireable<string>;
            className: PropTypes.Requireable<string>;
            focus: PropTypes.Requireable<string>;
            mode: PropTypes.Requireable<Mode>;
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
        };
        private _p: PlaceholderHandler;
        private _pe: React.RefObject< HTMLDivElement >;
        constructor( attributes: Attributes ) {
            super( attributes );
            this._p = createPlaceholderHandler();
            this._pe = React.createRef();
        }
        componentDidMount() {
            this._p.setPlaceholderElement( this._pe.current );
        }
        componentWillUnmount() {
            this._p.delete();
        }
        render() {
            const { props } = this;
            const alt = withAlt && parseAlt( props.alt );
            const anchor = parseAnchor( props.anchor );
            const bot = parseBot( props.bot );
            const className = parseClassName( props.className ) || ``;
            // eslint-disable-next-line no-shadow
            const focus = parseFocus( props.focus );
            const mode = parseMode( props.mode );
            const placeholder = parsePlaceholder( props.placeholder, props.src );
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
                        <Tag
                            alt = { withAlt ? computeAlt( alt, src ) : undefined }
                            style = {
                                computeStyle(
                                    anchor,
                                    mode,
                                    position,
                                    transitionDelay,
                                    transitionDuration,
                                    transitionTimingFunction
                                ) }
                            { ...computeData( anchor, bot, focus, mode, preTransform, src, step ) }
                        />
                        <div
                            ref={ this._pe }
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
                                    this._p.setData
                                )
                            }
                        />
                    </div>
                </div>
            );
        }
    }
    Component.defaultProps = defaultProps;
    Component.propTypes = propTypes;
    return Component;
};
