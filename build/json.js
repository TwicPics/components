import { outputFile } from "fs-extra";
import { readFile } from "fs/promises";
import { existsSync } from "fs";

export const getJsonFromPath = async jsonPath => {
    if ( !existsSync( jsonPath ) ) {
        throw new Error( `${ jsonPath } does not exists` );
    }
    return JSON.parse( await readFile( jsonPath, `utf8` ) );
};

export const writeJson = async ( jsonPath, jsonContent ) => {
    await outputFile( jsonPath, JSON.stringify( jsonContent, null, `  ` ) );
};
