declare const FRAMEWORK: string;

const buildErrorMessage = ( message: string ): string => `twicpics-components ${ message }`;

export const debounce = ( fn: () => void, ms = 0 ) : ( () => void ) => {
    let timer: ReturnType< typeof setTimeout >;
    return () => {
        if ( !timer ) {
            fn();
        }
        clearTimeout( timer );
        timer = setTimeout(
            () => {
                timer = undefined;
                fn();
            },
            ms
        );
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

export const regExpFinderFactory = < T = string >( regExp: RegExp, filter: ( ( value: T ) => T ) = undefined ) =>
    ( value: T | string ): T => {
        let found;
        if ( value ) {
            `${ value }`.replace( regExp, ( _, v ) => ( found = v ) );
        }
        return filter ? filter( found ) : found;
    };

export const throwError = ( message: string ): never => {
    throw new Error( buildErrorMessage( message ) );
};

export const trimRegExpFactory = ( items: Array< string > | string, border = `\\s` ): RegExp =>
    new RegExp( `^(?:${ border })*(${ Array.isArray( items ) ? items.join( `|` ) : items })(?:${ border })*$` );

