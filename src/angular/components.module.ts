import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AttributesDirective } from "./attributes.directive";
import { TwicBaseComponent } from "./base.component";
import { TwicImgComponent } from "./img.component";
import { TwicVideoComponent } from "./video.component";
import { TwicViewComponent } from "./view.component";

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
