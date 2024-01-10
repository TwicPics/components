import React, { useEffect } from "react";
import { register } from "../_/install";
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
import { rValidDomain, validEnvironment } from "../_/validate";
import { boolean, number, oneOf, propType, string } from "./props";
import { setConfig } from "../_/config";

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
    setConfig( options );
    useEffect(
        () => {
            register( options );
        },
        []
    );
    return (
        <></>
    );
};

TwicInstall.propTypes = {
    "anticipation": number,
    "class": string,
    "debug": boolean,
    "domain": propType( `string`, rValidDomain ),
    "env": oneOf< Environment >( validEnvironment ),
    "handleShadowDom": boolean,
    "maxDPR": number,
    "path": string,
    "step": number,
};

export default TwicInstall;
