import PropTypes from "prop-types";

export const number = PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] );

export const propTypeRegExpFactory = ( regExp: RegExp ) =>
    // eslint-disable-next-line consistent-return
    ( props:Record< string, string >, propName: string ) => {
        const value = props[ propName ];
        if ( !regExp.test( value ) ) {
            return new Error(
                `Invalid prop ${ propName }. ${ value } is not a valid ${ propName }.`
            );
        }
    };

