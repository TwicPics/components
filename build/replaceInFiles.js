import replaceInFile from "replace-in-file";

export default async ( { files, replacer, replacers = [ replacer ] } ) => {
    const from = [];
    const to = [];
    for ( const [ _from, _to ] of replacers ) {
        from.push( _from );
        to.push( _to );
    }
    await replaceInFile( {
        files,
        from,
        to,
    } );
};
