import MagicString from "magic-string";

const rMatch = /\$([0-9]+)/g;

const replaceFactory = source => {
    const magicString = new MagicString( source );
    return [
        ( _regExp, replacer ) => {
            const regExp = new RegExp( _regExp );
            regExp.lastIndex = 0;
            let match;
            const rMatchReplace = ( _, index ) => match[ Number( index ) ];
            while ( ( match = regExp.exec( source ) ) ) {
                try {
                    magicString.overwrite(
                        match.index,
                        match.index + match[ 0 ].length,
                        replacer.replace( rMatch, rMatchReplace )
                    );
                } catch ( _ ) {}
            }
        },
        () => ( {
            "code": magicString.toString(),
            "map": magicString.generateMap(),
        } ),
    ];
};

export default ( list = [] ) => ( {
    "transform": source => {
        const [ replace, result ] = replaceFactory( source );
        for ( const [ regExp, replacer ] of list ) {
            replace( regExp, replacer );
        }
        return result();
    },
} );
