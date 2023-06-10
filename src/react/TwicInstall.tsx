import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { registerScript } from "../_/install";
import {
    parseAnticipation,
    parseClass,
    parseDebug,
    parseDomain,
    parseEnv,
    parseHandleShadowDom,
    parseMaxDrp,
    parsePath,
    parseStep,
} from "../_/parse";
import type { Environment } from "../_/types";
import { rValidDomain, validEnvironment } from "../_/validate";
import { propTypeRegExpFactory, number } from "./props";
import { setConfig } from "../_/config";

interface InstallAttributes {
    anticipation?: number | string,
    class?: string,
    debug?: boolean,
    domain: string,
    env?: Environment,
    handleShadowDom?: boolean,
    maxDPR?: number | string,
    path?: string,
    step?: number | string,
}

const TwicInstall: React.FC< InstallAttributes > = props => {

    const options = {
        "anticipation": parseAnticipation( props.anticipation ),
        "class": parseClass( props.class ),
        "debug": parseDebug( props.debug ),
        "domain": parseDomain( props.domain ),
        "env": parseEnv( props.env ),
        "handleShadowDom": parseHandleShadowDom( props.handleShadowDom ),
        "maxDPR": parseMaxDrp( props.maxDPR ),
        "path": parsePath( props.path ),
        "step": parseStep( props.step ),
    };
    setConfig( options );
    useEffect(
        () => {
            registerScript( options );
        },
        []
    );
    return (
        <></>
    );
};

TwicInstall.propTypes = {
    "anticipation": number,
    "class": PropTypes.string,
    "debug": PropTypes.bool,
    "domain": propTypeRegExpFactory( rValidDomain ),
    "env": PropTypes.oneOf< Environment >( validEnvironment ),
    "handleShadowDom": PropTypes.bool,
    "maxDPR": number,
    "path": PropTypes.string,
    "step": number,
};

export default TwicInstall;
