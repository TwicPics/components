import { installTwicpics,
    TwicBackground,
    TwicPicture,
    TwicImg,
    TwicVideo,
    TwicView } from "@twicpics/components/webcomponents";

installTwicpics( {
    "anticipation": 0.5,
    "env": `production`,
    "domain": `https://demo.twic.it`,
    "handleShadowDom": true,
    "step": 100,
} );

customElements.define( `twic-background`, TwicBackground );
customElements.define( `twic-picture`, TwicPicture );
customElements.define( `twic-img`, TwicImg );
customElements.define( `twic-video`, TwicVideo );
customElements.define( `twic-view`, TwicView );
