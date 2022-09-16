import { installTwicPics, TwicImg, TwicVideo } from "@twicpics/components/webcomponents";

installTwicPics( {
    "domain": `https://demo.twic.pics`,
    "anticipation": 0.5,
    "step": 100,
    "env": `production`,
} );

customElements.define( `twic-img`, TwicImg );
customElements.define( `twic-video`, TwicVideo );
