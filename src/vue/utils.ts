import type { OptionalNumber, OptionalString } from "../_/types";
import type { ComputedOptions, PropType, PropOptions } from "vue/types/options";

export type FunctionForThis< T > = ( self: Record< string, unknown > ) => T;
export type ComputedFunction< T > = () => ComputedOptions< T >;

export const callWithThis = < T >( fn: FunctionForThis< T > ): ComputedFunction< T > => function() {
    return fn( this );
};

type BaseType = BooleanConstructor | NumberConstructor | StringConstructor;
export type Type = BaseType | Array< BaseType >;

export const defineProp =
    < T >( type?: PropType< T >, regExp?: RegExp, defaultValue?: T ): PropOptions< T > => ( {
        "default": defaultValue,
        type,
        "validator": regExp && ( ( v: T ) => regExp.test( `${ v }` ) ),
    } );

export const numberProp = defineProp< OptionalNumber >( [ Number, String ], /^\d+$/ );

export const defineStringProp =
    ( regExp?: RegExp, defaultValue?: string ): PropOptions< OptionalString > =>
        defineProp( String, regExp, defaultValue );

export const stringProp = defineStringProp();
export const requiredStringProp: PropOptions< OptionalString > = {
    ...stringProp,
    "required": true,
};
