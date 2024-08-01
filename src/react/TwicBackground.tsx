import React from "react";
import { computeHostAttributes, computeHostStyle } from "../_/compute";
import { parseClassName, parseDraggable, parseId, parseStyle, parseTabIndex } from "../_/parse";
import TwicMedia from "./TwicMedia";
import type { BaseAttributes } from "./types";
import { propType, string } from "./props";
import { sanitize } from "../_/utils";
import { rValidId } from "../_/validate";

interface BackgroundAttributes extends BaseAttributes {
    mediaTag?: string,
}
const defaultProps = {
    "mediaTag": `div`,
};

const TwicBackground: React.FC< BackgroundAttributes > = props => {

    const { className, draggable, id, tabindex, ...mediaAttributes } = {
        ...defaultProps,
        ...props,
    };
    const parsedClassName = parseClassName( className ) || ``;
    const parsedDraggable = parseDraggable( draggable );
    const parsedId = parseId( id );
    const style = parseStyle( props.style );
    const parsedTabIndex = parseTabIndex( tabindex );
    return (
        <div
            className={ sanitize( `twic-i ${ parsedClassName }` ) }
            { ...computeHostAttributes( {
                "draggable": parsedDraggable,
                "id": parsedId,
                "tabindex": parsedTabIndex,
            } ) }
            style={ computeHostStyle( {
                style,
            } ) }
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
