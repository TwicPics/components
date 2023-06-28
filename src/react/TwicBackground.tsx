import React from "react";
import PropTypes from "prop-types";
import { parseClassName } from "../_/parse";
import TwicMedia from "./TwicMedia";
import type { BaseAttributes } from "./types";
interface BackgroundAttributes extends BaseAttributes {
    mediaTag?: string,
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
    "mediaTag": PropTypes.string,
};

export default TwicBackground;
