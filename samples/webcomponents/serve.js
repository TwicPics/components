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
    }</script>
    <style>${
        await readFile( resolve( rootDir, `node_modules/@twicpics/components/style.css` ), `utf8` )
    }</style>
    <style>${
        await readFile( resolve( sampleDir, `Sample.css` ), `utf8` )
    }</style>
    <template id="main-shadow-container-template">
        <shadow-container></shadow-container>
    </template>
    <template id="shadow-container-template">
        ${ await readFile( resolve( sampleDir, `Sample.html` ), `utf8` ) }
    </template>
    <template id="styleSamples">
        ${ await readFile( resolve( sampleDir, `Sample.css` ), `utf8` ) }
    </template>
    <main-shadow-container></main-shadow-container>
    <other-shadow-container></other-shadow-container>
    <script>
        customElements.define('shadow-container',
            class extends HTMLElement {
                constructor() {
                super();
                const shadowRoot = this.attachShadow({mode: 'open'});
                shadowRoot.appendChild(document
                        .getElementById('shadow-container-template')
                        .content
                        .cloneNode(true)
                    );
                const styleSamples = document.createElement( "style" );
                styleSamples.innerHTML = document.getElementById( "styleSamples" ).content.textContent;
                shadowRoot.appendChild( styleSamples );
            }
        })
        customElements.define('main-shadow-container',
            class extends HTMLElement {
                constructor() {
                super();
                const shadowRoot = this.attachShadow({mode: 'open'});
                shadowRoot.appendChild(document
                        .getElementById('main-shadow-container-template')
                        .content
                        .cloneNode(true)
                    );
            }
        })
        customElements.define('other-shadow-container',
            class extends HTMLElement {
                constructor() {
                super();
                const shadowRoot = this.attachShadow({mode: 'open'});
            }
        })
    </script>
    `
);

import StaticServer from "static-server";
( new StaticServer( {
    "rootPath": `.`,
    "port": 3000,
    "followSymlink": true,
} ) ).start();

// eslint-disable-next-line no-console
console.log( `Listening on port 3000` );
