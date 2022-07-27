/**
 * img component
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { TwicBaseComponent } from "./twic-base.component";

@Component( {
    "selector": `TwicImg`,
    "template": `
        <div [ngClass]="wrapperClass" [ngStyle]="wrapperStyle">
            <img
                    [attr.alt]="description"
                    [twicPicsAttributes]="elementAttributs"
                    [ngStyle]="elementStyle"
            >
            <div #placeholder [ngStyle]="placeholderStyle"></div>
        </div>
    `,
    "styleUrls": [ `../_/style.css` ],
    "changeDetection": ChangeDetectionStrategy.OnPush,
    "encapsulation": ViewEncapsulation.None,
} )
export class TwicImgComponent extends TwicBaseComponent {
}
