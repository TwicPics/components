import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
} from "@angular/core";
// eslint-disable-next-line no-duplicate-imports
import type { OnChanges } from "@angular/core";
import { parseDuration, parseFrom, parseTo } from "../_/parse";
import { preComputeVideoOptions } from "../_/preCompute";
import type { Anchor, Mode, Placeholder, StateEvent, VideoOptions } from "../_/types";

@Component( {
    "selector": `TwicVideo`,
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
    @Input() duration: number | string = undefined;
    @Input() focus: string = undefined;
    @Input() from: number | string = undefined;
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
    @Input() title: string = undefined;
    @Input() to: number | string = undefined;
    @Input() transition:boolean | string;
    @Input() transitionDelay: string = undefined;
    @Input() transitionDuration: string = undefined;
    @Input() transitionTimingFunction: string = undefined;
    @Output() stateChangeEvent = new EventEmitter< StateEvent >();
    _duration: number;
    _from: number;
    _posterFrom: number;
    _to: number;
    videoOption: VideoOptions;
    ngOnChanges( ): void {
        this._duration = parseDuration( this.duration );
        this._from = parseFrom( this.from );
        this._posterFrom = parseDuration( this.posterFrom );
        this._to = parseTo( this.to );
        this.videoOption = preComputeVideoOptions( this._duration, this._from, this._posterFrom, this._to );
    }
    onStateChange( stateEvent: StateEvent ) {
        this.stateChangeEvent.emit( stateEvent );
    }
}
