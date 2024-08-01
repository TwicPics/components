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
import type { OnChanges } from "@angular/core";
import { parseDraggable, parseDuration, parseFrom, parseId, parseStyle, parseTabIndex, parseTo } from "../_/parse";
import { preComputeVideoOptions } from "../_/preCompute";
import type { Anchor, Mode, Placeholder, StateEvent, VideoOptions } from "../_/types";
import { computeHostStyle } from "../_/compute";
import { updateHostElement } from "./utils";

@Component( {
    "selector": `TwicVideo`,
    "template": `
        <TwicMedia
            [anchor]="anchor"
            [bot]="bot"
            [crossorigin]="crossorigin"
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
            [videoOptions]="videoOption"
            (stateChangeEvent)="onStateChange($event)"
        ></TwicMedia>
    `,
    "changeDetection": ChangeDetectionStrategy.OnPush,
    "encapsulation": ViewEncapsulation.None,
    "host": {
        "class": `twic-i twic-d`,
    },
} )
export class TwicVideoComponent implements OnChanges {
    mediaTag = `video`;
    @Input() anchor: Anchor = undefined;
    @Input() bot: string = undefined;
    @Input() crossorigin: string = undefined;
    @Input() draggable: boolean | string;
    @Input() duration: number | string = undefined;
    @Input() focus: string = undefined;
    @Input() from: number | string = undefined;
    @Input() id: string = undefined;
    @Input() intrinsic: string = undefined;
    @Input() mode: Mode = undefined;
    @Input() eager: boolean | string;
    @Input() placeholder: Placeholder = undefined;
    @Input() position: string = undefined;
    @Input() posterFrom: number | string = undefined;
    @Input() preTransform: string = undefined;
    @Input() ratio: number | string = undefined;
    @Input() src: string;
    @Input() step: number | string = undefined;
    @Input() style: string | Record< string, unknown > = undefined;
    @Input() tabindex: number | string = undefined;
    @Input() title: string = undefined;
    @Input() to: number | string = undefined;
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
    _duration: number;
    _from: number;
    _id: string | undefined = undefined;
    _posterFrom: number;
    _tabindex: string | undefined = undefined;
    _to: number;
    videoOption: VideoOptions;
    // eslint-disable-next-line no-useless-constructor
    constructor( private renderer: Renderer2, private hostElement: ElementRef ) {}
    ngOnChanges( ): void {
        this._draggable = parseDraggable( this.draggable );
        this._duration = parseDuration( this.duration );
        this._from = parseFrom( this.from );
        this._id = parseId( this.id );
        this._posterFrom = parseDuration( this.posterFrom );
        this._tabindex = parseTabIndex( this.tabindex );
        this._to = parseTo( this.to );
        this.videoOption = preComputeVideoOptions( this._duration, this._from, this._posterFrom, this._to );
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
