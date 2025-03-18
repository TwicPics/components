import { Component, ElementRef, Renderer2 } from "@angular/core";
// eslint-disable-next-line no-duplicate-imports
import type { OnInit } from "@angular/core";
import { getDataAttributeName } from "../_/config";

@Component( {
    "selector": `__VIEW_COMPONENT__`,
    "template": `<ng-content></ng-content>`,
} )
export class TwicViewComponent implements OnInit {
    // eslint-disable-next-line no-useless-constructor
    constructor(
        private renderer: Renderer2,
        private elementRef: ElementRef
    ) { }
    ngOnInit(): void {
        this.renderer.setAttribute(
            this.elementRef.nativeElement,
            getDataAttributeName( `view` ),
            ``
        );
    }
}
