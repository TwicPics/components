import type { PropType, PropOptions } from "vue/types/options";
import type { VideoOptions } from "../_/types";
export const defineProp =
    < T >( type?: PropType< T >, regExp?: RegExp, _default?:T ): PropOptions< T > => ( {
        type,
        "default": _default,
        "validator": regExp && ( ( v: T ) => regExp.test( String( v ) ) ),
    } );
export const defineNumberProp = ( regExp?: RegExp, _default?:string ): PropOptions< number | string > =>
    defineProp< number | string >( [ Number, String ], regExp, _default );
export const defineStringProp = ( regExp?: RegExp, _default?:string ): PropOptions< string > =>
    defineProp( String, regExp, _default );
export const booleanProp = ( regExp?: RegExp, _default?:boolean|string ): PropOptions< boolean | string > =>
    defineProp< boolean | string >( [ Boolean, String ], regExp, _default );
export const intProp = defineProp< number | string >( [ Number, String ], /^\d+$/ );
export const floatProp = defineProp< number | string >( [ Number, String ], /^\d*\.?\d*$/ );
export const stringProp = defineStringProp();
export const videoOptionsProp = defineProp< VideoOptions >( [ Object as () => VideoOptions ] );
