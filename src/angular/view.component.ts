import { Component, ElementRef, Renderer2 } from '@angular/core';
// eslint-disable-next-line no-duplicate-imports
import type { OnInit } from "@angular/core";
import { computeViewAttributes } from '../_/compute';

@Component( {
    "selector": `TwicView`,
    "template": `<ng-content></ng-content>`,
} )
export class TwicViewComponent implements OnInit {
    // eslint-disable-next-line no-useless-constructor
    constructor(
        private renderer: Renderer2,
        private elementRef: ElementRef
    ) { }
    ngOnInit(): void {
        // add attributes to the host element
        Object.entries( computeViewAttributes() || [] ).forEach( ( [ attributName, attributValue ] ) => {
            // eslint-disable-next-line no-negated-condition
            this.renderer.setAttribute(
                this.elementRef.nativeElement,
                attributName,
                attributValue
            );
        } );
    }
}
