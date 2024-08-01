import "../_/style.css";
import React from "react";
import {
    computeHostAttributes,
    computeHostStyle,
    computeMediaAttributes,
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
    parsePreTransforms,
    parseRatios,
    parseRefit,
    parseSrc,
    parseTitle,
    parseSizes,
    parseDraggable,
    parseId,
    parseTabIndex,
    parseStyle,
    parseCrossOrigin,
} from "../_/parse";
import type { Anchor, CrossOrigin } from "../_/types";
import { sanitize } from "../_/utils";
import { rValidId, validAnchors, validCrossOrigins } from "../_/validate";
import { boolean, number, oneOf, oneOfType, propType, string } from "./props";
import type { BaseAttributes } from "./types";
import { fetchPriorityName } from "./utils";

export interface PictureAttributes extends BaseAttributes {
    crossorigin?: string,
    fetchpriority?: string,
    mode?: string,
    refit?: boolean | string,
    sizes?: string
}

const TwicPicture: React.FC< PictureAttributes > = props => {
    const alt = parseAlt( props.alt );
    const anchors = parseAnchors( props.anchor );
    const className = parseClassName( props.className ) || ``;
    const crossorigin = parseCrossOrigin( props.crossorigin );
    const draggable = parseDraggable( props.draggable );
    const eager = parseEager( props.eager );
    const fetchPriority = parseFetchPriority( props.fetchpriority );
    const focuses = parseFocuses( props.focus );
    const id = parseId( props.id );
    const modes = parseModes( props.mode );
    const positions = parsePositions( props.position );
    const preTransforms = parsePreTransforms( props.preTransform );
    const ratios = parseRatios( props.ratio );
    const refit = parseRefit( props.refit );
    const src = parseSrc( props.src );
    const sizes = parseSizes( props.sizes );
    const style = parseStyle( props.style );
    const tabindex = parseTabIndex( props.tabindex );
    const title = parseTitle( props.title );

    const pictureData = computePicture(
        anchors,
        eager,
        fetchPriority,
        focuses,
        modes,
        positions,
        preTransforms,
        ratios,
        refit,
        sizes,
        src
    );

    const { "fetchPriority": _fetchPriority, ...rest } = pictureData?.img || {};

    const mediaAttributes = {
        ...computeMediaAttributes( {
            alt,
            crossorigin,
            "mediaTag": `img`,
        } ),
        [ fetchPriorityName ]: _fetchPriority,
    };

    return (
        <div
            className={ sanitize( `twic-i ${ className }` ) }
            { ...computeHostAttributes( {
                draggable,
                id,
                tabindex,
            } ) }
            style={ computeHostStyle( {
                style,
            } ) }
        >
            <picture className="twic-p" title={ title }>
                { pictureData?.sources && pictureData.sources.map(
                    ( data, key ) => (
                        <source key={ key } { ...data } />
                    )
                ) }
                <img
                    suppressHydrationWarning
                    { ...mediaAttributes }
                    { ...rest }
                />
            </picture>
        </div>
    );
};

TwicPicture.propTypes = {
    "alt": string,
    "anchor": oneOf< Anchor >( validAnchors ),
    "className": string,
    "crossorigin": oneOf< CrossOrigin >( validCrossOrigins ),
    "eager": oneOfType( [ boolean, string ] ),
    "fetchpriority": string,
    "focus": string,
    "id": propType( `string`, rValidId ),
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
