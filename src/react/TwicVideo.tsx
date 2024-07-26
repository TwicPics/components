import React from "react";
import { parseClassName, parseDraggable, parseDuration, parseFrom, parseId, parseTabIndex, parseTo } from "../_/parse";
import { computeHostAttributes } from "../_/compute";
import { preComputeVideoOptions } from "../_/preCompute";
import { number, propType } from "./props";
import TwicMedia from "./TwicMedia";
import type { BaseAttributes } from "./types";
import type { ScriptAttributes } from "../_/types";
import { sanitize } from "../_/utils";
import { rValidId } from "../_/validate";

interface VideoAttributes extends BaseAttributes, ScriptAttributes {
    duration?: number | string,
    from?: number | string,
    posterFrom?: number | string,
    to?: number | string,
}

const TwicVideo: React.FC< VideoAttributes > = props => {
    const className = parseClassName( props.className ) || ``;
    const draggable = parseDraggable( props.draggable );
    const duration = parseDuration( props.duration );
    const from = parseFrom( props.from );
    const id = parseId( props.id );
    const posterFrom = parseFrom( props.posterFrom );
    const tabindex = parseTabIndex( props.tabindex );
    const to = parseTo( props.to );
    const videoOptions = preComputeVideoOptions( duration, from, posterFrom, to );
    return (
        <div
            className={ sanitize( `twic-i ${ className }` ) }
            { ...computeHostAttributes(
                draggable,
                id,
                tabindex
            ) }
        >
            <TwicMedia
                { ...props }
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
    "id": propType( `string`, rValidId ),
    "posterFrom": number,
    "to": number,
};

export default TwicVideo;
