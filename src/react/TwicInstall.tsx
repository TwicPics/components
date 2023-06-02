import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { default as installTwicPics } from "../_/install";
import type { Environment, Options } from '../_/types';
import { validEnvironment } from '../_/validate';

const { oneOf, string } = PropTypes;
const number = PropTypes.oneOfType( [ PropTypes.number, string ] );
interface BackgroundPropTypes {
    anticipation: PropTypes.Requireable< number | string >;
    class: PropTypes.Requireable< string >;
    debug: PropTypes.Requireable< boolean >;
    domain: PropTypes.Requireable< string >;
    env: PropTypes.Requireable< Environment>;
    handleShadowDom: PropTypes.Requireable< boolean >;
    maxDPR: PropTypes.Requireable< number | string >;
    path: PropTypes.Requireable< string >;
    step: PropTypes.Requireable< number | string >;
}

class TwicInstall extends Component< Options > {
    static propTypes: BackgroundPropTypes;
    render() {
        const { props } = this;
        installTwicPics( {
            "anticipation": props.anticipation,
            "class": props.class,
            "debug": props.debug,
            "domain": props.domain,
            "env": props.env,
            "handleShadowDom": props.handleShadowDom,
            "maxDPR": props.maxDPR,
            "path": props.path,
            "step": props.step,
        } );
        return ( <></> );
    }
}
TwicInstall.propTypes = {
    "anticipation": number,
    "class": string,
    "debug": PropTypes.bool,
    "domain": string,
    "env": oneOf< Environment >( validEnvironment ),
    "handleShadowDom": PropTypes.bool,
    "maxDPR": number,
    "path": string,
    "step": number,
};
export default TwicInstall;
