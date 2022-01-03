import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TwicImgComponent } from "./twic-img.component";
import { TwicVideoComponent } from "./twic-video.component";
import { TwicBaseComponent } from "./twic-base.component";
import { AttributesDirective } from "./attributes.directive";

@NgModule( {
    "declarations": [
        TwicBaseComponent,
        TwicImgComponent,
        TwicVideoComponent,
        AttributesDirective,
    ],
    "imports": [ CommonModule ],
    "exports": [
        TwicVideoComponent,
        TwicImgComponent,
    ],
} )
export class TwicPicsComponentsModule { }
