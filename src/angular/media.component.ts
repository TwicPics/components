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
    OnChanges,
    OnDestroy,
    OnInit,
} from "@angular/core";

import type { Anchor, AnchorObject, Mode, Placeholder, StateEvent, State } from "../_/types";

import {
    computeAlt,
    computeData,
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
    parseFocus,
    parseIntrinsic,
    parseMediaTag,
    parseMode,
    parseEager,
    parsePlaceholder,
    parsePosition,
    parsePreTransform,
    parseRatio,
    parseSrc,
    parseStep,
    parseTransition,
    parseTransitionDelay,
    parseTransitionDuration,
    parseTransitionTimingFunction,
} from "../_/parse";

@Component( {
    "selector": `TwicMedia`,
    "template": `
        <div #container [ngClass]="wrapperClass" [ngStyle]="wrapperStyle">
            <div #placeholderElement [ngStyle]="placeholderStyle"></div>
        </div>
    `,
    "styleUrls": [ `../_/style.css` ],
    "changeDetection": ChangeDetectionStrategy.OnPush,
    "encapsulation": ViewEncapsulation.None,
} )
export class TwicMediaComponent implements OnInit, OnDestroy, OnChanges {
    @Input() alt: string = undefined;
    @Input() anchor: Anchor = undefined;
    @Input() bot: string = undefined;
    @Input() focus: string = undefined;
    @Input() intrinsic: string = undefined;
    @Input() mode: Mode = undefined;
    @Input() mediaTag: string = undefined;
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
    @Output() stateChangeEvent = new EventEmitter< StateEvent >();
    @ViewChild( `container`, {
        "static": true,
    } ) containerRef!: ElementRef;
    @ViewChild( `placeholderElement`, {
        "static": true,
    } ) placeholderRef!: ElementRef;
    _alt: string = undefined;
    _anchor: AnchorObject = undefined;
    _bot: string = undefined;
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
    _src: string;
    _step: number = undefined;
    _transition:Record< string, boolean >;
    _transitionDelay: string = undefined;
    _transitionDuration: string = undefined;
    _transitionTimingFunct: string = undefined;
    description: string;
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
    ngOnInit(): void {
        this._media = this.renderer.createElement( this._mediaTag );
        this.renderer.insertBefore(
            this.containerRef.nativeElement,
            this._media,
            this.placeholderRef.nativeElement
        );
        this.observer.setMedia( this._media );
        this.updateMedia();
    }
    ngOnChanges( ): void {
        this._alt = parseAlt( this.alt );
        this._anchor = parseAnchor( this.anchor );
        this._bot = parseBot( this.bot );
        this._focus = parseFocus( this.focus );
        this._intrinsic = parseIntrinsic( this.intrinsic );
        this._mediaTag = parseMediaTag( this.mediaTag ) || `img`;
        this._mode = parseMode( this.mode );
        this._eager = parseEager( this.eager );
        this._placeholder = parsePlaceholder( this.placeholder );
        this._position = parsePosition( this.position );
        this._preTransform = parsePreTransform( this.preTransform );
        this._ratio = parseRatio( this.ratio );
        this._src = parseSrc( this.src );
        this._step = parseStep( this.step );
        this._transition = parseTransition( this.transition );
        this._transitionDelay = parseTransitionDelay( this.transitionDelay );
        this._transitionDuration = parseTransitionDuration( this.transitionDuration );
        this._transitionTimingFunct = parseTransitionTimingFunction( this.transitionTimingFunction );
        this.description = computeAlt( this._alt, this._src );
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
                this._src,
                this._step
            ),
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
            this._placeholder,
            this._position,
            this._preTransform,
            this._ratio,
            this._src,
            this._transition,
            this._transitionDelay,
            this._transitionDuration,
            this._transitionTimingFunct,
            this.observer.setPlaceholderData
        );
        this.wrapperClass = computeWrapperClass( this.src, this._transition );
        this.wrapperStyle = computeWrapperStyle( this._ratio );
        this.updateMedia();
    }
    ngOnDestroy(): void {
        this.observer.destroy();
    }
    private updateMedia(): void {
        if ( this._media ) {
            if ( this._mediaTag === `img` ) {
                // eslint-disable-next-line dot-notation
                this.mediaAttributes[ `alt` ] = this.description;
            }
            Object.entries( this.mediaAttributes || [] ).forEach( ( [ n, v ] ) => {
                if ( v === undefined ) {
                    this.renderer.removeAttribute( this._media, n );
                } else {
                    this.renderer.setAttribute(
                        this._media,
                        n,
                        v
                    );
                }
            } );
            Object.entries( this.mediaStyle || [] ).forEach( ( [ n, v ] ) => {
                if ( n === undefined ) {
                    this.renderer.removeStyle( this._media, n );
                } else {
                    this.renderer.setStyle(
                        this._media,
                        n,
                        v
                    );
                }
            } );
        }
    }
}
