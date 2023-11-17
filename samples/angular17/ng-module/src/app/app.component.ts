import { Component } from '@angular/core';
import { installTwicpics, StateEvent, TwicImgComponent } from "@twicpics/components/angular17";

@Component( {
    "selector": `app-root`,
    "templateUrl": `./app.component.html`,
    "styleUrl": `./app.component.css`,
} )
export class AppComponent {
    title = `ng-module`;
    // eslint-disable-next-line class-methods-use-this
    onStateChange( stateEvent: StateEvent ) {
        // eslint-disable-next-line no-console
        console.log( `Angular - TwicImg emits new state event`, stateEvent );
        const { state, target } = stateEvent;
        const _target = target as TwicImgComponent;
        // eslint-disable-next-line no-console
        console.log( `TwicComponent emits a new state`, state );
        // eslint-disable-next-line no-console
        console.log( `TwicComponent source was`, _target.src );
    }
}

installTwicpics( {
    "domain": `https://demo.twic.it`,
    "anticipation": 0.5,
    "step": 100,
    "env": `production`,
} );
