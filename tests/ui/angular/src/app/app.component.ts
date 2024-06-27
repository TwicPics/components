/* eslint-disable class-methods-use-this */
import { Component } from "@angular/core";
import { installTwicpics } from "@twicpics/components/angular17";
@Component( {
    "selector": `app-root`,
    "templateUrl": `./app.component.html`,
} )
export class AppComponent {}

installTwicpics( {
    "domain": `https://demo.twic.it`,
    "anticipation": 0.5,
    "step": 100,
    "env": `production`,
} );
