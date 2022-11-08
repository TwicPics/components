import { installTwicPics, TwicImg, TwicVideo, TwicView } from "@twicpics/components/webcomponents";

installTwicPics( {
    "domain": `https://demo.twic.pics`,
    "anticipation": 0.5,
    "step": 100,
    "env": `production`,
} );

class TestContainer extends HTMLElement {

    constructor( ) {
        super();
        const shadowRoot = this.attachShadow( {
            "mode": `open`,
        } );

        // should be managed by components
        const styleComponents = document.createElement( `style` );
        styleComponents.innerHTML = document.getElementById( `styleComponents` ).content.textContent;
        shadowRoot.appendChild( styleComponents );
        // end should be managed by components

        const styleSamples = document.createElement( `style` );
        styleSamples.innerHTML = document.getElementById( `styleSamples` ).content.textContent;
        shadowRoot.appendChild( styleSamples );
        shadowRoot.appendChild( document.getElementById( `content` ).content.cloneNode( true ) );
    }
}

customElements.define( `test-container`, TestContainer );
customElements.define( `twic-img`, TwicImg );
customElements.define( `twic-video`, TwicVideo );
customElements.define( `twic-view`, TwicView );
