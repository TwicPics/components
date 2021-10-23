import type { PropType, PropOptions } from "vue/types/options";

export const defineProp =
    < T >( type?: PropType< T >, regExp?: RegExp ): PropOptions< T > => ( {
        type,
        "validator": regExp && ( ( v: T ) => regExp.test( String( v ) ) ),
    } );
export const defineStringProp = ( regExp?: RegExp ): PropOptions< string > => defineProp( String, regExp );
export const booleanProp = defineProp< boolean | string >( [ Boolean, String ] );
export const intProp = defineProp< number | string >( [ Number, String ], /^\d+$/ );
export const stringProp = defineStringProp();
export const requiredStringProp: PropOptions< string > = {
    ...stringProp,
    "required": true,
};
