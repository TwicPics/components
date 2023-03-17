import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parseClassName } from '../_/parse';
import TwicMedia, { type MediaAttributes } from "./TwicMedia";

interface BackgroundAttributes extends MediaAttributes {
    className?: string,
}

interface BackgroundPropTypes {
    className: PropTypes.Requireable<string>;
    mediaTag: PropTypes.Requireable<string>;
}

class TwicBackground extends Component< BackgroundAttributes > {
    static propTypes: BackgroundPropTypes;
    static defaultProps = {
        "mediaTag": `div`,
    };
    render() {
        const { props } = this;
        const className = parseClassName( props.className ) || ``;
        return (
            <div className= { `twic-i ${ className }` }>
                <TwicMedia {...this.props} className=""/>
            </div>
        );
    }
}
TwicBackground.propTypes = {
    "className": PropTypes.string,
    "mediaTag": PropTypes.string,
};
export default TwicBackground;
