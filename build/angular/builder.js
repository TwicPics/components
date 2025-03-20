/* eslint-disable max-lines */
/* eslint-disable no-console */
import __dirname from "../__dirname.js";
import { getJsonFromPath, writeJson } from "../json.js";
import rollup from "../rollup.js";
import { gitHubRawPath, packageAuthor, packageName, packageVersion } from "../version.js";
import {
    getAngularDirectories,
    getDistFolder,
    getExportsKeys,
    getPackageJsonMap,
    getProjectsByDirectory,
    getVersionAliases,
} from "./utils.js";
import { execSync } from "child_process";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { copy, outputFile, remove } from "fs-extra";
import path from "path";
import replaceInFile from "replace-in-file";
import dts from "rollup-plugin-dts";
import uglify from "uglify-js";

/**
 * copy files from gcc dist folder to twicpics dist folder
 * @param {*} angularDirectory : current angular project informations
 */
const copyFiles = async angularDirectory => {
    const { twicDist, ngcDist } = getDistFolder( angularDirectory );
    // file list to copy from ngcdist to twicdist
    const filesToCopy = [ `lib.metadata.json` ];
    // copy original lib.metadata.json
    // filter on existing files before copy
    await Promise.all( filesToCopy
        .filter( f => existsSync( `${ ngcDist }/${ f }` ) )
        .map( f => copy( `${ ngcDist }/${ f }`, `${ twicDist }/${ f }` ) ) );
};

/**
 * extracts exports data from generated package.json
 * looking for attributs module, main, typings, esXXXX, fesmXXXX
 * @param {*} angularDirectory : current angular project informations
 * @param {*} declaration : <true> considers type definition exports, <false> considers other exports
 */
const getExportsMappings = async ( angularDirectory, declaration ) => {
    // read package.json generated by ng build
    const { ngcDist } = getDistFolder( angularDirectory );
    const packageJson = await getJsonFromPath( `${ ngcDist }/package.json` );
    let regExp;
    if ( declaration ) {
        regExp = /^(typings)|(metadata)$/;
    } else {
        regExp = /^(module)|(main)|(((fesm)|(es))[0-9]+)$/;
    }
    const mappings = Object.keys( packageJson ).filter( key => key.match( regExp ) )
        .map( key => ( {
            key,
            "source": `${ packageJson[ key ] }`,
            "destination": declaration ?
                `${ packageJson[ key ] }` :
                `${ key }${ path.extname( `${ packageJson[ key ] }` ) }`,
            "reference": true,
        } ) );
    // management of identical target files
    const references = [];
    for ( const mapping of mappings ) {
        const { source } = mapping;
        // for the given mapping, looks if a reference already exists in references
        const _reference = references.find( r => r && ( r.source === source ) );
        if ( _reference ) {
            // references exists --> we will consider the reference destination
            mapping.destination = _reference.destination;
            // marks this mapping as not a reference
            mapping.reference = false;
        } else {
            references.push( mapping );
        }
    }
    return mappings;
};

/**
 * extract and return exports mapping from package.json generated by angular compiler
 * used when feeding inner package.json (<angularName>null</angularName>)
 * used when feeding global twicPics component package.json  (<angularName>angularXX</angularName>)
 * @param {*} angularDirectory : current angular project informations
 * @param {*} angularName
 */
const getPackageExports = async ( angularDirectory, angularName ) => {
    const mappingsJs = await getExportsMappings( angularDirectory, false );
    const mappingsDeclaration = await getExportsMappings( angularDirectory, true );
    const packageExports = {};
    mappingsJs.forEach( mapping => {
        const { key, destination } = mapping;
        packageExports[ key ] = angularName ? `./${ angularName }/${ destination }` : `${ destination }`;
    } );
    mappingsDeclaration.forEach( mapping => {
        const { key, destination } = mapping;
        packageExports[ key ] = angularName ? `./${ angularName }/${ destination }` : `${ destination }`;
    } );
    return packageExports;
};

/**
 * some versions of angular need ngc package.json to be published
 * manageInnerPackageJson feeds this inner package.json
 * @param {*} angularDirectory : current angular project informations
 */
