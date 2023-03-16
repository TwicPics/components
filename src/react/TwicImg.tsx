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
    zoom: PropTypes.Requireable<number | string>;
}

class TwicImg extends Component< ImgAttributes > {
    static propTypes: ImgPropTypes;
    private magnifier: React.RefObject< HTMLDivElement >;
    constructor( attributes: ImgAttributes ) {
        super( attributes );
        this.magnifier = React.createRef();
    }
    componentDidMount() {
        if ( this.magnifier.current ) {
            initMagnifier( this.magnifier.current );
        }
    }
    render() {
        const { props } = this;
        const className = parseClassName( props.className ) || ``;
        const zoom = parseZoom( props.zoom );
        return (
            <div className= { `twic-i ${ className } ${ zoom ? `twic-z` : `` }`}>
                <TwicMedia mediaTag="img" {...this.props}/>
                { zoom &&
                    <div ref={ this.magnifier } className="twic-m" style = { computeMagnifierStyle( zoom ) }>
                        <TwicMedia mediaTag="div" {...this.props} ></TwicMedia>
                    </div>
                }
            </div>
        );
    }
}
TwicImg.propTypes = {
    "zoom": PropTypes.oneOfType( [
        PropTypes.number,
        PropTypes.string,
    ] ),
};
export default TwicImg;
