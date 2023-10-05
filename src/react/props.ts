/* eslint-disable no-shadow */
interface ValidationErrorParams {
    componentName: string,
    displayValue?: boolean,
    expectedType?: string,
    expectedValue?: string,
    props: Record<string, unknown>,
    propName: string,
    regExp?: RegExp,
}
type Validator = (
    props: Record<string, unknown>,
    propName: string,
    componentName: string,
) => null | Error;

const isEmpty = ( value:unknown ) => ( value === null ) || ( value === undefined );
const validationError = ( validationErrorParams: ValidationErrorParams ) => {
    const { componentName, expectedType, expectedValue, props, propName } = validationErrorParams;
    return new Error(
        `Invalid prop '${
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
        }.`
    );
};

const oneOfFactory = < T >( expectedValues: T[] ) =>
    (
        props: Record<string, unknown>,
        propName: string,
        componentName: string
    ) => {
        const value = props[ propName ];
        if ( !isEmpty( value ) && !expectedValues.includes( value as unknown as T ) ) {
            return validationError( {
                componentName,
                "expectedValue": `one of '${ expectedValues.toString() }'`,
                props,
                propName,
            } );
        }
        return null;
    };

const oneOfTypeFactory = ( validators: Validator[] ) =>
    (
        props: Record<string, unknown>,
        propName: string,
        componentName: string
    ) => {
        const validation = validators.reduce(
            ( acc: boolean, validator: Validator ) => {
                if ( acc ) {
                    return acc;
                }
                return !validator( props, propName, componentName );
            },
            false
        );
        // eslint-disable-next-line consistent-return
        return validation ? null : validationError( {
            componentName,
            props,
            propName,
        } );
    };

const propTypeFactory = ( expectedType: string, regExp?: RegExp ): Validator =>
// eslint-disable-next-line consistent-return
    (
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
            return validationError( {
                ...errorMessage,
                ...{
                    expectedType,
                },
            } );
        }
        if ( regExp && !regExp.test( String( value ) ) ) {
            return validationError( errorMessage );
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
