const rCamelCase = /([A-Z])/g;

export const styleToString = ( object: Record< string, string > ): string => (
    object ?
        Object.entries( object )
            .map( ( [ k, v ] ) => `${ k.replace( rCamelCase, ( _, l ) => `-${ l.toLowerCase() }` ) }:${ v }` )
            .join( `;` ) :
        ``
);
