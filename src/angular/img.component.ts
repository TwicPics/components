/* eslint-disable no-useless-constructor */
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    Renderer2,
    ViewEncapsulation,
} from "@angular/core";
// eslint-disable-next-line no-duplicate-imports
import type { AfterViewInit, OnChanges } from "@angular/core";
import { parseZoom } from "../_/parse";
import type { Anchor, Mode, Placeholder, StateEvent } from "../_/types";
import { computeMagnifierStyle } from "../_/compute";
import initMagnifier from "../_/magnifier";

@Component( {
    "selector": `TwicImg`,
    "template": `
        <TwicMedia
            [alt]="alt"
            [anchor]="anchor"
            [bot]="bot"
            [focus]="focus"
            [intrinsic]="intrinsic"
            [mode]="mode"
            [mediaTag]="mediaTag"
            [eager]="eager"
            [placeholder]="placeholder"
            [position]="position"
            [preTransform]="preTransform"
            [ratio]="ratio"
            [src]="src"
            [step]="step"
            [title]="title"
            [transition]="transition"
            [transitionDelay]="transitionDelay"
            [transitionDuration]="transitionDuration"
            [transitionTimingFunction]="transitionTimingFunction"
            (stateChangeEvent)="onStateChange($event)"
        ></TwicMedia>
        <TwicMedia
            *ngIf="_zoom"
            [anchor]="anchor"
            [bot]="bot"
            className="twic-m"
            [focus]="focus"
            [intrinsic]="intrinsic"
            mode="cover"
            [eager]="eager"
            mediaTag="div"
            [placeholder]="placeholder"
            [position]="position"
            [preTransform]="preTransform"
            [ratio]="ratio"
            [src]="src"
            [step]="step"
            [title]="title"
            [transition]="transition"
            [transitionDelay]="transitionDelay"
            [transitionDuration]="transitionDuration"
            [transitionTimingFunction]="transitionTimingFunction"
            [ngStyle]="magnifierStyle"
        ></TwicMedia>
    `,
    "changeDetection": ChangeDetectionStrategy.OnPush,
    "encapsulation": ViewEncapsulation.None,
    "host": {
        "class": `twic-i twic-d`,
    },
} )
export class TwicImgComponent implements AfterViewInit, OnChanges {
    // eslint-disable-next-line no-useless-constructor
    mediaTag = `img`;
    @Input() alt: string = undefined;
    @Input() anchor: Anchor = undefined;
    @Input() bot: string = undefined;
    @Input() focus: string = undefined;
    @Input() intrinsic: string = undefined;
    @Input() mode: Mode = undefined;
    @Input() eager: boolean | string;
    @Input() placeholder: Placeholder = undefined;
    @Input() position: string = undefined;
    @Input() preTransform: string = undefined;
    @Input() ratio: number | string = undefined;
    @Input() src: string;
    @Input() step: number = undefined;
    @Input() title: string = undefined;
    @Input() transition:boolean | string;
    @Input() transitionDelay: string = undefined;
    @Input() transitionDuration: string = undefined;
    @Input() transitionTimingFunction: string = undefined;
    @Input() zoom: number | string = undefined;
    @Output() stateChangeEvent = new EventEmitter< StateEvent >();
    @HostBinding( `class.twic-z` ) get twicZoom() {
        return this._zoom;
    }
    _zoom: boolean | number = false;
    magnifierStyle: Record<string, string>;
    constructor( private renderer: Renderer2, private hostElement: ElementRef ) {}
    ngAfterViewInit(): void {
        if ( this._zoom ) {
            initMagnifier( this.hostElement.nativeElement.lastElementChild );
        }
        this.updateTemplate();
    }
    onStateChange( stateEvent: StateEvent ) {
        this.stateChangeEvent.emit( stateEvent );
    }
    ngOnChanges( ): void {
        this._zoom = parseZoom( this.zoom );
        this.magnifierStyle = computeMagnifierStyle( this._zoom );
        this.updateTemplate();
    }
    updateTemplate(): void {
        if ( this.hostElement?.nativeElement ) {
            Object.entries( this.magnifierStyle || [] ).forEach( ( [ n, v ] ) => {
                if ( n === undefined ) {
                    this.renderer.removeStyle( this.hostElement.nativeElement, n );
                } else {
                    this.hostElement.nativeElement.style.setProperty( n, v );
                }
            } );
        }
    }
}
