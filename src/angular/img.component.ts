import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
// eslint-disable-next-line no-duplicate-imports
import type { AfterViewInit, OnChanges } from "@angular/core";
import { parseZoom } from "../_/parse";
import type { Anchor, Mode, Placeholder, StateEvent } from "../_/types";
import { computeMagnifierStyle } from "../_/compute";
import magnifier from "../_/magnifier";

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
            [transition]="transition"
            [transitionDelay]="transitionDelay"
            [transitionDuration]="transitionDuration"
            [transitionTimingFunction]="transitionTimingFunction"
            (stateChangeEvent)="onStateChange($event)"
        ></TwicMedia>
        <div *ngIf="_zoom" #magnifierContainer class="twic-m"  [ngStyle]="magnifiedStyle">
            <TwicMedia
                [anchor]="anchor"
                [bot]="bot"
                [focus]="focus"
                [intrinsic]="intrinsic"
                [mode]="mode"
                [eager]="eager"
                mediaTag="div"
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
            ></TwicMedia>
        </div>
    `,
    "changeDetection": ChangeDetectionStrategy.OnPush,
    "encapsulation": ViewEncapsulation.None,
    "host": {
        "class": `twic-i twic-d`,
    },
} )
export class TwicImgComponent implements AfterViewInit, OnChanges {
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
    magnifiedStyle: Record<string, string>;
    @ViewChild( `magnifierContainer`, {
        "static": false,
    } ) magnifierContainer: ElementRef< HTMLDivElement >;
    ngAfterViewInit(): void {
        if ( this.magnifierContainer?.nativeElement ) {
            magnifier( this.magnifierContainer.nativeElement );
        }
    }
    onStateChange( stateEvent: StateEvent ) {
        this.stateChangeEvent.emit( stateEvent );
    }
    ngOnChanges( ): void {
        this._zoom = parseZoom( this.zoom );
        this.magnifiedStyle = computeMagnifierStyle( this._zoom );
    }
}
