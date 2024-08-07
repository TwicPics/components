import React, { useEffect, useRef } from "react";
import { boolean, number, oneOfType, propType, string } from "./props";
import TwicMedia from "./TwicMedia";
import type { BaseAttributes } from "./types";
import { computeHostAttributes, computeHostStyle } from "../_/compute";
import initMagnifier from "../_/magnifier";
import { parseAria, parseClassName, parseDraggable, parseId, parseStyle, parseTabIndex, parseZoom } from "../_/parse";
import type { HtmlElementAttributes, HtmlImageAttributes, ScriptAttributes } from "../_/types";
import { sanitize } from "../_/utils";
import { rValidId } from "../_/validate";

interface ImgAttributes extends BaseAttributes, HtmlElementAttributes, HtmlImageAttributes, ScriptAttributes {
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
    const aria = parseAria( props.aria );
    const className = parseClassName( props.className ) || ``;
    const draggable = parseDraggable( props.draggable );
    const id = parseId( props.id );
    const style = parseStyle( props.style );
    const tabindex = parseTabIndex( props.tabindex );
    const zoom = parseZoom( props.zoom );
    return (
        <div
            ref={ hostElement }
            className={ sanitize( `twic-i ${ className } ${ zoom ? `twic-z` : `` }` ) }
            { ...computeHostAttributes( {
                aria,
                draggable,
                id,
                tabindex,
            } ) }
            style={ computeHostStyle( {
                style,
                zoom,
            } ) }
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
