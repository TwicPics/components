import React from "react";
import PropTypes from "prop-types";
import { parseClassName } from "../_/parse";
import TwicMedia, { type MediaAttributes } from "./TwicMedia";

interface BackgroundAttributes extends MediaAttributes {
    className?: string,
}

const defaultProps = {
    "mediaTag": `div`,
};

const TwicBackground: React.FC< BackgroundAttributes > = props => {

    const { className, ...mediaAttributes } = {
        ...defaultProps,
        ...props,
    };
    const parsedClassName = parseClassName( className ) || ``;
    return (
        <div className={ `twic-i ${ parsedClassName }` }>
            <TwicMedia { ...mediaAttributes } className="" />
        </div>
    );
};

TwicBackground.propTypes = {
    "className": PropTypes.string,
    "mediaTag": PropTypes.string,
};

export default TwicBackground;
