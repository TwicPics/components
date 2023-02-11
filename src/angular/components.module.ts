import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TwicBackgroundComponent } from "./background.component";
import { TwicImgComponent } from "./img.component";
import { TwicMediaComponent } from "./media.component";
import { TwicVideoComponent } from "./video.component";
import { TwicViewComponent } from "./view.component";

@NgModule( {
    "declarations": [
        TwicBackgroundComponent,
        TwicImgComponent,
        TwicMediaComponent,
        TwicVideoComponent,
        TwicViewComponent,
    ],
    "imports": [ CommonModule ],
    "exports": [
        TwicBackgroundComponent,
        TwicImgComponent,
        TwicVideoComponent,
        TwicViewComponent,
    ],
} )
export class TwicPicsComponentsModule { }
