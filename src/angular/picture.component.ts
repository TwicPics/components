/* eslint-disable max-lines */
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    Renderer2,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";

// eslint-disable-next-line no-duplicate-imports
import type {
    AfterViewInit,
    OnChanges,
} from "@angular/core";

import type {
    Anchor,
    AnchorObject,
    CrossOrigin,
    Decoding,
    FetchPriority,
    Mode,
    Picture,
    ReferrerPolicy,
} from "../_/types";

import {
    computeMediaAttributes,
    computePicture,
} from "../_/compute";

import {
    parseAlt,
    parseAnchors,
    parseEager,
    parseFocuses,
    parseModes,
    parsePositions,
    parsePreTransforms,
    parseRatios,
    parseRefit,
    parseRole,
    parseSizes,
    parseSrc,
    parseTitle,
} from "../_/parse";
import { attributes } from "./utils";

@Component( {
    "selector": `TwicPicture`,
    "template": `
      <picture
          #container
          class="twic-p"
          [attr.title]="_title"
      >
        <img #image/>
      </picture>
  `,
    "styleUrls": [ `../_/style.css` ],
    "changeDetection": ChangeDetectionStrategy.OnPush,
    "encapsulation": ViewEncapsulation.None,
    "host": {
        "ngSkipHydration": `true`,
    },
} )
export class TwicPictureComponent implements AfterViewInit, OnChanges {
    @Input() alt: string = undefined;
    @Input() anchor: Anchor = undefined;
    @Input() crossorigin: CrossOrigin = undefined;
    @Input() decoding: Decoding = undefined;
    @Input() eager: boolean | string;
    @Input() fetchpriority: string = undefined;
    @Input() focus: string = undefined;
    @Input() mode: string = undefined;
    @Input() position: string = undefined;
    @Input() preTransform: string = undefined;
    @Input() ratio: number | string = undefined;
    @Input() referrerpolicy: ReferrerPolicy = undefined;
    @Input() refit: boolean | string;
    @Input() role: string = `img`;
    @Input() sizes: string;
    @Input() src: string;
    @Input() title: string = undefined;
    @HostBinding( `attr.role` ) get twicRole() {
        return this._role;
    }
    @ViewChild( `container`, {
        "static": true,
    } ) containerRef!: ElementRef;
    @ViewChild( `image`, {
        "static": true,
    } ) imageRef!: ElementRef;
    _alt: string = undefined;
    _anchors: Record< number, AnchorObject > = undefined;
    _eager: boolean;
    _fetchpriority: FetchPriority = undefined;
    _focuses: Record< number, string > = undefined;
    _modes: Record< number, Mode > = undefined;
    _positions: Record< number, string > = undefined;
    _preTransforms: Record< number, string > = undefined;
    _ratios: Record< number, number > = undefined;
    _refit: string = undefined;
    _role: string;
    _sizes: Record< number, string > = undefined;
    _sources: HTMLElement[] = [];
    _src: string;
    _title: string = undefined;
    pictureData: Picture;
    // eslint-disable-next-line no-useless-constructor
    constructor(
        private renderer: Renderer2
    ) { }
    ngAfterViewInit(): void {
        if ( this.pictureData?.sources ) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
            this._sources = this.pictureData.sources.map( _ => {
                const _source = this.renderer.createElement( `source` );
                this.renderer.insertBefore(
                    this.containerRef.nativeElement,
                    _source,
                    this.imageRef.nativeElement
                );
                return _source;
            } );
        }
        this.updateMedia();
    }
    ngOnChanges(): void {
        this._alt = parseAlt( this.alt );
        this._anchors = parseAnchors( this.anchor );
        this._focuses = parseFocuses( this.focus );
        this._modes = parseModes( this.mode );
        this._eager = parseEager( this.eager );
        this._positions = parsePositions( this.position );
        this._preTransforms = parsePreTransforms( this.preTransform );
        this._ratios = parseRatios( this.ratio );
        this._refit = parseRefit( this.refit );
        this._role = parseRole( this.role );
        this._sizes = parseSizes( this.sizes );
        this._src = parseSrc( this.src );
        this._title = parseTitle( this.title );
        this.pictureData = {
            ...computePicture(
                this._anchors,
                this._eager,
                this._fetchpriority,
                this._focuses,
                this._modes,
                this._positions,
                this._preTransforms,
                this._ratios,
                this._refit,
                this._sizes,
                this._src
            ),
        };
        this.updateMedia();
    }
    private updateMedia(): void {
        if ( this.imageRef.nativeElement ) {
            const imgAttributes = {
                ...this.pictureData?.img,
                ...computeMediaAttributes(
                    this._alt,
                    this.crossorigin,
                    this.decoding,
                    `img`,
                    this.referrerpolicy
                ),
            };
            // updates attributes to this.imageRef.nativeElement HTML element
            attributes( imgAttributes, this.imageRef.nativeElement, this.renderer );
        }
        for ( const index in this._sources ) {
            const actualSourceElement = this._sources[ index ];
            // updates attributes to actualSourceElement HTML element
            attributes( this.pictureData?.sources[ index ], actualSourceElement, this.renderer );
        }
    }
}
