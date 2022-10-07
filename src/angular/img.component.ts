/**
 * img component
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { TwicBaseComponent } from "./base.component";

@Component( {
    "selector": `TwicImg`,
    "template": `
        <div [ngClass]="wrapperClass" [ngStyle]="wrapperStyle">
            <img #media
                [attr.alt]="description"
                [twicPicsAttributes]="mediaAttributs"
                [ngStyle]="mediaStyle"
            >
            <div [ngStyle]="placeholderStyle"></div>
        </div>
    `,
    "styleUrls": [ `../_/style.css` ],
    "changeDetection": ChangeDetectionStrategy.OnPush,
    "encapsulation": ViewEncapsulation.None,
} )
export class TwicImgComponent extends TwicBaseComponent {
}
