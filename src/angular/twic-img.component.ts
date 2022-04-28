/**
 * img component
 */
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TwicBaseComponent } from "./twic-base.component";

@Component( {
    "selector": `TwicImg`,
    "template": `
        <div>
            <div #wrapper [ngStyle]="wrapperStyle" [ngClass]="wrapperClass">
                <img
                        [attr.alt]="description"
                        [twicPicsAttributes]="elementAttributs"
                        [ngStyle]="elementStyle"
                >
            </div>
        </div>
    `,
    "styleUrls": [ `../_/style.css` ],
    "changeDetection": ChangeDetectionStrategy.OnPush,
} )
export class TwicImgComponent extends TwicBaseComponent {
}
