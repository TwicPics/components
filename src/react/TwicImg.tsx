import React, { Component } from 'react';
import { parseClassName } from '../_/parse';
import TwicMedia, { type BaseAttributes } from "./TwicMedia";

interface ImgAttributes extends BaseAttributes {
    className?: string,
}

class TwicImg extends Component< ImgAttributes > {
    render() {
        const { props } = this;
        const className = parseClassName( props.className ) || ``;
        return (
            <div className= { `twic-i ${ className }` }>
                <TwicMedia mediaTag="img" {...this.props}/>
            </div>
        );
    }
}
export default TwicImg;
