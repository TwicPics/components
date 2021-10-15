/* eslint max-lines: "off", no-shadow: [ "error", { "allow": [ "focus" ] } ] */
import type { Mode, OptionalBoolean, OptionalMode, OptionalNumber, OptionalPlaceholder, OptionalString } from "./types";

import { config } from "./install.js";

const rAlt = /\/?([^/?#.]+)(?:\.[^/?#]*)?(?:[?#].*)?$/;
const rImage = /^(image:)?\/?/;

const _computeRatio =
    ( height: OptionalNumber, ratio: OptionalString, width: OptionalNumber ): Array< number > =>
        // eslint-disable-next-line no-nested-ternary
        ( ratio ? ratio.split( `/` ) : ( ( width && height ) ? [ width, height ] : [ 1, 1 ] ) )
            .map( x => Number( x ) );

export const _computeAlt =
    ( alt: OptionalString, src: string ): string => {
        if ( !alt ) {
            const tmp = rAlt.exec( src );
            // eslint-disable-next-line no-param-reassign
            alt = ( tmp && tmp[ 1 ] ) || `image`;
        }
        return alt;
    };
export const computeAlt =
    ( { alt, src }: { alt?: OptionalString, src: string } ): string =>
        _computeAlt( alt, src );

export const _computeData = (
    bot: OptionalString,
    focus: OptionalString,
    src: string,
    step: OptionalNumber
): Record< string, OptionalString > => ( {
    [ `data-${ config.class }-bot` ]: ( bot && bot.trim() ) || undefined,
    [ `data-${ config.class }-focus` ]: ( focus && focus.trim() ) || undefined,
    [ `data-${ config.class }-src` ]: src.replace( rImage, `image:` ),
    [ `data-${ config.class }-step` ]: ( step && ( step > 0 ) && `${ step }` ) || undefined,
} );

export const computeData = ( component: {
    bot?: OptionalString,
    focus?: OptionalString,
    src: string,
    step?: OptionalNumber
} ): Record< string, OptionalString > => _computeData(
    component.bot,
    component.focus,
    component.src,
    component.step
);

export const _computeStyle = (
    mode: OptionalMode,
    position: OptionalString,
    transition: OptionalBoolean,
    transitionDelay: OptionalString,
    transitionDuration: OptionalString,
    transitionTimingFunction: OptionalString
// eslint-disable-next-line max-params
): Record< string, string > => {
    const style: Record< string, string > = {};
    if ( mode !== undefined ) {
        style.objectFit = mode;
    }
    if ( position !== undefined ) {
        style.objectPosition = position;
    }
    if ( transition === false ) {
        style.transitionDelay = `0`;
        style.transitionDuration = `0`;
    } else {
        if ( transitionDelay !== undefined ) {
            style.transitionDelay = transitionDelay;
        }
        if ( transitionDuration !== undefined ) {
            style.transitionDuration = transitionDuration;
        }
        if ( transitionTimingFunction !== undefined ) {
            style.transitionTimingFunction = transitionTimingFunction;
        }
    }
    return style;
};

export const computeStyle = ( component: {
    mode?: Mode,
    position?: OptionalString,
    transition?: boolean,
    transitionDelay?: OptionalString,
    transitionDuration?: OptionalString,
    transitionTimingFunction?: OptionalString
} ): Record< string, string > => _computeStyle(
    component.mode,
    component.position,
    component.transition,
    component.transitionDelay,
    component.transitionDuration,
    component.transitionTimingFunction
);

export const _computeWrapperClass = (
    className?: OptionalString
): string => `twic-w${ className ? ` ${ className }` : `` }`;

export const _computeWrapperData = (
    focus: OptionalString,
    placeholder: OptionalPlaceholder,
    src: string
): Record< string, string > => ( ( ( placeholder === undefined ) || ( placeholder === `none` ) ) ? {} : {
    [ `data-${ config.class }-background` ]: `url(${ JSON.stringify( src.replace( rImage, `image:` ) ) })`,
    [ `data-${ config.class }-eager` ]: ``,
    [ `data-${ config.class }-focus` ]: ( focus && focus.trim() ) || undefined,
    [ `data-${ config.class }-step` ]: `1000`,
    [ `data-${ config.class }-transform` ]: `*/output=${ placeholder }`,
} );

export const computeWrapperData = ( component: {
    focus?: OptionalString,
    placeholder?: OptionalPlaceholder,
    src: string
} ): Record< string, string > => _computeWrapperData(
    component.focus,
    component.placeholder,
    component.src
);

export const _computeWrapperStyle = (
    height: OptionalNumber,
    mode: OptionalMode,
    position: OptionalString,
    ratio: OptionalString,
    width: OptionalNumber
// eslint-disable-next-line max-params
): Record< string, string > => {
    const style: Record< string, string > = {};
    if ( mode !== undefined ) {
        style.backgroundSize = mode;
    }
    if ( position !== undefined ) {
        style.backgroundPosition = position;
    }
    if ( ( ratio !== undefined ) || ( ( width !== undefined ) && ( height !== undefined ) ) ) {
        const computedRatio = _computeRatio( height, ratio, width );
        // eslint-disable-next-line no-magic-numbers
        style.paddingTop = `${ ( computedRatio[ 1 ] * 100 ) / computedRatio[ 0 ] }%`;
    }
    return style;
};
export const computeWrapperStyle = ( component: {
    height?: OptionalNumber,
    mode?: Mode,
    position?: OptionalString,
    ratio?: OptionalString,
    width?: OptionalNumber
} ): Record< string, string > => _computeWrapperStyle(
    component.height,
    component.mode,
    component.position,
    component.ratio,
    component.width
);
