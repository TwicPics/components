<script>
import {
    computeMediaAttributes,
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
    parsePreTransforms,
    parseRatios,
    parseRefit,
    parseSrc,
    parseTitle,
    parseSizes,
    parseRole,
} from "../_/parse";
import { booleanProp, defineStringProp, stringProp } from "./props";
import { callFactory } from "./utils";

const props = {};
const computed = {};
for ( const [ propName, type, parseMethod ] of [
    [ `alt`, stringProp, parseAlt ],
    [ `anchor`, stringProp, parseAnchors ],
    [ `crossorigin`, stringProp, v => v ],
    [ `decoding`, stringProp, v => v ],
    [ `fetchpriority`, stringProp, parseFetchPriority ],
    [ `focus`, stringProp, parseFocuses ],
    [ `mode`, stringProp, parseModes ],
    [ `eager`, booleanProp( null, false ), parseEager ],
    [ `position`, stringProp, parsePositions ],
    [ `preTransform`, stringProp, parsePreTransforms ],
    [ `ratio`, stringProp, parseRatios ],
    [ `referrerpolicy`, stringProp, v => v ],
    [ `refit`, booleanProp( null, false ), parseRefit ],
    [ `role`, defineStringProp( undefined, `img` ), parseRole ],
    [ `src`, stringProp, parseSrc ],
    [ `sizes`, stringProp, parseSizes ],
    [ `title`, stringProp, parseTitle ],

] ) {
    computed[ `p_${ propName }` ] = callFactory( parseMethod, [ `*${ propName }*` ] );
    props[ propName ] = type;
}
computed[ `p_mediaTag` ] = () => `img`;

for ( const [ propName, func, args ] of [
    [
        `_mediaAttributes`,
        computeMediaAttributes,
        [ [ `alt`, `crossorigin`, `decoding`, `mediaTag`, `referrerpolicy` ] ],
    ],
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
        :role="p_role"
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

