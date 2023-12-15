import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TwicBackgroundComponent } from "./background.component";
import { TwicImgComponent } from "./img.component";
import { TwicMediaComponent } from "./media.component";
import { TwicPictureComponent } from "./picture.component";
import { TwicVideoComponent } from "./video.component";
import { TwicViewComponent } from "./view.component";

@NgModule( {
    "declarations": [
        TwicBackgroundComponent,
        TwicImgComponent,
        TwicMediaComponent,
        TwicPictureComponent,
        TwicVideoComponent,
        TwicViewComponent,
    ],
    "imports": [ CommonModule ],
    "exports": [
        TwicBackgroundComponent,
        TwicImgComponent,
        TwicPictureComponent,
        TwicVideoComponent,
        TwicViewComponent,
    ],
} )
export class TwicPicsComponentsModule { }
