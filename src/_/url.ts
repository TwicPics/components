import type { CreateUrlData } from "./types";

const rPath = /^(?:(auth|placeholder|rel)|(image|media|video)|[^:]*):(\/*)((v[0-9]+(?=[/?]))?[^?]*(\?.*)?)$/;
const FULL_PATH = 4;
const MEDIA = 2;
const QUERY = 6;
const RESERVED = 5;
const SLASHES = 3;
const SPECIAL = 1;
const VERSION = `v1`;

export const createUrl = (
    { debug, domain, path, output, quality, src, transform }: CreateUrlData
): string => {

    const _domain = `${ domain }/`;
    const isAbsolute = ( src.slice( 0, _domain.length ) === _domain );
    const _path = isAbsolute ? `media:${ src.slice( _domain.length ) }` : src;
    const parsed = rPath.exec( _path );
    const isMedia = parsed && parsed[ MEDIA ];
    const actualDebug = debug ? `/debug` : ``;
    const actualOutput = output ? `/${ output }` : ``;
    // eslint-disable-next-line no-nested-ternary
    const actualPath = isMedia ? (
        ( path && !isAbsolute ) ?
            `${ path }${ parsed[ SLASHES ] ? parsed[ SLASHES ][ 0 ] : `` }${ parsed[ FULL_PATH ] }` :
            parsed[ FULL_PATH ]
    ) : _path;
    const actualQuality = quality ? `/quality=${ quality }` : ``;
    const actualTransform = transform ? `/${ transform }` : ``;

    return `${
        _domain
    }${
        ( parsed && ( parsed[ SPECIAL ] || parsed[ RESERVED ] ) ) ?
        // old syntax
        `${
            VERSION
        }${
            actualDebug
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
            actualDebug
        }${
            actualTransform
        }${
            actualOutput
        }${
            actualQuality
        }`
    }`;
};
