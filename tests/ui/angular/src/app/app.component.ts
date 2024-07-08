/* eslint-disable class-methods-use-this */
import { Component } from "@angular/core";
import { installTwicpics } from "@twicpics/components/angular18";
import config from "../../../_/config.js";
@Component( {
    "selector": `app-root`,
    "templateUrl": `./app.component.html`,
} )
export class AppComponent {}

installTwicpics( config );
