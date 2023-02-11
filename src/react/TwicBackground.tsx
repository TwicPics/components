import React, { Component } from 'react';
import TwicMedia, { type BaseAttributes } from "./TwicMedia";

class TwicBackground extends Component< BaseAttributes > {
    render() {
        return ( <TwicMedia mediaTag="div" {...this.props}/> );
    }
}
export default TwicBackground;
