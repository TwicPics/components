/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
const rInitialProps = /^(\*+)(.*[^*])(\*+)$/;
const actualPropName = ( prop: string ) =>
    ( rInitialProps.test( prop ) ? prop.replace( rInitialProps, `$2` ) : `p_${ prop }` );
export const callFactory = ( func: ( ...p: any[] ) => any, _args: any[] ) => {
    const args = _args.map( arg => (
        {
            "f": ( typeof arg === `function` ) && arg,
            "o": Array.isArray( arg ) && arg.map( prop => [ prop, actualPropName( prop ) ] ),
            "s": ( typeof arg === `string` ) && actualPropName( arg ),
        }
    ) );
    return ( context: unknown ) => func(
        ...args.map( ( { f, o, s } ) => {
            if ( f ) {
                return f( context );
            }
            if ( o ) {
                return Object.fromEntries(
                    o.map( ( [ param, propName ] ) =>
                        [ param, ( context as Record<string, any> )[ propName ] ] )
                );
            }
            if ( s ) {
                return ( context as Record<string, any> )[ s ];
            }
            return undefined;
        } )
    );
};

