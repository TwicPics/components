import "../_/style.css";
import React from "react";
import {
    computeAlt,
    computePicture,
} from "../_/compute";
import {
    parseAlt,
    parseAnchors,
    parseClassName,
    parseEager,
    parseFetchPriority,
    parseFocuses,
    parseModes,
    parsePositions,
    parsePreTransform,
    parseRatios,
    parseRefit,
    parseSrc,
    parseTitle,
    parseSizes,
} from "../_/parse";
import type { Anchor } from "../_/types";
import { validAnchors } from "../_/validate";
import { boolean, number, oneOf, oneOfType, string } from "./props";
import type { BaseAttributes } from "./types";

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

    const pictureData = computePicture(
        anchors,
        eager,
        fetchPriority,
        focuses,
        modes,
        positions,
        preTransform,
        ratios,
        refit,
        sizes,
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
                    { ...pictureData?.img }
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
    "mode": string,
    "position": string,
    "preTransform": string,
    "ratio": number,
    "refit": oneOfType( [ boolean, string ] ),
    "sizes": string,
    "src": string,
    "title": string,
};

export default TwicPicture;
