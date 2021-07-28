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

const propTypes = {
    "alt": PropTypes.string,
    "bot": PropTypes.string,
    "focus": PropTypes.string,
    "height": PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),
    "mode": PropTypes.oneOf( [ `contain`, `cover` ] ),
    "placeholder": PropTypes.oneOf( [ `preview`, `meancolor`, `maincolor`, `none` ] ),
    "position": PropTypes.string,
    "ratio": PropTypes.string,
    "src": PropTypes.string.isRequired,
    "step": PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),
    "transition": PropTypes.bool,
    "transitionDuration": PropTypes.string,
    "transitionTimingFunction": PropTypes.string,
    "transitionDelay": PropTypes.string,
    "width": PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),
};

const propTypesWithAlt = {
    "alt": PropTypes.string,
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
