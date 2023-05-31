/* eslint-disable @typescript-eslint/no-explicit-any */
const rInitialProps = /^(\*+)(.*[^*])(\*+)$/;
export const callFactory = ( func: ( ...p:any[] ) => any, _args: any[] ) => {
    const args = _args.map( arg => ( ( typeof arg === `function` ) ? {
        "f": arg,
    } : {
        // eslint-disable-next-line no-nested-ternary
        "s": ( rInitialProps.test( `${ arg }` ) ? `${ `${ arg }`.replace( rInitialProps, `$2` ) }` : `p_${ arg }` ),
    } ) );
    return ( context: unknown ) => func( ...args.map(
        ( { f, s } ) => ( f ? f( context ) : ( context as Record< string, any> )[ s ] )
    ) );
};
