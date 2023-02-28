import React, { Component } from 'react';
import { parseClassName } from '../_/parse';
import TwicMedia, { type BaseAttributes } from "./TwicMedia";

interface VideoAttributes extends BaseAttributes {
    className?: string,
}
class TwicVideo extends Component< VideoAttributes > {
    render() {
        const { props } = this;
        const className = parseClassName( props.className ) || ``;
        return (
            <div className= { `twic-i ${ className }` }>
                <TwicMedia mediaTag="video" {...this.props}/>
            </div>
        );
    }
}
export default TwicVideo;
