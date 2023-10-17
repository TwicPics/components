/* eslint-disable no-shadow */
const isEmpty = ( value: unknown ) => ( value === null ) || ( value === undefined );

type Validator = (
    props: Record<string, unknown>,
    propName: string,
    componentName: string,
) => null | Error;
interface ValidationErrorParams {
  componentName: string,
  expectedType?: string,
  expectedValue?: string,
  props: Record<string, unknown>,
  propName: string,
}
class ValidationError extends Error {
    message: string;
    expected: string;
    constructor( validationErrorParams: ValidationErrorParams ) {
        super();
        const { componentName, expectedType, expectedValue, props, propName } = validationErrorParams;
        this.message = `Invalid prop '${
            propName
        }'${
            expectedValue ?
            ` value '${ props[ propName ] }'` :
            ``
        }${
            expectedType ?
            ` type '${ typeof props[ propName ] }'` :
            ``
        } supplied to '${
            componentName
        }'${
            ( expectedType || expectedValue ) ?
            `, expected ${ expectedType || expectedValue }` :
            ``
        }.`;
        this.expected = expectedType || expectedValue;
    }
}

const oneOfFactory = < T >( expectedValues: T[] ) => {
    const set = new Set< T >( expectedValues );
    return (
        props: Record<string, unknown>,
        propName: string,
        componentName: string
    ) => {
        const value = props[ propName ];
        if ( !isEmpty( value ) && !set.has( value as unknown as T ) ) {
            return new ValidationError( {
                componentName,
                "expectedValue": `one of '${ expectedValues.toString() }'`,
                props,
                propName,
            } );
        }
        return null;
    };
};

const oneOfTypeFactory = ( validators: Validator[] ) => (
    props: Record<string, unknown>,
    propName: string,
    componentName: string
) => {
    const expectedTypes = [];
    for ( const validator of validators ) {
        const validationError = validator( props, propName, componentName );
        if ( validationError === null ) {
            return null;
        }
        expectedTypes.push( ( validationError as ValidationError ).expected );
    }
    return new ValidationError( {
        componentName,
        "expectedType": `one of type [ ${ expectedTypes.join( `,` ) } ]`,
        props,
        propName,
    } );
};

const propTypeFactory = ( expectedType: string, regExp?: RegExp ): Validator => (
    props: Record<string, unknown>,
    propName: string,
    componentName: string
) => {
    const value = props[ propName ];
    const errorMessage: ValidationErrorParams = {
        componentName,
        props,
        propName,
    };
    if ( !isEmpty( value ) && ( typeof value !== expectedType ) ) {
        return new ValidationError( {
            ...errorMessage,
            ...{
                expectedType,
            },
        } );
    }
    if ( regExp && !regExp.test( String( value ) ) ) {
        return new ValidationError( errorMessage );
    }
    return null;
};

export const boolean = propTypeFactory( `boolean` );
export const func = propTypeFactory( `function` );
export const oneOf = oneOfFactory;
export const oneOfType = oneOfTypeFactory;
export const propType = propTypeFactory;
export const string = propTypeFactory( `string` );
export const number = oneOfTypeFactory( [ propTypeFactory( `number` ), string ] );
