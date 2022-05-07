/**
 * img component
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { TwicBaseComponent } from "./twic-base.component";

@Component( {
    "selector": `TwicImg`,
    "template": `
        <div #wrapper [ngStyle]="wrapperStyle" [ngClass]="wrapperClass">
            <img
                    [attr.alt]="description"
                    [twicPicsAttributes]="elementAttributs"
                    [ngStyle]="elementStyle"
            >
        </div>
    `,
    "styleUrls": [ `../_/style.css` ],
    "changeDetection": ChangeDetectionStrategy.OnPush,
    "encapsulation": ViewEncapsulation.None,
} )
export class TwicImgComponent extends TwicBaseComponent {
}
