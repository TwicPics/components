import React, { Component } from 'react';
import TwicMedia, { type BaseAttributes } from "./TwicMedia";
class TwicImg extends Component< BaseAttributes > {
    render() {
        return ( <TwicMedia mediaTag="img" {...this.props}/> );
    }
}
export default TwicImg;
