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
import { parseRole, parseZoom } from "../_/parse";
import type { Anchor, CrossOrigin, Decoding, Mode, Placeholder, ReferrerPolicy, StateEvent } from "../_/types";
import { computeMagnifierStyle } from "../_/compute";
import initMagnifier from "../_/magnifier";
import { styles } from "./utils";

@Component( {
    "selector": `TwicImg`,
    "template": `
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
            [refit]="refit"
            [src]="src"
            [step]="step"
            [title]="title"
            [transition]="transition"
            [transitionDelay]="transitionDelay"
            [transitionDuration]="transitionDuration"
            [transitionTimingFunction]="transitionTimingFunction"
            [ngStyle]="magnifierStyle"
        ></TwicMedia>
        <TwicMedia
            [alt]="alt"
            [anchor]="anchor"
            [bot]="bot"
            [crossorigin]="crossorigin"
            [decoding]="decoding"
            [focus]="focus"
            [intrinsic]="intrinsic"
            [mode]="mode"
            [mediaTag]="mediaTag"
            [eager]="eager"
            [placeholder]="placeholder"
            [position]="position"
            [preTransform]="preTransform"
            [ratio]="ratio"
            [referrerpolicy]="referrerpolicy"
            [refit]="refit"
            [src]="src"
            [step]="step"
            [title]="title"
            [transition]="transition"
            [transitionDelay]="transitionDelay"
            [transitionDuration]="transitionDuration"
            [transitionTimingFunction]="transitionTimingFunction"
            (stateChangeEvent)="onStateChange($event)"
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
    @Input() crossorigin: CrossOrigin = undefined;
    @Input() decoding: Decoding = undefined;
    @Input() focus: string = undefined;
    @Input() intrinsic: string = undefined;
    @Input() mode: Mode = undefined;
    @Input() eager: boolean | string;
    @Input() placeholder: Placeholder = undefined;
    @Input() position: string = undefined;
    @Input() preTransform: string = undefined;
    @Input() ratio: number | string = undefined;
    @Input() referrerpolicy: ReferrerPolicy = undefined;
    @Input() refit: boolean | string;
    @Input() role: string = `img`;
    @Input() src: string;
    @Input() step: number | string = undefined;
    @Input() title: string = undefined;
    @Input() transition:boolean | string;
    @Input() transitionDelay: string = undefined;
    @Input() transitionDuration: string = undefined;
    @Input() transitionTimingFunction: string = undefined;
    @Input() zoom: number | string = undefined;
    @Output() stateChangeEvent = new EventEmitter< StateEvent >();
    @HostBinding( `attr.role` ) get twicRole() {
        return this._role;
    }
    @HostBinding( `class.twic-z` ) get twicZoom() {
        return this._zoom;
    }
    _role: string;
    _zoom: boolean | number = false;
    magnifierStyle: Record<string, string>;
    constructor( private renderer: Renderer2, private hostElement: ElementRef ) {}
    ngAfterViewInit(): void {
        if ( this._zoom ) {
            initMagnifier( this.hostElement.nativeElement.firstElementChild );
        }
        this.updateTemplate();
    }
    onStateChange( stateEvent: StateEvent ) {
        this.stateChangeEvent.emit( stateEvent );
    }
    ngOnChanges( ): void {
        this._role = parseRole( this.role );
        this._zoom = parseZoom( this.zoom );
        this.magnifierStyle = computeMagnifierStyle( this._zoom );
        this.updateTemplate();
    }
    updateTemplate(): void {
        if ( this.hostElement?.nativeElement ) {
            // updates style to this.hostElement.nativeElement HTML element
            styles( this.magnifierStyle, this.hostElement.nativeElement, this.renderer );
        }
    }
}
