import React, { Component } from 'react';
import { parseClassName } from '../_/parse';
import TwicMedia, { type MediaAttributes } from "./TwicMedia";

interface BackgroundAttributes extends MediaAttributes {
    className?: string,
}

class TwicBackground extends Component< BackgroundAttributes > {
    static defaultProps = {
        "mediaTag": `div`,
    };
    render() {
        const { props } = this;
        const className = parseClassName( props.className ) || ``;
        return (
            <div className= { `twic-i ${ className }` }>
                <TwicMedia {...this.props}/>
            </div>
        );
    }
}
export default TwicBackground;
