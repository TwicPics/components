import type { PropType, PropOptions } from "vue/types/options";

export const defineProp =
    < T >( type?: PropType< T >, regExp?: RegExp, _default?:T ): PropOptions< T > => ( {
        type,
        "default": _default,
        "validator": regExp && ( ( v: T ) => regExp.test( String( v ) ) ),
    } );
export const defineStringProp = ( regExp?: RegExp ): PropOptions< string > => defineProp( String, regExp );
export const booleanProp = ( regExp?: RegExp, _default?:boolean|string ): PropOptions< boolean | string > =>
    defineProp< boolean | string >( [ Boolean, String ], regExp, _default );
export const intProp = defineProp< number | string >( [ Number, String ], /^\d+$/ );
export const stringProp = defineStringProp();

