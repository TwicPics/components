import "../_/style.css";

import {
    computeAlt,
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

import React from "react";
import PropTypes from "prop-types";

const defaultProps = {
    "bot": undefined,
    "focus": undefined,
    "height": undefined,
    "mode": `cover`,
    "placeholder": `preview`,
    "position": `center`,
    "ratio": undefined,
    "step": undefined,
    "transition": true,
    "transitionDelay": undefined,
    "transitionDuration": undefined,
    "transitionTimingFunction": undefined,
    "width": undefined,
};

const defaultPropsWithAlt = {
    "alt": undefined,
    ...defaultProps,
};

const { oneOf, string } = PropTypes;

const number = PropTypes.oneOfType( [ PropTypes.number, string ] );

const propTypes = {
    "bot": string,
    "focus": string,
    "height": number,
    "mode": oneOf( [ `contain`, `cover` ] ),
    "placeholder": oneOf( [ `preview`, `meancolor`, `maincolor`, `none` ] ),
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

const propTypesWithAlt = {
    "alt": string,
    ...propTypes,
};

export default ( Tag, withAlt ) => {
    const Component = attributes => (
        <div className = { computeWrapperClass( attributes ) } style = { computeWrapperStyle( attributes ) }>
            <Tag
                alt = { withAlt ? computeAlt( attributes ) : undefined }
                style = { computeStyle( attributes ) }
                width = { computeWidth( attributes ) }
                height = { computeHeight( attributes ) }
                {
                    ...computeDataSrc( attributes )
                }
                {
                    ...computeDataFocus( attributes )
                }
                {
                    ...computeDataBot( attributes )
                }
                {
                    ...computeDataStep( attributes )
                }
            />
        </div>
    );
    Component.defaultProps = withAlt ? defaultPropsWithAlt : defaultProps;
    Component.propTypes = withAlt ? propTypesWithAlt : propTypes;
    return Component;
};
