import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";
// eslint-disable-next-line no-duplicate-imports
import type { OnChanges } from "@angular/core";

@Directive( {
    "selector": `[twicPicsAttributes]`,
} )
export class AttributesDirective implements OnChanges {

    @Input()
    public twicPicsAttributes?: { [key: string]: string; };
    // eslint-disable-next-line no-useless-constructor
    constructor(
        private renderer: Renderer2,
        private elementRef: ElementRef
    ) { }
    manageAttributes():void {
        Object.entries( this.twicPicsAttributes || [] ).forEach( ( [ attributName, attributValue ] ) => {
            if ( attributValue ) {
                this.renderer.setAttribute(
                    this.elementRef.nativeElement,
                    attributName,
                    attributValue
                );
            } else {
                this.renderer.removeAttribute( this.elementRef.nativeElement, attributName );
            }
        } );
    }
    ngOnChanges(): void {
        this.manageAttributes();
    }
}
