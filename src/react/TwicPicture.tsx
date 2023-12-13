import "../_/style.css";
import React from "react";
import {
    computeAlt, computePictureData,
} from "../_/compute";
import {
    parseAlt,
    parseModes,
    parseEager,
    parsePositions,
    parsePreTransform,
    parseSrc,
    parseTitle,
    parseClassName,
    parseRefit,
    parseAnchors,
    parseRatios,
    parseFocuses,
    parseSizes,
    parseFetchPriority,
} from "../_/parse";
import type {
    Anchor,
    Mode,
} from "../_/types";
import { validAnchors, validModes } from "../_/validate";
import { boolean, number, oneOf, oneOfType, string } from "./props";
import type { BaseAttributes } from "./types";
import { preComputeArtDirectives } from "../_/preCompute";

export interface PictureAttributes extends BaseAttributes {
    fetchpriority?: string,
    refit?: boolean | string,
    sizes?: string
}

const TwicPicture: React.FC< PictureAttributes > = props => {
    const alt = parseAlt( props.alt );
    const anchors = parseAnchors( props.anchor );
    const className = parseClassName( props.className ) || ``;
    const eager = parseEager( props.eager );
    const fetchPriority = parseFetchPriority( props.fetchpriority );
    // eslint-disable-next-line no-shadow
    const focuses = parseFocuses( props.focus );
    const modes = parseModes( props.mode );
    const positions = parsePositions( props.position );
    const preTransform = parsePreTransform( props.preTransform );
    const ratios = parseRatios( props.ratio );
    const refit = parseRefit( props.refit );
    const src = parseSrc( props.src );
    const sizes = parseSizes( props.sizes );
    const title = parseTitle( props.title );

    const artDirectives = preComputeArtDirectives(
        {
            anchors,
            focuses,
            modes,
            positions,
            ratios,
            sizes,
        }
    );

    const pictureData = computePictureData(
        artDirectives,
        eager,
        fetchPriority,
        preTransform,
        refit,
        src
    );

    return (
        <div className={ `twic-i ${ className }` } >
            <picture className="twic-p" title={ title }>
                { pictureData?.sources && pictureData.sources.map(
                    ( data, key ) => (
                        <source key={ key } { ...data } />
                    )
                ) }
                <img
                    alt={ computeAlt( alt, `img` ) }
                    { ...pictureData?.fallback }
                />
            </picture>
        </div>
    );
};

TwicPicture.propTypes = {
    "alt": string,
    "anchor": oneOf< Anchor >( validAnchors ),
    "className": string,
    "eager": oneOfType( [ boolean, string ] ),
    "fetchpriority": string,
    "focus": string,
    "mode": oneOf< Mode >( validModes ),
    "position": string,
    "preTransform": string,
    "ratio": number,
    "refit": oneOfType( [ boolean, string ] ),
    "sizes": string,
    "src": string,
    "title": string,
};

export default TwicPicture;
