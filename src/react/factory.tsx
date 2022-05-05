import "../_/style.css";

import { Attributes as BaseAttributes, Mode, Placeholder, validModes, validPlaceholders } from "../_/types";
import { computeAlt, computeData, computeStyle, computeWrapperClass, computeWrapperStyle } from "../_/compute";
import { createPlaceholderHandler, PlaceholderHandler } from "../_/placeholder";
import {
    parseAlt,
    parseBot,
    parseClassName,
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

// eslint-disable-next-line no-use-before-define
import React from "react";
import PropTypes from "prop-types";

export interface Attributes extends BaseAttributes {
    className?: string,
}

const defaultProps: Attributes = {
    "alt": undefined,
    "bot": undefined,
    "className": undefined,
    "focus": undefined,
    "mode": undefined,
    "placeholder": undefined,
    "position": undefined,
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
    "bot": string,
    "className": string,
    "focus": string,
    "mode": oneOf< Mode >( validModes ),
    "placeholder": oneOf< Placeholder >( validPlaceholders ),
    "position": string,
    "ratio": string,
    "src": string.isRequired,
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
            bot: PropTypes.Requireable<string>;
            className: PropTypes.Requireable<string>;
            focus: PropTypes.Requireable<string>;
            mode: PropTypes.Requireable<Mode>;
            placeholder: PropTypes.Requireable<Placeholder>;
            position: PropTypes.Requireable<string>;
            ratio: PropTypes.Requireable<number | string>;
            src: PropTypes.Validator<string>;
            step: PropTypes.Requireable<number | string>;
            transition: PropTypes.Requireable<boolean | string>;
            transitionDelay: PropTypes.Requireable<string>;
            transitionDuration: PropTypes.Requireable<string>;
            transitionTimingFunction: PropTypes.Requireable<string>;
        };
        private _p: PlaceholderHandler;
        private _w: React.RefObject< HTMLDivElement >;
        constructor( attributes: Attributes ) {
            super( attributes );
            this._p = createPlaceholderHandler();
            this._w = React.createRef();
        }
        componentDidMount() {
            this._p.setWrapper( this._w.current );
        }
        componentWillUnmount() {
            this._p.delete();
        }
        render() {
            const { props } = this;
            const alt = withAlt && parseAlt( props.alt );
            const bot = parseBot( props.bot );
            const className = parseClassName( props.className ) || "";
            const focus = parseFocus( props.focus );
            const mode = parseMode( props.mode );
            const placeholder = parsePlaceholder( props.placeholder );
            const position = parsePosition( props.position );
            const ratio = parseRatio( props.ratio );
            const src = parseSrc( props.src );
            const step = parseStep( props.step );
            const transition = parseTransition( props.transition );
            const transitionDelay = parseTransitionDelay( props.transitionDelay );
            const transitionDuration = parseTransitionDuration( props.transitionDuration );
            const transitionTimingFunction = parseTransitionTimingFunction( props.transitionTimingFunction );
            return (
                <div className= {`twic-i ${ className } `}>
                    <div
                        ref={ this._w }
                        className = { computeWrapperClass( transition ) }
                        style = {
                            computeWrapperStyle(
                                focus,
                                mode,
                                placeholder,
                                position,
                                ratio,
                                src,
                                transition,
                                this._p.setData
                            )
                        }
                    >
                        <Tag
                            alt = { withAlt ? computeAlt( alt, src ) : undefined }
                            style = {
                                computeStyle(
                                    mode,
                                    position,
                                    transitionDelay,
                                    transitionDuration,
                                    transitionTimingFunction
                                ) }
                            { ...computeData( bot, focus, src, step ) }
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
