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
import { parseDraggable, parseId, parseZoom } from "../_/parse";
import type { Anchor, Mode, Placeholder, StateEvent } from "../_/types";
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
            [focus]="focus"
            [intrinsic]="intrinsic"
            [mode]="mode"
            [mediaTag]="mediaTag"
            [eager]="eager"
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
    @Input() draggable: boolean | string;
    @Input() focus: string = undefined;
    @Input() id: string = undefined;
    @Input() intrinsic: string = undefined;
    @Input() mode: Mode = undefined;
    @Input() eager: boolean | string;
    @Input() placeholder: Placeholder = undefined;
    @Input() position: string = undefined;
    @Input() preTransform: string = undefined;
    @Input() ratio: number | string = undefined;
    @Input() refit: boolean | string;
    @Input() src: string;
    @Input() step: number | string = undefined;
    @Input() title: string = undefined;
    @Input() transition:boolean | string;
    @Input() transitionDelay: string = undefined;
    @Input() transitionDuration: string = undefined;
    @Input() transitionTimingFunction: string = undefined;
    @Input() zoom: number | string = undefined;
    @Output() stateChangeEvent = new EventEmitter< StateEvent >();
    @HostBinding( `attr.draggable` ) get twicDraggable() {
        return this._draggable;
    }
    @HostBinding( `attr.id` ) get twicId() {
        return this._id;
    }
    @HostBinding( `class.twic-z` ) get twicZoom() {
        return this._zoom;
    }
    _draggable: boolean | undefined = undefined;
    _id: string | undefined = undefined;
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
        this._draggable = parseDraggable( this.draggable );
        this._id = parseId( this.id );
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
