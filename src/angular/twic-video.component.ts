/**
 * video component
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { TwicBaseComponent } from "./twic-base.component";

@Component( {
    "selector": `TwicVideo`,
    "template": `
        <div>
            <div #wrapper [ngStyle]="wrapperStyle" [ngClass]="wrapperClass">
                <video
                        [twicPicsAttributes]="elementAttributs"
                        [ngStyle]="elementStyle"
                >
                </video>
            </div>
        </div>
    `,
    "styleUrls": [ `../_/style.css` ],
    "changeDetection": ChangeDetectionStrategy.OnPush,
    "encapsulation": ViewEncapsulation.None,
} )
export class TwicVideoComponent extends TwicBaseComponent {
}
