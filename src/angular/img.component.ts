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
import { parseDraggable, parseId, parseStyle, parseTabIndex, parseZoom } from "../_/parse";
import type { Anchor, CrossOrigin, Decoding, Mode, Placeholder, StateEvent } from "../_/types";
import { computeHostStyle } from "../_/compute";
import initMagnifier from "../_/magnifier";
import { updateHostElement } from "./utils";

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
            [ngStyle]="magnifiedStyle"
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
    @Input() style: string | Record< string, unknown > = undefined;
    @Input() title: string = undefined;
    @Input() tabindex: number | string = undefined;
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
    @HostBinding( `attr.tabindex` ) get twicTabIndex() {
        return this._tabindex;
    }
    @HostBinding( `class.twic-z` ) get twicZoom() {
        return this._zoom;
    }
    _draggable: boolean | undefined = undefined;
    _id: string | undefined = undefined;
    _tabindex: string | undefined = undefined;
    _zoom: boolean | number = false;
    magnifiedStyle: Record<string, unknown> = undefined;
    constructor( private renderer: Renderer2, private hostElement: ElementRef ) {}
    ngAfterViewInit(): void {
        if ( this._zoom ) {
            initMagnifier( this.hostElement.nativeElement.firstElementChild );
        }
    }
    ngOnChanges( ): void {
        this._draggable = parseDraggable( this.draggable );
        this._id = parseId( this.id );
        this._tabindex = parseTabIndex( this.tabindex );
        this._zoom = parseZoom( this.zoom );
        this.magnifiedStyle = computeHostStyle( {
            "zoom": this._zoom,
        } );
        updateHostElement(
            computeHostStyle( {
                "style": parseStyle( this.style ),
            } ),
            this.hostElement,
            this.renderer
        );
    }
    onStateChange( stateEvent: StateEvent ) {
        this.stateChangeEvent.emit( stateEvent );
    }
}
