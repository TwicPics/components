/**
 * converts a potential camelCase notation string in a snake-case notation
 */
const camelCaseToSnake = ( camelCase: string ): string =>
    camelCase.replace( /([a-z]|(?=[A-Z]))([A-Z])/g, `$1-$2` ).toLowerCase();
export const styleToString = ( properties: Record< string, string > ): string =>
    Object.entries( properties )
        .flatMap( ( [ p, v ] ) => ( v ? [ `${ camelCaseToSnake( p ) }:${ v };` ] : [] ) )
        .join( `` );
