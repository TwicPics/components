import type { CreateUrlData } from "./types";

const rPath = /^(?:(auth|placeholder|rel)|(image|media|video)|[^:]*):(\/*)((v[0-9]+(?=[/?]))?[^?]*(\?.*)?)$/;
const FULL_PATH = 4;
const MEDIA = 2;
const QUERY = 6;
const RESERVED = 5;
const SPECIAL = 1;
const VERSION = `v1`;

export const urlInfos = ( src: string, domain = `` ) => {
    const parsed = src && rPath.exec( src );
    return {
        "isAbsolute": src.slice( 0, domain.length + 1 ) === `${ domain }/`,
        "isSpecial": parsed && ( parsed[ SPECIAL ] !== undefined ),
    };
};

export const createUrl = (
    { domain, output, quality, src, transform }: CreateUrlData
): string => {
    const { isAbsolute } = urlInfos( src, domain );
    const path = isAbsolute ? `media:${ src.slice( `${ domain }/`.length ) }` : src;
    const parsed = rPath.exec( path );
    const isMedia = parsed && parsed[ MEDIA ];
    const actualOutput = output ? `/output=${ output }` : ``;
    const actualPath = isMedia ? parsed[ FULL_PATH ] : path;
    const actualQuality = quality ? `/quality=${ quality }` : ``;
    const actualTransform = transform ? `/${ transform }` : ``;
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
        }/${
            isMedia ? `${ parsed[ MEDIA ] }:${ actualPath }` : actualPath
        }${
            actualQuality
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
            actualQuality
        }`
    }`;
};
