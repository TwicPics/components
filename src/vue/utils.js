export const callWithThis = fn => function() {
    // eslint-disable-next-line no-invalid-this
    return fn( this );
};

export const defineProp = ( type, regExp, defaultValue ) => ( {
    "default": defaultValue,
    type,
    "validator": regExp && ( v => regExp.test( v ) ),
} );

export const defineStringProp = ( regExp, defaultValue ) => defineProp( String, regExp, defaultValue );
