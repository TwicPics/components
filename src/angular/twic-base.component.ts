/**
 * base component
 * Used in twic-img and twic-video
 */
import {
    Component,
    ElementRef,
    HostBinding,
    Input,
    ViewChild,
} from "@angular/core";

// eslint-disable-next-line no-duplicate-imports
import type {
    OnChanges,
    OnDestroy,
    OnInit,
} from "@angular/core";

import type { Anchor, AnchorObject, Mode, Placeholder, PlaceholderHandler } from "../_/types";

import {
    computeAlt,
    computeData,
    computePlaceholderStyle,
    computeStyle,
    computeWrapperClass,
    computeWrapperStyle,
} from "../_/compute";

import { createPlaceholderHandler } from "../_/placeholder";

import {
    parseAlt,
    parseAnchor,
    parseBot,
    parseFocus,
    parseMode,
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
    "selector": `lib-twic-base`,
    "template": `<p>To implement in child class</p>`,
} )
export class TwicBaseComponent implements OnInit, OnDestroy, OnChanges {

    @HostBinding( `class.twic-i` ) initTwicIsolation = true;
    @HostBinding( `class.twic-d` ) initTwicDiv = true;
    @Input() alt: string = undefined;
    @Input() anchor: Anchor = undefined;
    @Input() bot: string = undefined;
    @Input() class: string = undefined;
    @Input() focus: string = undefined;
    @Input() mode: Mode = undefined;
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
    _alt: string = undefined;
    _anchor: AnchorObject = undefined;
    _bot: string = undefined;
    _focus: string = undefined;
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
    /**
     * to access to the div generated by render method
     * <div #placeholder>...</div>
     * static set to true because we want access on ngOnInit
     */
    @ViewChild( `placeholder`, {
        "static": true,
    } ) placeholderElementRef!: ElementRef;
    /**
     * placsholder management object
     */
    _p: PlaceholderHandler;
    description: string;
    elementAttributs: Record<string, string>;
    elementStyle: Record<string, string>;
    placeholderStyle: Record<string, string>;
    wrapperClass: string;
    wrapperStyle: Record<string, string>;
    constructor() {
        this._p = createPlaceholderHandler();
    }
    ngOnInit(): void {
        this._p.setPlaceholderElement(
            this.placeholderElementRef ? this.placeholderElementRef.nativeElement : undefined
        );
        this.initTwicIsolation = true;
    }
    ngOnChanges( ): void {
        this._alt = parseAlt( this.alt );
        this._anchor = parseAnchor( this.anchor );
        this._bot = parseBot( this.bot );
        this._focus = parseFocus( this.focus );
        this._mode = parseMode( this.mode );
        this._placeholder = parsePlaceholder( this.placeholder, this.src );
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

        this.elementAttributs = {
            ...computeData(
                this._anchor,
                this._bot,
                this._focus,
                this._mode,
                this._preTransform,
                this._src,
                this._step
            ),
        };

        this.elementStyle = computeStyle(
            this._anchor,
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
            this._p.setData
        );

        this.wrapperClass = computeWrapperClass( this.src, this._transition );

        this.wrapperStyle = computeWrapperStyle( this._ratio );
    }
    ngOnDestroy(): void {
        this._p.delete();
    }
}
