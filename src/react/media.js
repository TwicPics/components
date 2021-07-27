export const defaultProps = {
    "alt": undefined,
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

import PropTypes from "prop-types";

export const propTypes = {
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
