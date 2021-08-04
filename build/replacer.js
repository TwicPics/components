import { createFilter } from "@rollup/pluginutils";
import MagicString from "magic-string";

const rMatch = /\$([0-9]+)/g;

const specials = new Map( [
    [ `start`, ( magicString, replacer ) => magicString.prepend( replacer ) ],
    [ `end`, ( magicString, replacer ) => magicString.append( replacer ) ],
] );

const replaceFactory = source => {
    const magicString = new MagicString( source );
    return [
        ( regExp, replacer ) => {
            const special = specials.get( regExp );
            if ( special ) {
                special( magicString, replacer );
                return;
            }
            // eslint-disable-next-line no-param-reassign
            source.replace( regExp, ( ...match ) => {
                match.pop();
                const start = match.pop();
                const end = start + match[ 0 ].length;
                const result = replacer.replace( rMatch, ( _, index ) => match[ Number( index ) ] );
                try {
                    if ( start < end ) {
                        magicString.overwrite( start, end, result );
                    } else if ( result.length ) {
                        magicString.appendRight( start, result );
                    }
                } catch ( _ ) {}
            } );
        },
        () => ( {
            "code": magicString.toString(),
            "map": magicString.generateMap( {
                "hires": true,
            } ),
        } ),
    ];
};

export default ( { exclude, include, replacer, replacers = [ replacer ] } ) => {
    const filter = createFilter( include, exclude );
    return {
        "transform": ( source, id ) => {
            if ( !filter( id ) ) {
                return null;
            }
            const [ replace, result ] = replaceFactory( source, id );
            for ( const [ regExp, to ] of replacers ) {
                replace( regExp, to );
            }
            return result();
        },
    };
};
