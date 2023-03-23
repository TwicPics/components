import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parseClassName, parseZoom } from '../_/parse';
import TwicMedia, { type BaseAttributes } from "./TwicMedia";
import { computeMagnifierStyle } from '../_/compute';
import initMagnifier from '../_/magnifier';

interface ImgAttributes extends BaseAttributes {
    className?: string,
    zoom?: number | string,
}

interface ImgPropTypes {
    className: PropTypes.Requireable<string>;
    zoom: PropTypes.Requireable<number | string>;
}

class TwicImg extends Component< ImgAttributes > {
    static propTypes: ImgPropTypes;
    private hostElement: React.RefObject< HTMLDivElement >;
    constructor( attributes: ImgAttributes ) {
        super( attributes );
        this.hostElement = React.createRef();
    }
    componentDidMount() {
        if ( parseZoom( this.props.zoom ) ) {
            initMagnifier( this.hostElement.current );
        }
    }
    render() {
        const { props } = this;
        const className = parseClassName( props.className ) || ``;
        const zoom = parseZoom( props.zoom );
        return (
            <div
                ref = { this.hostElement }
                className= { `twic-i ${ className } ${ zoom ? `twic-z` : `` }`}
                style = { computeMagnifierStyle( zoom ) }
            >
                { zoom &&
                    <TwicMedia {...this.props} className="twic-m" mediaTag="div" mode="cover"></TwicMedia>
                }
                <TwicMedia {...this.props} className="" mediaTag="img"/>
            </div>
        );
    }
}
TwicImg.propTypes = {
    "className": PropTypes.string,
    "zoom": PropTypes.oneOfType( [
        PropTypes.number,
        PropTypes.string,
    ] ),
};
export default TwicImg;
