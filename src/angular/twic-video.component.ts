/**
 * video component
 */
import { Component } from "@angular/core";
import { TwicBaseComponent } from "./twic-base.component";

@Component( {
    "selector": `TwicVideo`,
    "template": `
        <div #wrapper [ngStyle]="wrapperStyle" [ngClass]="getWrapperClassName()">
            <video
                    [twicPicsAttributes]="getElementAttributes()"
                    [ngStyle]="getElementStyle()"
            >
            </video>
        </div>
    `,
    "styleUrls": [ `../_/style.css` ],
} )
export class TwicVideoComponent extends TwicBaseComponent {
}
