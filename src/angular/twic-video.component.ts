/**
 * video component
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { TwicBaseComponent } from "./twic-base.component";

@Component( {
    "selector": `TwicVideo`,
    "template": `
        <div [ngClass]="wrapperClass" [ngStyle]="wrapperStyle">
            <video #media
                [twicPicsAttributes]="mediaAttributs"
                [ngStyle]="mediaStyle"
            >
            </video>
            <div [ngStyle]="placeholderStyle"></div>
        </div>
    `,
    "styleUrls": [ `../_/style.css` ],
    "changeDetection": ChangeDetectionStrategy.OnPush,
    "encapsulation": ViewEncapsulation.None,
} )
export class TwicVideoComponent extends TwicBaseComponent {
}
