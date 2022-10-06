import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AttributesDirective } from "./attributes.directive";
import { TwicBaseComponent } from "./twic-base.component";
import { TwicImgComponent } from "./twic-img.component";
import { TwicVideoComponent } from "./twic-video.component";
import { TwicViewComponent } from "./twic-view.component";

@NgModule( {
    "declarations": [
        TwicBaseComponent,
        TwicImgComponent,
        TwicVideoComponent,
        TwicViewComponent,
        AttributesDirective,
    ],
    "imports": [ CommonModule ],
    "exports": [
        TwicImgComponent,
        TwicVideoComponent,
        TwicViewComponent,
    ],
} )
export class TwicPicsComponentsModule { }
