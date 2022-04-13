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
        .filter( dirent => dirent.name.match( /^[^_].*.md+$/gi ) )
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
    const rTransform = /^\/\/\s*\/((?:\\.|[^/])+)\/([a-z]+)?\s*=>\s*("(?:\\.|[^"])+")\s*$/mg;
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
            "regExp": /__PACKAGE_VERSION__/gm,
            "transform": packageVersion,
        },
    ];

    let content = ( await readFile( file, `utf8` ) ).replace(
        rTransform, ( _, regExpExpression, regExpFlags, string ) => {
            replacers.push( {
                "regExp": new RegExp( regExpExpression, regExpFlags ),
                "transform": JSON.parse( string ),
            } );
            return ``;
        }
    );

    for ( const { regExp, transform } of replacers ) {
        content = content.replace( regExp, transform );
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

/**
 * build documentation
 */
for await ( const documentationToBuild of documentationsToBuild ) {
    const { build } = documentationToBuild;
    await buildDocumentation( documentationToBuild );
    const content = await replacer( build );
    await writeFile( build, content );
    console.log( `${ build } generated` );
}

await removeWorkingDirectory();
