import type { PropType, PropOptions } from "vue/types/options";

export const callWithProps =
    (
        fn: ( ( ..._args: Array< unknown > ) => unknown ),
        ...args: Array< ( ( c: unknown ) => unknown ) | string >
    ): (
        ( this: unknown ) => unknown
    ) => {
        const mArgs = args.map( n => {
            const isString = typeof n === `string`;
            return isString ? {
                "s": n,
            } : {
                "f": n,
            };
        } );
        return function( this: unknown ) {
            return fn( ...mArgs.map(
                // eslint-disable-next-line no-invalid-this
                ( { f, s } ) => ( f ? f( this ) : ( this as unknown as Record< string, unknown > )[ s ] )
            ) );
        };
    };

type BaseType = BooleanConstructor | NumberConstructor | StringConstructor;
export type Type = BaseType | Array< BaseType >;

export const defineProp =
    < T >( type?: PropType< T >, regExp?: RegExp, defaultValue?: T ): PropOptions< T > => ( {
        "default": defaultValue,
        type,
        "validator": regExp && ( ( v: T ) => regExp.test( `${ v }` ) ),
    } );

export const numberProp = defineProp< number | string >( [ Number, String ], /^\d+$/ );

export const defineStringProp =
    ( regExp?: RegExp, defaultValue?: string ): PropOptions< string > =>
        defineProp( String, regExp, defaultValue );

export const stringProp = defineStringProp();
export const requiredStringProp: PropOptions< string > = {
    ...stringProp,
    "required": true,
};

export const parseFactory =
    < ObjectType, InputType, OutputType >( parser: ( value: InputType ) => OutputType, property: string ) =>
        function( this: ObjectType ): OutputType {
            // eslint-disable-next-line no-invalid-this
            return parser( ( this as unknown as Record< string, InputType > )[ property ] );
        };
