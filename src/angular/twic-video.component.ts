/**
 * video component
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { TwicBaseComponent } from "./twic-base.component";

@Component( {
    "selector": `TwicVideo`,
    "template": `
        <div [ngClass]="wrapperClass" [ngStyle]="wrapperStyle">
            <video
                    [twicPicsAttributes]="elementAttributs"
                    [ngStyle]="elementStyle"
            >
            </video>
            <div #placeholder [ngStyle]="placeholderStyle"></div>
        </div>
    `,
    "styleUrls": [ `../_/style.css` ],
    "changeDetection": ChangeDetectionStrategy.OnPush,
    "encapsulation": ViewEncapsulation.None,
} )
export class TwicVideoComponent extends TwicBaseComponent {
}
