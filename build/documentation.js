/* eslint-disable no-console */
import __dirname from "./__dirname.js";
import markdownInclude from "markdown-include";
import { mkdir, readdir, readFile, rm, writeFile } from "fs/promises";
import { packageVersion, gitHubRawPath, gitHubBlobPath } from "./version.js";

/**
 * path of the folder containing the sources of the documentation to be generated
 */
const documentationSrcPath = `${ __dirname }/../src/_documentation/`;

/**
 * working directory
 * will be created then deleted
 */
const tmpDirectory = `${ __dirname }/../tmp`;

const removeWorkingDirectory = async () => {
    await rm( tmpDirectory, {
        "recursive": true,
        "force": true,
    } );
};

const createWorkingDirectory = async () => {
    await removeWorkingDirectory();
    await mkdir( tmpDirectory );
};

/**
  * get list of documentation to build
  * @return array
  */
const getDocumentationsToBuild = async () =>
    ( await readdir( documentationSrcPath, {
        'withFileTypes': true,
    } ) )
        // all .md files not begining with _
        .filter( dirent => dirent.name.match( /^[^_].*(\.md)+$/gi ) )
        .map( dirent => {
            const obj = {
                "build": `documentation/${ dirent.name }`,
                "files": [ `src/_documentation/${ dirent.name }` ],
            };
            return obj;
        } );

/**
 * string replacement in @param file content
 * returns modified content
 */
const replacer = async file => {
    const leadingAndScopeRegExp = /^\/\/\s*(?:<(.*)>)?\s*/;
    const expressionAndFlagRegExp = /\s*\/((?:\\.|[^/])+)\/([a-z]+)?\s*/;
    const targetRegExp = /\s*(?:§="(.*)")?\s*/;
    const transformRegExp = /\s*=>\s*("(?:\\.|[^"])+")\s*$/;

    const rTransform = new RegExp( `${
            leadingAndScopeRegExp.source
        }${
            expressionAndFlagRegExp.source
        }${
            targetRegExp.source
        }${
            transformRegExp.source
        }`,
        `gm` );
    const replacers = [
        {
            "regExp": /(\b)__GITHUB_RAW_PATH__(\b)/gm,
            "transform": gitHubRawPath,
        },
        {
            "regExp": /(\b)__GITHUB_BLOB_PATH__(\b)/gm,
            "transform": gitHubBlobPath,
        },
        {
            "regExp": /__NPM_URL_PACKAGE_VERSION__/gm,
            "transform": packageVersion,
        },
        {
            "regExp": /__NPM_IMAGE_PACKAGE_VERSION__/gm,
            "transform": packageVersion.replace( /-/g, `--` ),
        },
    ];
    const scopedReplacers = [];

    let content = ( await readFile( file, `utf8` ) ).replace(
        rTransform, ( _, scope, regExpExpression, regExpFlags, target, string ) => {
            if ( scope ) {
                scopedReplacers.push( {
                    scope,
                    "regExp": new RegExp( regExpExpression, regExpFlags ),
                    "transform": JSON.parse( string ),
                } );
            } else {
                replacers.push( {
                    target,
                    "regExp": new RegExp( regExpExpression, regExpFlags ),
                    "transform": JSON.parse( string ),
                } );
            }
            return `__REMOVE_LINE__`;
        }
    );

    // execute scoped replacers
    const rScopeType = /__TWIC_SCOPE_(.*)__/;
    const rScopeReplacer = /(__TWIC_SCOPE__)/gm;
    for ( const { scope, regExp, transform } of scopedReplacers ) {
        const scopedRegExp = new RegExp( `(?<=${ scope })(.*)(?=${ scope })`, `s` );
        const scoped = scopedRegExp.exec( content );
        if ( scoped ) {
            const scopedType = rScopeType.exec( scope );
            const [ , scopedContent ] = scoped;
            let tmp = scopedContent.replace( regExp, transform );
            if ( scopedType ) {
                tmp = tmp.replace( rScopeReplacer, scopedType[ 1 ] );
            }
            content = content.replace( scopedRegExp, tmp );
        }
    }

    // execute global replacers
    for ( const { regExp, target, transform } of replacers ) {
        if ( target ) {
            content = content.replace(
                regExp,
                match => match.replace( target, transform )
            );
        } else {
            content = content.replace( regExp, transform );
        }
    }

    return content;
};

await createWorkingDirectory();

const documentationsToBuild = await getDocumentationsToBuild();

/**
 * build markdown file described in @param documentationToBuild
 * using markdownInclude
 */
const buildDocumentation = async documentationToBuild => {
    const markdownPath = `${ tmpDirectory }/markdown.json`;
    await writeFile( markdownPath, JSON.stringify( documentationToBuild ) );
    await markdownInclude.compileFiles( markdownPath );
};

const rClean = /(\b)__TWIC_(.*)__(\b)/gm;
const rRemoveLine = /(\n*__REMOVE_LINE__)/gm;
/**
 * build documentation
 */
for await ( const documentationToBuild of documentationsToBuild ) {
    const { build } = documentationToBuild;
    await buildDocumentation( documentationToBuild );
    const content = await replacer( build );
    await writeFile( build, content
        .replace( rClean, `` )
        .replace( rRemoveLine, `` ) );
    console.log( `${ build } generated` );
}

await removeWorkingDirectory();
