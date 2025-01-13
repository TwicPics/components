import React, { useEffect } from "react";
import { register, validate } from "../_/install";
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
import type { BreakPoint, Environment } from "../_/types";
import { boolean, number, string } from "./props";
import { config, setConfig } from "../_/config";

interface InstallAttributes {
    anticipation?: number | string,
    breakpoints?: { [ key in BreakPoint ]?: number },
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
    validate( {
        "domain": props.domain,
        "env": props.env,
        "path": props.path,
    } );
    const options = {
        "anticipation": parseAnticipation( props.anticipation ),
        "breakpoints": props.breakpoints,
        "class": parseClass( props.class ),
        "debug": parseDebug( props.debug ),
        "domain": parseDomain( props.domain ),
        "env": parseEnv( props.env ),
        "handleShadowDom": parseHandleShadowDom( props.handleShadowDom ),
        "maxDPR": parseMaxDrp( props.maxDPR ),
        "path": parsePath( props.path ),
        "step": parseStep( props.step ),
    };
    setConfig( options, `twicpics-script` );
    useEffect(
        () => {
            if ( !document.getElementById( config.scriptElementId ) ) {
                register();
            }
        },
        []
    );
    return ( null );
};

TwicInstall.propTypes = {
    "anticipation": number,
    "class": string,
    "debug": boolean,
    "domain": string,
    "env": string,
    "handleShadowDom": boolean,
    "maxDPR": number,
    "path": string,
    "step": number,
};

export default TwicInstall;
