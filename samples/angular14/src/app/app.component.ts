import { Component } from "@angular/core";
import { installTwicPics } from "@twicpics/components/angular14";
@Component( {
    "selector": `app-root`,
    "templateUrl": `./app.component.html`,
} )
export class AppComponent {
}

installTwicPics( {
    "domain": `https://demo.twic.pics`,
    "anticipation": 0.5,
    "step": 100,
    "env": `production`,
} );
