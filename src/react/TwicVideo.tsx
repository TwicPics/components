import React from "react";
import { parseClassName, parseDuration, parseFrom, parseTo } from "../_/parse";
import { preComputeVideoOptions } from "../_/preCompute";
import { number } from "./props";
import TwicMedia from "./TwicMedia";
import type { VideoAttributes } from "./types";
import { splitProperties } from "./utils";

const TwicVideo: React.FC< VideoAttributes > = props => {
    const className = parseClassName( props.className ) || ``;
    const duration = parseDuration( props.duration );
    const from = parseFrom( props.from );
    const posterFrom = parseFrom( props.posterFrom );
    const to = parseTo( props.to );
    const videoOptions = preComputeVideoOptions( duration, from, posterFrom, to );
    const { hostProps, mediaProps } = splitProperties( props );
    return (
        <div
            { ...hostProps }
            className={ `twic-i ${ className }` }
        >
            <TwicMedia
                { ...mediaProps }
                className=""
                mediaTag="video"
                refit={ false }
                videoOptions={ videoOptions }
            />
        </div>
    );
};

TwicVideo.propTypes = {
    "duration": number,
    "from": number,
    "posterFrom": number,
    "to": number,
};

export default TwicVideo;
