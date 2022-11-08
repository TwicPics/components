import { dirname, resolve } from "path";
import { readFile, writeFile } from "fs/promises";

const rootDir = dirname( new URL( ``, import.meta.url ).pathname );
const sampleDir = resolve( rootDir, `node_modules`, `@twicpics/components-sample` );

await writeFile(
    resolve( rootDir, `index.html` ),
    `<script type="module">${
        ( await readFile( resolve( rootDir, `index.js` ), `utf8` ) )
            .replace(
                `@twicpics/components/webcomponents`,
                `./node_modules/@twicpics/components/webcomponents/module.mjs`
            )
    }</script><style>${
        await readFile( resolve( rootDir, `node_modules/@twicpics/components/style.css` ), `utf8` )
    }</style><style>${
        await readFile( resolve( sampleDir, `Sample.css` ), `utf8` )
    }</style>
    <template id="content">
        ${ await readFile( resolve( sampleDir, `Sample.html` ), `utf8` ) }
    </template>
    <template id="styleComponents">
        ${ await readFile( resolve( rootDir, `node_modules/@twicpics/components/style.css` ), `utf8` ) }
    </template>
    <template id="styleSamples">
    ${ await readFile( resolve( sampleDir, `Sample.css` ), `utf8` ) }
</template>
    <test-container data-twic-component></test-container>`
);

import StaticServer from "static-server";
( new StaticServer( {
    "rootPath": `.`,
    "port": 3000,
    "followSymlink": true,
} ) ).start();

// eslint-disable-next-line no-console
console.log( `Listening on port 3000` );
