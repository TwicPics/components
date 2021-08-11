import type { Attributes, Mode, Placeholder } from "../_/types";

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
} from "../_/compute";

// eslint-disable-next-line no-use-before-define
import React from "react";
import PropTypes from "prop-types";

const defaultProps: Attributes = {
    "alt": undefined,
    "bot": undefined,
    "focus": undefined,
    "height": undefined,
    "mode": `cover`,
    "placeholder": `preview`,
    "position": `center`,
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
    Component.defaultProps = defaultProps;
    Component.propTypes = propTypes;
    return Component;
};
