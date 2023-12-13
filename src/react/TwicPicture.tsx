import "../_/style.css";
import React from "react";
import {
    computeAlt, computePictureData,
} from "../_/compute";
import {
    parseAlt,
    parseMode,
    parseEager,
    parsePosition,
    parsePreTransform,
    parseSrc,
    parseTitle,
    parseClassName,
    parseRefit,
    parseAnchors,
    parseRatios,
    parseFocuses,
    parseSizes,
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
    refit?: boolean | string,
    sizes?: string
}

const TwicPicture: React.FC< PictureAttributes > = props => {
    const alt = parseAlt( props.alt );
    const anchor = parseAnchors( props.anchor );
    const className = parseClassName( props.className ) || ``;
    const eager = parseEager( props.eager );
    // eslint-disable-next-line no-shadow
    const focus = parseFocuses( props.focus );
    const mode = parseMode( props.mode );
    const position = parsePosition( props.position );
    const preTransform = parsePreTransform( props.preTransform );
    const ratio = parseRatios( props.ratio );
    const refit = parseRefit( props.refit );
    const src = parseSrc( props.src );
    const sizes = parseSizes( props.sizes );
    const title = parseTitle( props.title );

    const artDirectives = preComputeArtDirectives(
        {
            "anchors": anchor,
            "focuses": focus,
            "ratios": ratio,
            sizes,
        }
    );

    const pictureData = computePictureData(
        artDirectives,
        eager,
        mode,
        preTransform,
        refit,
        src
    );

    return (
        <div className={ `twic-i ${ className }` } >
            <picture title={ title }>
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