const manageInnerPackageJson = async angularDirectory => {
    const { twicDist } = getDistFolder( angularDirectory );
    const { packageJsonPath } = angularDirectory;
    const packageJSON = {
        ...await getJsonFromPath( packageJsonPath ),
        ...await getPackageExports( angularDirectory ),
    };
    packageJSON.version = packageVersion;
    packageJSON.author = packageAuthor;
    packageJSON.name = packageName;
    await writeJson( `${ twicDist }/package.json`, packageJSON );
};

/**
 * minification of generated js files
 * @param {*} angularDirectory : current angular project informations
 */
const minify = async angularDirectory => {
    const { twicDist, ngcDist } = getDistFolder( angularDirectory );
    const mappings = await getExportsMappings( angularDirectory );
    const refMappings = mappings.filter( m => m.reference );
    for await ( const { source, destination } of refMappings ) {
        const { code, map, error } = uglify.minify(
            await readFile( `${ ngcDist }/${ source }`, `utf8` ),
            {
                "mangle": false,
                "compress": true,
                "sourceMap": {
                    "url": `${ destination }.map`,
                    "content": await readFile( `${ ngcDist }/${ source }.map`, `utf8` ),
                },
            }
        );
        if ( error ) {
            console.error( `Error occurred while minification :`, error );
        } else {
            const filesToWrite = [
                {
                    "path": `${ twicDist }/${ destination }`,
                    "content": code,
                },
            ];
            if ( map ) {
                filesToWrite.push( {
                    "path": `${ twicDist }/${ destination }.map`,
                    "content": map,
                } );
            }
            await Promise.all( filesToWrite.map( f => outputFile( f.path, f.content ) ) );
        }
    }
};

/**
 * generated source maps uses relative source path
 * here transformation to point to github sources
 */
const sourcemapPathTransform = async angularDirectory => {
    const { ngcDist } = getDistFolder( angularDirectory );
    // commons sources
    let replaceOptions = {
        "files": `${ ngcDist }/**/*.map`,
        "from": /..\/..\/lib\/src\/_\//g,
        "to": `${ gitHubRawPath }/src/_/`,
    };
    await replaceInFile( replaceOptions );
    // angular sources
    replaceOptions = {
        "files": `${ ngcDist }/**/*.map`,
        "from": /..\/..\/lib\/src\//g,
        "to": `${ gitHubRawPath }/src/angular/`,
    };
    await replaceInFile( replaceOptions );
};

/**
 * rollup definitions type related to current angular project
 * @param {*} angularDirectory : current angular project informations
 */
const typeDefinitions = async angularDirectory => {
    const { twicDist, ngcDist } = getDistFolder( angularDirectory );
    const packageJson = await getJsonFromPath( `${ ngcDist }/package.json` );
    const { typings } = packageJson;
    // rollup generated index.d.ts
    await rollup( {
        "input": `${ ngcDist }/${ typings }`,
        "output": [
            {
                "file": `${ twicDist }/${ typings }`,
                "format": `es`,
            },
        ],
        "plugins": [ dts() ],
    } );
};

/**
 * build the angular library named projectName
 * 0  -  remove old source from previous build
 * 1  -  copy source from master to library project to build
 * 2  -  change imports in library project to build
 * 3  -  copy common directory (_) to library project to build
 * 4  -  launch official ng build
 * 5  -  replace FRAMEWORK by ANGULAR in build library
 * 6  -  apply sourcemap transform (to point to github)
 * 7  -  clean working directory
 * 8  -  rollup d.t
 * 9  -  minify bundle
 * 10 -  copy files from ngc dist folder to twicpics dist folder
 * @param angularDirectory : directory of related project to build
 * @param angularConfig : config of angular projet to build
 */
