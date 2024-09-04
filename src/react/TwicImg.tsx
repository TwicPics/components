import React, { useEffect, useRef } from "react";
import { computeMagnifierStyle } from "../_/compute";
import initMagnifier from "../_/magnifier";
import { parseClassName, parseZoom } from "../_/parse";
import { boolean, number, oneOfType, string } from "./props";
import TwicMedia from "./TwicMedia";
import type { ImgAttributes } from "./types";
import { splitProperties } from "./utils";

const TwicImg: React.FC< ImgAttributes > = props => {
    const hostElement = useRef< HTMLDivElement >( null );
    const { hostProps, mediaProps } = splitProperties( props );
    useEffect(
        () => {
            if ( parseZoom( props.zoom ) ) {
                initMagnifier( hostElement.current );
            }
        },
        []
    );
    const className = parseClassName( props.className ) || ``;
    const zoom = parseZoom( props.zoom );
    return (
        <div
            ref={ hostElement }
            { ...hostProps }
            className={ `twic-i ${ className } ${ zoom ? `twic-z` : `` }` }
            style={ {
                ...hostProps.style,
                ...computeMagnifierStyle( zoom ),
            } }
        >
            { zoom && (
                <TwicMedia
                    { ...mediaProps }
                    className="twic-m"
                    mediaTag="div"
                    mode="cover"
                />
            ) }
            <TwicMedia
                { ...mediaProps }
                className=""
                mediaTag="img"
            />
        </div>
    );
};

TwicImg.propTypes = {
    "refit": oneOfType( [ boolean, string ] ),
    "zoom": number,
};
export default TwicImg;
