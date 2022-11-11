import { installTwicPics, TwicImg, TwicVideo, TwicView } from "@twicpics/components/webcomponents";

installTwicPics( {
    "anticipation": 0.5,
    "env": `production`,
    "domain": `https://demo.twic.pics`,
    "handleShadowDom": true,
    "step": 100,
} );

customElements.define( `twic-img`, TwicImg );
customElements.define( `twic-video`, TwicVideo );
customElements.define( `twic-view`, TwicView );
