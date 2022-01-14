import { createRequire } from "module";

const templateJson = createRequire( import.meta.url )( `./package.template.json` );

export const { "version": packageVersion, "author": packageAuthor, "name": packageName } = templateJson;

export const gitHubRootPath = `https://raw.githubusercontent.com/twicpics/components/${ packageVersion }`;

