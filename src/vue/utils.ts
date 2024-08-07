/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
const rInitialProps = /^(\*+)(.*[^*])(\*+)$/;
const actualPropName = ( prop: string ) =>
    ( rInitialProps.test( prop ) ? prop.replace( rInitialProps, `$2` ) : `p_${ prop }` );
export const callFactory = ( func: ( ...p: any[] ) => any, _args: any[] ) => {
    const args = _args.map( arg =>
        /* eslint-disable no-nested-ternary */
        ( typeof arg === `function` ?
            { "f": arg } :
            Array.isArray( arg ) ?
                { "o": arg } :
                { "s": actualPropName( arg ) }
        ) );

    return ( context: unknown ) => func( ...args.map( ( { f, o, s } ) =>
        /* eslint-disable no-nested-ternary */
        ( f ? f( context ) :
            o ? o.reduce( ( r, k ) => {
                // eslint-disable-next-line no-param-reassign
                r[ k ] = ( context as Record< string, any > )[ actualPropName( k ) ];
                return r;
            }, {} ) :
                ( context as Record<string, any> )[ s ]
        ) ) );
};
