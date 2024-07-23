import React from "react";
import { computeHostAttributes } from "../_/compute";
import { parseClassName, parseDraggable } from "../_/parse";
import TwicMedia from "./TwicMedia";
import type { BaseAttributes } from "./types";
import { string } from "./props";
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
        <div
            className={ `twic-i ${ parsedClassName }` }
            { ...computeHostAttributes( parseDraggable( props.draggable ) ) }
        >
            <TwicMedia { ...mediaAttributes } className="" />
        </div>
    );
};

TwicBackground.propTypes = {
    "mediaTag": string,
};

export default TwicBackground;
