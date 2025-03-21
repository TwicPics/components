import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    StateEvent,
    TwicImgComponent,
    TwicPicsComponentsModule,
    installTwicPics,
} from '@twicpics/components/angular19';

@Component( {
    "selector": `app-root`,
    "standalone": true,
    "imports": [ CommonModule, TwicPicsComponentsModule ],
    "templateUrl": `./app.component.html`,
    "styleUrl": `./app.component.scss`,
} )
export class AppComponent {
    title = `standalone-components`;
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

installTwicPics( {
    "domain": `https://demo.twic.it`,
} );
