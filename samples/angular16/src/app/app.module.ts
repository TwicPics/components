import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { TwicPicsComponentsModule } from "@twicpics/components/angular16";

@NgModule( {
    "declarations": [ AppComponent ],
    "imports": [
        BrowserModule,
        TwicPicsComponentsModule,
    ],
    "providers": [],
    "bootstrap": [ AppComponent ],
} )
export class AppModule { }
