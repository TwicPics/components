/**
 * information about supported javascript formats
 */
const formatsInfo = new Map( [
    [
        `cjs`, {
            "exports": `require`,
            "extension": `js`,
            "fileName": `index`,
        },
    ],
    [
        `es`, {
            "exports": `import`,
            "extension": `mjs`,
            "fileName": `module`,
        },
    ],
    [
        `types`, {
            "exports": `types`,
            "extension": `d.ts`,
            "fileName": `index`,
            "type": true,
        },
    ],
] );

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

/**
 * supported javascript formats list
 */
export const formats = [ ...formatsInfo.keys() ].filter( f => !getFormatInfo( f ).type );
