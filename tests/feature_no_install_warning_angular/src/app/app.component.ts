import { Component } from '@angular/core';
// uncomment --> warning log `twicpics-components domain is mandatory and is not defined !` should disappear
// and image should be displayed
/*
import { installTwicPics } from '@twicpics/components/angular13';
installTwicPics( {
    "domain": `https://demo.twic.it`,
} );*/
@Component( {
    "selector": `app-root`,
    "templateUrl": `./app.component.html`,
    "styleUrls": [ `./app.component.css` ],
} )
export class AppComponent {
    title = `feature_no_install_warning_angular`;
}
