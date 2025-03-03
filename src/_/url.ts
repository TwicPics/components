import { config } from "./config";
import type { Context, CreateUrlData } from "./types";

const rPath = /^(?:(auth|placeholder|rel)|(image|media|video)|[^:]*):(\/*)((v[0-9]+(?=[/?]))?[^?]*(\?.*)?)$/;
const FULL_PATH = 4;
const MEDIA = 2;
const QUERY = 6;
const RESERVED = 5;
const SPECIAL = 1;
const VERSION = `v1`;

export const urlInfos = ( src: string ) => {
    const parsed = src && rPath.exec( src );
    const { domain = `` } = config;
    return {
        "isAbsolute": src.slice( 0, domain.length + 1 ) === `${ domain }/`,
        "isSpecial": parsed && ( parsed[ SPECIAL ] !== undefined ),
    };
};

const computeTransform = (
    { height, mode = `cover`, width }: Context,
    transform: string
): string => {
    if ( transform && ( width || height ) ) {
        const actualHeight = height || `-`;
        const actualWidth = width || `-`;
        return transform.replace(
            /(\/*\*)/g,
            `/${ `${ mode }=${ actualWidth }x${ actualHeight }` }`
        ).replace(
            /WxH/g,
            `${ actualWidth }x${ actualHeight }`
        );
    }
    return transform;
};

export const createUrl = (
    { context, inspect, output, quality, src, transform }: CreateUrlData
): string => {
    const { domain } = config;
    const { isAbsolute } = urlInfos( src );
    const path = isAbsolute ? `media:${ src.slice( `${ domain }/`.length ) }` : src;
    const parsed = rPath.exec( path );
    const isMedia = parsed && parsed[ MEDIA ];
    const actualOutput = output ? `/output=${ output }` : ``;
    const actualPath = isMedia ? parsed[ FULL_PATH ] : path;
    const actualQuality = quality ? `/quality=${ quality }` : ``;
    const actualInspect = inspect ? `/inspect` : ``;
    const actualTransform = computeTransform( context, transform );
    return `${
        domain
    }/${
        ( parsed && ( parsed[ SPECIAL ] || parsed[ RESERVED ] ) ) ?
        // old syntax
        `${
            VERSION
        }${
            actualTransform
        }${
            actualOutput
        }${
            actualQuality
        }${
            actualInspect
        }/${
            isMedia ? `${ parsed[ MEDIA ] }:${ actualPath }` : actualPath
        }` :
        // catch-all syntax
        `${
            actualPath
        }${
            parsed && parsed[ QUERY ] ? `&` : `?`
        }twic=${
            VERSION
        }${
            actualTransform
        }${
            actualOutput
        }${
            actualInspect
        }${
            actualQuality
        }`
    }`;
};

export const finalTransform = ( mode: string, refit: string ): string => (
    ( ( ( mode || `cover` ) === `cover` ) && ( refit !== undefined ) ) ? `` : `/*`
);
