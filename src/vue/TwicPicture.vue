<script>
import {
    computeAlt,
    computePicture,
} from "../_/compute";
import {
    parseAlt,
    parseAnchors,
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
import { booleanProp, stringProp } from "./props";
import { callFactory } from "./utils";

const props = {};
const computed = {};
for ( const [ propName, type, parseMethod ] of [
    [ `alt`, stringProp, parseAlt ],
    [ `anchor`, stringProp, parseAnchors ],
    [ `fetchpriority`, stringProp, parseFetchPriority ],
    [ `focus`, stringProp, parseFocuses ],
    [ `mode`, stringProp, parseModes ],
    [ `eager`, booleanProp( null, false ), parseEager ],
    [ `position`, stringProp, parsePositions ],
    [ `preTransform`, stringProp, parsePreTransform ],
    [ `ratio`, stringProp, parseRatios ],
    [ `refit`, booleanProp( null, false ), parseRefit ],
    [ `src`, stringProp, parseSrc ],
    [ `sizes`, stringProp, parseSizes ],
    [ `title`, stringProp, parseTitle ],

] ) {
    computed[ `p_${ propName }` ] = callFactory( parseMethod, [ `*${ propName }*` ] );
    props[ propName ] = type;
}
computed[ `p_mediaTag` ] = () => `img`;

for ( const [ propName, func, args ] of [
    [ `_alt`, computeAlt, [ `alt`, `mediaTag` ] ],
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
    <div class="twic-i">
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
                    :alt="_alt"
                    v-bind="{ ..._pictureData.img }"
                >
            </template>
        </picture>
    </div>
</template>

