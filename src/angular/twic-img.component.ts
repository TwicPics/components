/**
 * img component
 */
import { Component } from "@angular/core";
import { TwicBaseComponent } from "./twic-base.component";
import { computeAlt } from "../_/compute";
import { parseAlt, parseSrc } from "../_/parse";

@Component( {
    "selector": `TwicImg`,
    "template": `
        <div #wrapper [ngStyle]="wrapperStyle" [ngClass]="getWrapperClassName()">
            <img
                    [attr.alt]="getAlt()"
                    [twicPicsAttributes]="getElementAttributes()"
                    [ngStyle]="getElementStyle()"
            >
            <div><div></div></div>
        </div>
    `,
    "styleUrls": [ `../_/style.css` ],
} )
export class TwicImgComponent extends TwicBaseComponent {
    getAlt(): string {
        return computeAlt( parseAlt( this.alt ), parseSrc( this.src ) );
    }
}
