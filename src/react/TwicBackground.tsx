import React from "react";
import { parseClassName } from "../_/parse";
import TwicMedia from "./TwicMedia";
import type { BackgroundAttributes } from "./types";
import { string } from "./props";
import { splitProperties } from "./utils";

const defaultProps = {
    "mediaTag": `div`,
};

const TwicBackground: React.FC< BackgroundAttributes > = props => {

    const { className, ...others } = {
        ...defaultProps,
        ...props,
    };
    const { hostProps, mediaProps } = splitProperties( others );
    const parsedClassName = parseClassName( className ) || ``;
    return (
        <div
            { ...hostProps }
            className={ `twic-i ${ parsedClassName }` }
        >
            <TwicMedia { ...mediaProps } className="" />
        </div>
    );
};

TwicBackground.propTypes = {
    "mediaTag": string,
};

export default TwicBackground;
