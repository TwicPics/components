declare const FRAMEWORK: string;

const buildErrorMessage = ( message: string ): string => `twicpics-components ${ message }`;

const mappingBoolean: { [ key: string ]: boolean; } = {
    "true": true,
    "false": false,
    "": true,
};
export const convertToBoolean = ( value: boolean | string ): boolean => {
    if ( typeof value === `boolean` ) {
        return value;
    }
    if ( value === undefined ) {
        return false;
    }
    return mappingBoolean[ value.trim() ] ?? undefined;
};

export interface DebounceOptions {
    leading?: boolean;
    ms?: number;
    trailing?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = ( fn: ( ...args:any[] ) => void, options: DebounceOptions ) : ( ( ...args:any[] ) => void ) => {
    let timer: ReturnType< typeof setTimeout >;
    const _options = {
        ...{
            "leading": true,
            "ms": 0,
            "trailing": true,
        },
        ...options,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ( ...args:any[] ) => {
        if ( !timer && _options.leading ) {
            fn( ...args );
        }
        clearTimeout( timer );
        timer = setTimeout(
            () => {
                timer = undefined;
                if ( _options.trailing ) {
                    fn( ...args );
                }
            },
            _options.ms
        );
    };
};

export const isReact = ( FRAMEWORK === `react` );
export const isReactNative = ( FRAMEWORK === `react-native` );
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

export const noop = () :void => undefined;

interface RegExpFinderOptions < T = string > {
  filter?: ( ( value: T ) => T );
  defaultValue?: T;
}

export const regExpFinderFactory = < T = string > (
    regExp: RegExp,
    { filter, defaultValue }: RegExpFinderOptions< T > = {}
) => ( value: T | string ): T => {
        let found;
        if ( value ) {
            `${ value }`.replace( regExp, ( _, v ) => ( found = v ) );
        }
        return ( filter ? filter( found ) : found ) || defaultValue;
    };

export const sanitize = ( value: string | undefined ) => value && value.split( ` ` ).filter( Boolean ).join( ` ` );

export const throwError = ( message: string ): never => {
    throw new Error( buildErrorMessage( message ) );
};

interface TrimRegExpOptions {
    border?: string;
    regExpFlags?: string;
}
export const trimRegExpFactory = (
    items: Array< string > | string,
    { border = `\\s`, regExpFlags }: TrimRegExpOptions = {}
): RegExp =>
    new RegExp(
        `^(?:${ border })*(${ Array.isArray( items ) ? items.join( `|` ) : items })(?:${ border })*$`
        , regExpFlags
    );

