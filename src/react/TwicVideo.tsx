import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parseClassName, parseDuration, parseFrom, parseTo } from '../_/parse';
import TwicMedia, { type BaseAttributes } from "./TwicMedia";
import { preComputeVideoOptions } from '../_/preCompute';

const number = PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] );
interface VideoAttributes extends BaseAttributes {
    className?: string,
    duration?: number | string,
    from?: number | string,
    posterFrom?: number | string,
    to?: number | string,
}

interface VideoPropTypes {
    className: PropTypes.Requireable<string>;
    duration: PropTypes.Requireable<number | string>;
    from: PropTypes.Requireable<number | string>;
    posterFrom: PropTypes.Requireable<number | string>;
    to: PropTypes.Requireable<number | string>;
}

class TwicVideo extends Component< VideoAttributes > {
    static propTypes: VideoPropTypes;
    render() {
        const { props } = this;
        const className = parseClassName( props.className ) || ``;
        const duration = parseDuration( props.duration );
        const from = parseFrom( props.from );
        const posterFrom = parseFrom( props.posterFrom );
        const to = parseTo( props.to );
        const videoOptions = preComputeVideoOptions( duration, from, posterFrom, to );
        return (
            <div className= { `twic-i ${ className }` }>
                <TwicMedia
                    {...this.props}
                    className=""
                    mediaTag="video"
                    videoOptions={ videoOptions }
                />
            </div>
        );
    }
}
TwicVideo.propTypes = {
    "className": PropTypes.string,
    "duration": number,
    "from": number,
    "posterFrom": number,
    "to": number,
};
export default TwicVideo;
