import type { OptionalNumber, OptionalString } from "../_/types";
import type { ComputedOptions, PropType, PropOptions } from "vue/types/options";

export const callWithThis = < P, R >( fn: ( self: P ) => R ): ( () => ComputedOptions< R > ) => function( this: P ) {
    return fn( this ) as ComputedOptions< R >;
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
