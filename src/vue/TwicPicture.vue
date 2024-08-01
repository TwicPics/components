<script>
import {
    computeHostAttributes,
    computeMediaAttributes,
    computePicture,
} from "../_/compute";
import { rValidCrossOrigin, rValidDecoding, rValidId } from "../_/validate";
import {
    parseAlt,
    parseAnchors,
    parseCrossOrigin,
    parseDecoding,
    parseDraggable,
    parseEager,
    parseFetchPriority,
    parseFocuses,
    parseId,
    parseModes,
    parsePositions,
    parsePreTransforms,
    parseRatios,
    parseRefit,
    parseSrc,
    parseTitle,
    parseSizes,
    parseTabIndex,
} from "../_/parse";
import { booleanProp, defineStringProp, intProp, stringProp } from "./props";
import { callFactory } from "./utils";

const props = {};
const computed = {};
for ( const [ propName, type, parseMethod ] of [
    [ `alt`, stringProp, parseAlt ],
    [ `anchor`, stringProp, parseAnchors ],
    [ `crossOrigin`, defineStringProp( rValidCrossOrigin ), parseCrossOrigin ],
    [ `decoding`, defineStringProp( rValidDecoding ), parseDecoding ],
    [ `draggable`, booleanProp( null, undefined ), parseDraggable ],
    [ `fetchpriority`, stringProp, parseFetchPriority ],
    [ `focus`, stringProp, parseFocuses ],
    [ `id`, defineStringProp( rValidId ), parseId ],
    [ `mode`, stringProp, parseModes ],
    [ `eager`, booleanProp( null, false ), parseEager ],
    [ `position`, stringProp, parsePositions ],
    [ `preTransform`, stringProp, parsePreTransforms ],
    [ `ratio`, stringProp, parseRatios ],
    [ `refit`, booleanProp( null, false ), parseRefit ],
    [ `src`, stringProp, parseSrc ],
    [ `sizes`, stringProp, parseSizes ],
    [ `tabIndex`, intProp, parseTabIndex ],
    [ `title`, stringProp, parseTitle ],

] ) {
    computed[ `p_${ propName }` ] = callFactory( parseMethod, [ `*${ propName }*` ] );
    props[ propName ] = type;
}
computed[ `p_mediaTag` ] = () => `img`;

for ( const [ propName, func, args ] of [
    [ `_hostAttributes`, computeHostAttributes, [ [ `draggable`, `id`, `tabIndex` ] ] ],
    [ `_mediaAttributes`, computeMediaAttributes, [ [ `alt`, `crossOrigin`, `decoding`, `mediaTag` ] ] ],
    [
        `_pictureData`,
        computePicture,
        [
            `anchor`,
            `eager`,
            `fetchpriority`,
            `focus`,
            `mode`,
            `position`,
            `preTransform`,
            `ratio`,
            `refit`,
            `sizes`,
            `src`,
        ],
    ],
] ) {
    computed[ propName ] = callFactory( func, args );
}

export default {
    props,
    computed,
};
</script>
<template>
    <div
        class="twic-i"
        v-bind="{ ..._hostAttributes }"
    >
        <picture
            class="twic-p"
            :title="p_title"
        >
            <template v-if="_pictureData && _pictureData.sources">
                <source
                    v-for="( data, i ) in _pictureData.sources"
                    :key="i"
                    v-bind="{ ...data }"
                >
            </template>
            <template v-if="_pictureData && _pictureData.img">
                <img
                    v-bind="{
                        ..._mediaAttributes,
                        ..._pictureData.img
                    }"
                >
            </template>
        </picture>
    </div>
</template>

