/**
 * information about supported javascript formats
 */
const formatsInfo = new Map( [
    [
        `cjs`, {
            "extension": `js`,
            "fileName": `index`,
            "exports": `require`,
        },
    ],
    [
        `es`, {
            "extension": `mjs`,
            "fileName": `module`,
            "exports": `import`,
        },
    ],
] );

/**
 * supported javascript formats list
 */
export const formats = [ ...formatsInfo.keys() ];

export const getFormatInfo = ( format, attribute ) => {
    const formatInfo = formatsInfo.get( format );
    if ( !formatInfo ) {
        // eslint-disable-next-line no-console
        console.warn( `Javascript format ${ format } requested but no information provided in formatsInfo !!! ` );
    }
    if ( attribute ) {
        return formatInfo ? formatInfo[ attribute ] : null;
    }
    return formatInfo || {};
};
