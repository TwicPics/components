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
import type { Anchor, Mode, Placeholder, StateEvent } from "../_/types";
import { parseDraggable, parseId, parseStyle, parseTabIndex } from "../_/parse";
import { computeHostStyle } from "../_/compute";
import { updateHostElement } from "./utils";

@Component( {
    "selector": `TwicBackground`,
    "template": `
        <TwicMedia
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
export class TwicBackgroundComponent implements AfterViewInit, OnChanges {
    @Input() anchor: Anchor = undefined;
    @Input() bot: string = undefined;
    @Input() draggable: boolean | string;
    @Input() focus: string = undefined;
    @Input() id: string = undefined;
    @Input() intrinsic: string = undefined;
    @Input() mediaTag = `div`;
    @Input() mode: Mode = undefined;
    @Input() eager: boolean | string;
    @Input() placeholder: Placeholder = undefined;
    @Input() position: string = undefined;
    @Input() preTransform: string = undefined;
    @Input() ratio: number | string = undefined;
    @Input() src: string;
    @Input() step: number | string = undefined;
    @Input() style: string | Record< string, unknown > = undefined;
    @Input() tabindex: number | string = undefined;
    @Input() transition:boolean | string;
    @Input() transitionDelay: string = undefined;
    @Input() transitionDuration: string = undefined;
    @Input() transitionTimingFunction: string = undefined;
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
    _draggable: boolean | undefined = undefined;
    _id: string | undefined = undefined;
    _tabindex: string | undefined = undefined;
    _hostStyle: Record<string, unknown> = undefined;
    constructor( private renderer: Renderer2, private hostElement: ElementRef ) {}
    ngAfterViewInit(): void {
        updateHostElement( this.hostElement, this.renderer, this._hostStyle );
    }
    onStateChange( stateEvent: StateEvent ) {
        this.stateChangeEvent.emit( stateEvent );
    }
    ngOnChanges(): void {
        this._draggable = parseDraggable( this.draggable );
        this._id = parseId( this.id );
        this._hostStyle = computeHostStyle( {
            "style": parseStyle( this.style ),
        } );
        this._tabindex = parseTabIndex( this.tabindex );
        updateHostElement( this.hostElement, this.renderer, this._hostStyle );
    }
}