const buildAngularProject = async ( angularDirectory, angularConfig ) => {
    const { sourceRoot } = angularConfig.project;
    const { ngcDist } = getDistFolder( angularDirectory );
    const libraryName = ` ${ angularConfig.projectName }/${ angularDirectory.name }`;
    const masterDestinationPath = `${ angularDirectory.path }/${ sourceRoot }/`;

    console.log( `Building ${ libraryName }` );

    // 0 - remove old source from previous build
    await remove( masterDestinationPath );

    // 1 - copy source from master to library project to build
    const masterSourcePath = `${ __dirname }/../src/angular/`;
    await copy( masterSourcePath, masterDestinationPath );

    // 2 - change imports in library project to build
    let replaceOptions = {
        "files": `${ masterDestinationPath }/**/*.*`,
        "from": /\.\.\/_\//g,
        "to": `./_/`,
    };
    try {
        await replaceInFile( replaceOptions );
    } catch ( error ) {
        console.error( `Angular replacement error occurred:`, error );
    }

    // 3 - copy common directory (_) to library project to build
    const commonSourcePath = `${ __dirname }/../src/_`;
    const commonDestinationPath = `${ masterDestinationPath }_`;
    await copy( commonSourcePath, commonDestinationPath );

    // 4 - launch official ng build
    execSync( `cd ${ angularDirectory.path } && npx ng build ${ angularConfig.projectName }` );

    // 5 - replace FRAMEWORK by ANGULAR in built library
    replaceOptions = {
        "files": `${ ngcDist }/**/*.*`,
        "from": /\bFRAMEWORK([^:])/g,
        "to": `'ANGULAR'`,
    };
    await replaceInFile( replaceOptions );

    // 6 - apply sourcemap transform (to point to github)
    await sourcemapPathTransform( angularDirectory );

    // 7 - clean working directory
    // remove tmp source
    await remove( masterDestinationPath );

    // 8 - rollup d.ts
    await typeDefinitions( angularDirectory );

    // 9 - minify bundles
    await minify( angularDirectory );

    // 10 - copy files
    await copyFiles( angularDirectory );

    await manageInnerPackageJson( angularDirectory );

    console.log( `${ libraryName } built` );
};

/**
 * angular build processing
 * For each angular library to build, call buildAngularProject
 * @returns {Promise<void>}
 */
export const buildComponents = async () => {
    // retreive angular directories containing a library to build
    const angularDirectories = await getAngularDirectories();
    // loop on angular directories
    for await ( const angularDirectory of angularDirectories ) {
        // retreive angular projects to build within given angularDirectory
        const angularProjects = await getProjectsByDirectory( angularDirectory );
        if ( angularProjects ) {
            // loop on angular projects to build
            for await ( const project of angularProjects ) {
                await buildAngularProject( angularDirectory, project );
            }
        } else {
            console.warn( `No angular configuration for ${ angularDirectory.name }` );
        }
    }

    // creation of aliases to reference versions
    console.log( `Angular duplication starts` );
    const packageJsonMap = await getPackageJsonMap();
    await Promise.all( getVersionAliases().map(
        async versionAlias => {
            const { reference, version } = versionAlias;
            // duplicates only when needed
            if ( reference !== version ) {
                // create a clone of package.json
                const packageJson = {
                    ...packageJsonMap.get( reference ),
                };
                // modification of generated package.json to point to the reference files
                getExportsKeys( packageJson ).forEach( key => {
                    // point to reference file
                    packageJson[ key ] = `../angular${ reference }/${ packageJson[ key ] }`;
                } );
                // write package.json to "version" dist directory
                await writeJson(
                    `${ __dirname }/../dist/angular${ version }/package.json`,
                    packageJson
                );
            }
        }
    ) );
    console.log( `Angular duplication ends` );
};

/**
 * generates and returns exports attributes to be added to the main generated package.json
 * handles the case where version needs a full exports (aka no directory import issue)
 */
export const exportsPackageJson = async () => {
    const exports = new Map();
    const packageJsonMap = await getPackageJsonMap();
    const versionAliases = getVersionAliases();
    for ( const { noDirectoryImport, reference, version } of versionAliases ) {
        // classical case: import from directory
        let _exports = `./angular${ version }`;
        if ( noDirectoryImport ) {
            // handles no directory import issue
            const packageJson = packageJsonMap.get( reference );
            const exportsKeys = getExportsKeys( packageJson );
            _exports = exportsKeys.reduce( ( acc, key ) => {
                // eslint-disable-next-line no-param-reassign
                acc[ key === `typings` ? `types` : key ] = `./angular${ reference }/${ packageJson[ key ] }`;
                return acc;
            }, {} );
        }
        exports.set( `./angular${ version }`, _exports );
    }
    return exports;
};
