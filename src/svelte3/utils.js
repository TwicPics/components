const rCamelCase = /([A-Z])/g;

export const styleToString = object => (
    object ?
        Object.entries( object )
            .filter( ( [ , v ] ) => ( v !== undefined ) )
            .map( ( [ k, v ] ) => `${ k.replace( rCamelCase, ( _, l ) => `-${ l.toLowerCase() }` ) }:${ v }` )
            .join( `;` ) :
        ``
);
