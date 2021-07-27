const PARAMS = {
    "anticipation": `anticipation`,
    "class": `class`,
    "maxdpr": `max-dpr`,
    "path": `path`,
    "step": `step`,
};

const translateKey = key => {
    const lowerCaseKey = key.toLowerCase();
    return PARAMS.hasOwnProperty( lowerCaseKey ) ? PARAMS[ lowerCaseKey ] : undefined;
};

export const config = {
    "domain": undefined,
    "class": `twic`,
};

const rDomain = /^https?:\/\/[^/]+$/;

export default ( inputConfig = {} ) => {
    if ( config.domain ) {
        throw new Error( `cannot install TwicPics script twice` );
    }

    const { domain } = inputConfig;

    if ( !domain || !rDomain.test( domain ) ) {
        throw new Error( `invalid domain "${ domain }": cannot install TwicPics script` );
    }

    config.domain = domain;

    const parts = [ `${ domain }/?v1` ];

    Object.entries( inputConfig ).forEach( ( [ key, value ] ) => {
        // eslint-disable-next-line no-param-reassign
        if ( ( key = translateKey( key ) ) ) {
            if ( key === `class` ) {
                config.class = value;
            }
            parts.push( `${ key }=${ value }` );
        }
    } );

    Object.freeze( config );

    // not done in SSR
    if ( typeof document !== `undefined` ) {
        const link = document.createElement( `link` );
        link.rel = `preconnect`;
        link.href = domain;

        const script = document.createElement( `script` );
        script.async = true;
        script.defer = true;
        script.src = parts.join( `&` );

        const style = document.createElement( `style` );
        style.innerText = `.twic-t-fade>.${ config.class }-done{opacity:1}`;

        document.head.appendChild( link );
        document.head.appendChild( script );
        document.head.appendChild( style );
    }
};
