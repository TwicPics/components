import { version } from "react";

const reactVersionFactory = () => {
    const [ _major, _minor ] = version.split( `.` ).map( Number );
    const major = isNaN( _major ) ? 0 : _major;
    const minor = isNaN( _minor ) ? 0 : _minor;
    return ( {
        major,
        minor,
    } );
};

export const reactVersion = reactVersionFactory();

