import React from "react";

import "../_/style.css";
import {
    computeMediaAlt,
    computeMediaDataBot,
    computeMediaDataFocus,
    computeMediaDataSrc,
    computeMediaDataStep,
    computeMediaHeight,
    computeMediaSource,
    computeMediaStyle,
    computeMediaWidth,
    computeWrapperClass,
    computeWrapperStyle,
} from "../_/compute.js";

const TwicImg = attributes => (
    <div className = { computeWrapperClass( attributes ) } style = { computeWrapperStyle( attributes ) }>
        <img
            alt = { computeMediaAlt( attributes ) }
            src = { computeMediaSource( attributes ) }
            style = { computeMediaStyle( attributes ) }
            width = { computeMediaWidth( attributes ) }
            height = { computeMediaHeight( attributes ) }
            {
                ...computeMediaDataSrc( attributes )
            }
            {
                ...computeMediaDataFocus( attributes )
            }
            {
                ...computeMediaDataBot( attributes )
            }
            {
                ...computeMediaDataStep( attributes )
            }
        />
    </div>
);

import { defaultProps, propTypes } from "./media.js";

TwicImg.defaultProps = defaultProps;
TwicImg.propTypes = propTypes;

export default TwicImg;
