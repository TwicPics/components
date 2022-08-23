/* eslint-disable class-methods-use-this */
import { Component } from "@angular/core";
import { installTwicPics, StateEvent } from "@twicpics/components/angular11";
@Component( {
    "selector": `app-root`,
    "templateUrl": `./app.component.html`,
} )
export class AppComponent {
    onStateChange( stateEvent: StateEvent ) {
        // eslint-disable-next-line no-console
        console.log( `Angular - TwicImg emits new state event`, stateEvent );
    }
}

installTwicPics( {
    "domain": `https://demo.twic.pics`,
    "anticipation": 0.5,
    "step": 100,
    "env": `production`,
} );
