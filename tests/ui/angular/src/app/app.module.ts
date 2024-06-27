import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SampleComponent } from './components/sample.component';
import { TwicPicsComponentsModule } from "@twicpics/components/angular18";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule( {
    "declarations": [ AppComponent, SampleComponent ],
    "imports": [
        BrowserModule,
        AppRoutingModule,
        TwicPicsComponentsModule,
    ],
    "providers": [],
    "bootstrap": [ AppComponent ],
} )
export class AppModule { }
