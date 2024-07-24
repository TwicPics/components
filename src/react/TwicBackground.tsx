import React from "react";
import { computeHostAttributes } from "../_/compute";
import { parseClassName, parseDraggable, parseId } from "../_/parse";
import TwicMedia from "./TwicMedia";
import type { BaseAttributes } from "./types";
import { propType, string } from "./props";
import { rValidId } from "../_/validate";
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
            { ...computeHostAttributes(
                parseDraggable( props.draggable ),
                parseId( props.id )
            ) }
        >
            <TwicMedia { ...mediaAttributes } className="" />
        </div>
    );
};

TwicBackground.propTypes = {
    "id": propType( `string`, rValidId ),
    "mediaTag": string,
};

export default TwicBackground;
