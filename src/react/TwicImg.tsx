import React, { useEffect, useRef } from "react";
import { boolean, number, oneOfType, propType, string } from "./props";
import TwicMedia from "./TwicMedia";
import type { BaseAttributes } from "./types";
import { computeHostAttributes, computeMagnifierStyle } from "../_/compute";
import initMagnifier from "../_/magnifier";
import { parseClassName, parseDraggable, parseId, parseTabIndex, parseZoom } from "../_/parse";
import type { ScriptAttributes } from "../_/types";
import { sanitize } from "../_/utils";
import { rValidId } from "../_/validate";

interface ImgAttributes extends BaseAttributes, ScriptAttributes {
    refit?: boolean | string,
    zoom?: number | string,
}

const TwicImg: React.FC< ImgAttributes > = props => {
    const hostElement = useRef< HTMLDivElement >( null );
    useEffect(
        () => {
            if ( parseZoom( props.zoom ) ) {
                initMagnifier( hostElement.current );
            }
        },
        []
    );
    const className = parseClassName( props.className ) || ``;
    const draggable = parseDraggable( props.draggable );
    const id = parseId( props.id );
    const tabindex = parseTabIndex( props.tabindex );
    const zoom = parseZoom( props.zoom );
    return (
        <div
            ref={ hostElement }
            className={ sanitize( `twic-i ${ className } ${ zoom ? `twic-z` : `` }` ) }
            { ...computeHostAttributes( {
                draggable,
                id,
                tabindex,
            } ) }
            style={ computeMagnifierStyle( zoom ) }
        >
            { zoom && (
                <TwicMedia
                    { ...props }
                    className="twic-m"
                    mediaTag="div"
                    mode="cover"
                />
            ) }
            <TwicMedia
                { ...props }
                className=""
                mediaTag="img"
            />
        </div>
    );
};

TwicImg.propTypes = {
    "id": propType( `string`, rValidId ),
    "refit": oneOfType( [ boolean, string ] ),
    "zoom": number,
};
export default TwicImg;
