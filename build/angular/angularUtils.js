/* eslint-disable no-console */
import __dirname from "../__dirname.js";
import { readdir, readFile } from "fs/promises";
import { existsSync } from "fs";

/**
 * root directory for angular projects to build
 * Contains one subfolder by supported angular version
 */
const angularTemplatesPath = `${ __dirname }/angular/_templates/`;

/**
 * get list of angular project directories
 * return only directories that starts with angular+versionNumber
 * eg : angular12, angular13...
 * @return array
 */
export const getAngularDirectories = async () =>
    ( await readdir( angularTemplatesPath, {
        'withFileTypes': true,
    } ) )
        // only directories
        .filter( dirent => dirent.isDirectory() )
        // only directories named angular + versionNumber
        .filter( dirent => dirent.name.match( /angular[0-9]+$/ ) )
        .map( dirent => {
            const obj = {
                "name": dirent.name,
                "path": `${ angularTemplatesPath }${ dirent.name }`,
                "angularJsonPath": `${ angularTemplatesPath }${ dirent.name }/angular.json`,
            };
            return obj;
        } );

/**
 * read file jsonFilePath and return parsed json
 * @param jsonFilePath
 * @returns {Promise<null|any>}
 */
export const getJsonFromFile = async jsonFilePath => {
    if ( !existsSync( jsonFilePath ) ) {
        console.error( `${ jsonFilePath } does not exists` );
        return null;
    }
    return JSON.parse( await readFile( jsonFilePath, `utf8` ) );
};
