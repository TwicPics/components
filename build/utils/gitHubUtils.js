import { createRequire } from "module";

const { "version": packageVersion } = createRequire( import.meta.url )( `../package.template.json` );

export const gitHubRootPath = `https://raw.githubusercontent.com/twicpics/components/${ packageVersion }`;

