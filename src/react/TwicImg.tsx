import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { number } from "./props";
import TwicMedia from "./TwicMedia";
import type { BaseAttributes } from "./types";
import { computeMagnifierStyle } from "../_/compute";
import initMagnifier from "../_/magnifier";
import { parseClassName, parseZoom } from "../_/parse";

interface ImgAttributes extends BaseAttributes {
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
    const zoom = parseZoom( props.zoom );
    return (
        <div
            ref={ hostElement }
            className={ `twic-i ${ className } ${ zoom ? `twic-z` : `` }` }
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
    "refit": PropTypes.oneOfType( [ PropTypes.bool, PropTypes.string ] ),
    "zoom": number,
};
export default TwicImg;
