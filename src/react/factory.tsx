import type { Attributes as BaseAttributes, Mode, OptionalString, Placeholder } from "../_/types";

import "../_/style.css";

import {
    _computeWrapperClass,
    computeAlt,
    computeData,
    computeStyle,
    computeWrapperStyle,
    computeWrapperData,
} from "../_/compute";

// eslint-disable-next-line no-use-before-define
import React from "react";
import PropTypes from "prop-types";

export interface Attributes extends BaseAttributes {
    className?: OptionalString,
}

const defaultProps: Attributes = {
    "alt": undefined,
    "bot": undefined,
    "className": undefined,
    "focus": undefined,
    "height": undefined,
    "mode": undefined,
    "placeholder": `preview`,
    "position": undefined,
    "ratio": undefined,
    "src": ``,
    "step": undefined,
    "transition": true,
    "transitionDelay": undefined,
    "transitionDuration": undefined,
    "transitionTimingFunction": undefined,
    "width": undefined,
};

const { oneOf, string } = PropTypes;

const number = PropTypes.oneOfType( [ PropTypes.number, string ] );

const propTypes = {
    "alt": string,
    "bot": string,
    "className": string,
    "focus": string,
    "height": number,
    "mode": oneOf< Mode >( [ `contain`, `cover` ] as const ),
    "placeholder": oneOf< Placeholder >( [ `preview`, `meancolor`, `maincolor`, `none` ] as const ),
    "position": string,
    "ratio": string,
    "src": string.isRequired,
    "step": number,
    "transition": PropTypes.bool,
    "transitionDuration": string,
    "transitionTimingFunction": string,
    "transitionDelay": string,
    "width": number,
};

export default ( Tag: `img` | `video`, withAlt?: boolean ):
    React.ComponentType< Attributes > => {
    const Component = ( attributes: Attributes ) => (
        <div
            className = { _computeWrapperClass( attributes.className ) }
            style = { computeWrapperStyle( attributes ) }
            { ...computeWrapperData( attributes ) }
        >
            <Tag
                alt = { withAlt ? computeAlt( attributes ) : undefined }
                style = { computeStyle( attributes ) }
                { ...computeData( attributes ) }
            />
        </div>
    );
    Component.defaultProps = defaultProps;
    Component.propTypes = propTypes;
    return Component;
};
