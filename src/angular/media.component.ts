/* eslint-disable max-lines */
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    Renderer2,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";

// eslint-disable-next-line no-duplicate-imports
import type {
    AfterViewInit,
    OnChanges,
    OnDestroy,
} from "@angular/core";

import type { Anchor, AnchorObject, Mode, Placeholder, StateEvent, State, VideoOptions, CrossOrigin } from "../_/types";

import {
    computeData,
    computeMediaAttributes,
    computePlaceholderStyle,
    computeStyle,
    computeWrapperClass,
    computeWrapperStyle,
} from "../_/compute";

import { Observer } from "../_/Observer";

import {
    parseAlt,
    parseAnchor,
    parseBot,
    parseClassName,
    parseFocus,
    parseIntrinsic,
    parseMediaTag,
    parseMode,
    parseEager,
    parsePlaceholder,
    parsePosition,
    parsePreTransform,
    parseRatio,
    parseRefit,
    parseSrc,
    parseStep,
    parseTransition,
    parseTransitionDelay,
    parseTransitionDuration,
    parseTransitionTimingFunction,
    parseTitle,
    parseCrossOrigin,
} from "../_/parse";
import { preComputePlaceholder } from "../_/preCompute";
import { attributes, styles } from "./utils";

@Component( {
    "selector": `TwicMedia`,
    "template": `
        <div
            #container
            [ngClass]="wrapperClass"
            [ngStyle]="wrapperStyle"
            [attr.title]="_title"
        >
            <div
                *ngIf="_placeholder_"
                #placeholderElement
                [ngStyle]="placeholderStyle"
            ></div>
        </div>
    `,
    "styleUrls": [ `../_/style.css` ],
    "changeDetection": ChangeDetectionStrategy.OnPush,
    "encapsulation": ViewEncapsulation.None,
    "host": {
        "ngSkipHydration": `true`,
    },
} )
export class TwicMediaComponent implements AfterViewInit, OnDestroy, OnChanges {
    @Input() alt: string = undefined;
    @Input() anchor: Anchor = undefined;
    @Input() bot: string = undefined;
    @Input() className: string = undefined;
    @Input() crossorigin: string = undefined;
    @Input() focus: string = undefined;
    @Input() intrinsic: string = undefined;
    @Input() mode: Mode = undefined;
    @Input() mediaTag: string = undefined;
    @Input() eager: boolean | string;
    @Input() placeholder: Placeholder = undefined;
    @Input() position: string = undefined;
    @Input() preTransform: string = undefined;
    @Input() ratio: number | string = undefined;
    @Input() refit: boolean | string;
    @Input() src: string;
    @Input() step: number | string = undefined;
    @Input() title: string = undefined;
    @Input() transition: boolean | string;
    @Input() transitionDelay: string = undefined;
    @Input() transitionDuration: string = undefined;
    @Input() transitionTimingFunction: string = undefined;
    @Input() videoOptions: VideoOptions = undefined;
    @Output() stateChangeEvent = new EventEmitter< StateEvent >();
    @ViewChild( `container`, {
        "static": true,
    } ) containerRef!: ElementRef;
    @ViewChild( `placeholderElement`, {
        "static": false,
    } ) placeholderRef!: ElementRef;
    _alt: string = undefined;
    _anchor: AnchorObject = undefined;
    _bot: string = undefined;
    _className: string = undefined;
    _crossorigin: CrossOrigin = undefined;
    _eager: boolean;
    _focus: string = undefined;
    _intrinsic: string = undefined;
    _media: HTMLElement;
    _mediaTag: string = undefined;
    _mode: Mode = undefined;
    _placeholder: Placeholder = undefined;
    _position: string = undefined;
    _preTransform: string = undefined;
    _ratio: number = undefined;
    _refit: string = undefined;
    _src: string;
    _step: number = undefined;
    _title: string = undefined;
    _transition:Record< string, boolean >;
    _transitionDelay: string = undefined;
    _transitionDuration: string = undefined;
    _transitionTimingFunct: string = undefined;
    _placeholder_: Placeholder = undefined;
    mediaAttributes: Record<string, string>;
    mediaStyle: Record<string, string>;
    observer: Observer;
    placeholderStyle: Record<string, string>;
    wrapperClass: string;
    wrapperStyle: Record<string, string>;
    constructor( private renderer: Renderer2 ) {
        this.observer = new Observer( ( state: State ) => {
            this.stateChangeEvent.emit( {
                "target": this,
                state,
            } );
        } );
    }
    ngAfterViewInit(): void {
        this._media = this.renderer.createElement( this._mediaTag );
        if ( this._placeholder_ ) {
            this.renderer.insertBefore(
                this.containerRef.nativeElement,
                this._media,
                this.placeholderRef.nativeElement
            );
        } else {
            this.renderer.appendChild( this.containerRef.nativeElement, this._media );
        }
        this.observer.setMedia( this._media );
        this.updateMedia();
    }
    ngOnChanges(): void {
        this._alt = parseAlt( this.alt );
        this._anchor = parseAnchor( this.anchor );
        this._bot = parseBot( this.bot );
        this._className = parseClassName( this.className );
        this._crossorigin = parseCrossOrigin( this.crossorigin );
        this._focus = parseFocus( this.focus );
        this._intrinsic = parseIntrinsic( this.intrinsic );
        this._mediaTag = parseMediaTag( this.mediaTag ) || `img`;
        this._mode = parseMode( this.mode );
        this._eager = parseEager( this.eager );
        this._placeholder = parsePlaceholder( this.placeholder );
        this._position = parsePosition( this.position );
        this._preTransform = parsePreTransform( this.preTransform );
        this._ratio = parseRatio( this.ratio );
        this._refit = parseRefit( this.refit );
        this._src = parseSrc( this.src );
        this._step = parseStep( this.step );
        this._title = parseTitle( this.title );
        this._transition = parseTransition( this.transition );
        this._transitionDelay = parseTransitionDelay( this.transitionDelay );
        this._transitionDuration = parseTransitionDuration( this.transitionDuration );
        this._transitionTimingFunct = parseTransitionTimingFunction( this.transitionTimingFunction );
        this._placeholder_ = preComputePlaceholder( this._placeholder, this._src );
        this.mediaAttributes = {
            ...computeData(
                this._anchor,
                this._bot,
                this._eager,
                this._focus,
                this._intrinsic,
                this._mediaTag,
                this._mode,
                this._preTransform,
                this._refit,
                this._src,
                this._step,
                this.videoOptions
            ),
            ...computeMediaAttributes( {
                "alt": this._alt,
                "crossorigin": this._crossorigin,
                "mediaTag": this._mediaTag,
            } ),
        };
        this.mediaStyle = computeStyle(
            this._anchor,
            this._mediaTag,
            this._mode,
            this._position,
            this._transitionDelay,
            this._transitionDuration,
            this._transitionTimingFunct
        );
        this.placeholderStyle = computePlaceholderStyle(
            this._anchor,
            this._focus,
            this._mode,
            this._placeholder_,
            this._position,
            this._preTransform,
            this._ratio,
            this._refit,
            this._src,
            this._transition,
            this._transitionDelay,
            this._transitionDuration,
            this._transitionTimingFunct,
            this.videoOptions,
            this.observer.setPlaceholderData
        );
        this.wrapperClass = computeWrapperClass( this._className, this.src, this._transition );
        this.wrapperStyle = computeWrapperStyle( this._ratio );
        this.updateMedia();
    }
    ngOnDestroy(): void {
        this.observer.destroy();
    }
    private updateMedia(): void {
        attributes( this.mediaAttributes, this._media, this.renderer );
        styles( this.mediaStyle, this._media, this.renderer );
    }
}
