declare const FRAMEWORK: string;

const buildErrorMessage = ( message: string ): string => `twicpics-components ${ message }`;

export const wait = ( ms = 0 ): Promise< void > => new Promise< void >(
    resolve => ( ( ms > 0 ) ? setTimeout( resolve, ms ) : resolve() )
);

export const debounce = ( fn: () => void, ms = 0 ): ( () => void ) => {
    let promise: Promise< void >;
    return () => {
        if ( !promise ) {
            promise = wait( ms ).then( () => {
                promise = undefined;
                fn();
            } );
        }
    };
};

export const isWebComponents = ( FRAMEWORK === `webcomponents` );

export const isBrowser = isWebComponents || ( typeof document !== `undefined` );

export const logError = ( message: string ): void => {
    // eslint-disable-next-line no-console
    console.error( buildErrorMessage( message ) );
};

export const logWarning = ( message: string ): void => {
    // eslint-disable-next-line no-console
    console.warn( buildErrorMessage( message ) );
};

export const throwError = ( message: string ): never => {
    throw new Error( buildErrorMessage( message ) );
};

export const trimRegExpFactory = ( items: Array< string > | string ): RegExp =>
    new RegExp( `^\\s*(${ Array.isArray( items ) ? items.join( `|` ) : items })\\s*$` );

