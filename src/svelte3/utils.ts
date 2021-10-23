export const styleToString = ( properties: Record< string, string > ): string =>
    Object.entries( properties )
        .flatMap( ( [ p, v ] ) => ( v ? [ `${ p }:${ v };` ] : [] ) )
        .join( `` );
