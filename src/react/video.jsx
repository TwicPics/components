import React from "react";

import "../_/style.css";
import {
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

const TwicVideo = attributes => (
    <div className = { computeWrapperClass( attributes ) } style = { computeWrapperStyle( attributes ) }>
        <video
            autoPlay
            loop
            muted
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

TwicVideo.defaultProps = defaultProps;
TwicVideo.propTypes = propTypes;

export default TwicVideo;
