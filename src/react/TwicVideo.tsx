import React, { Component } from 'react';
import TwicMedia, { type BaseAttributes } from "./TwicMedia";
class TwicVideo extends Component< BaseAttributes > {
    render() {
        return ( <TwicMedia mediaTag="video" {...this.props}/> );
    }
}
export default TwicVideo;
