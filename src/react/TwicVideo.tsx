import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parseClassName } from '../_/parse';
import TwicMedia, { type BaseAttributes } from "./TwicMedia";

interface VideoAttributes extends BaseAttributes {
    className?: string,
}

interface VideoPropTypes {
    className: PropTypes.Requireable<string>;
}

class TwicVideo extends Component< VideoAttributes > {
    static propTypes: VideoPropTypes;
    render() {
        const { props } = this;
        const className = parseClassName( props.className ) || ``;
        return (
            <div className= { `twic-i ${ className }` }>
                <TwicMedia {...this.props} className="" mediaTag="video"/>
            </div>
        );
    }
}
TwicVideo.propTypes = {
    "className": PropTypes.string,
};
export default TwicVideo;
