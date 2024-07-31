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

import type { Anchor, AnchorObject, FetchPriority, Mode, Picture } from "../_/types";

import {
    computeHostStyle,
    computeMediaAttributes,
    computePicture,
} from "../_/compute";

import {
    parseAlt,
    parseAnchors,
    parseDraggable,
    parseEager,
    parseFocuses,
    parseId,
    parseModes,
    parsePositions,
    parsePreTransforms,
    parseRatios,
    parseRefit,
    parseSizes,
    parseSrc,
    parseStyle,
    parseTabIndex,
    parseTitle,
} from "../_/parse";
import { attributes, updateHostElement } from "./utils";

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
    @Input() draggable: boolean | string;
    @Input() eager: boolean | string;
    @Input() fetchpriority: string = undefined;
    @Input() focus: string = undefined;
    @Input() id: string = undefined;
    @Input() mode: string = undefined;
    @Input() position: string = undefined;
    @Input() preTransform: string = undefined;
    @Input() ratio: number | string = undefined;
    @Input() refit: boolean | string;
    @Input() sizes: string;
    @Input() src: string;
    @Input() style: string | Record< string, unknown > = undefined;
    @Input() tabindex: number | string = undefined;
    @Input() title: string = undefined;
    @HostBinding( `attr.draggable` ) get twicDraggable() {
        return this._draggable;
    }
    @HostBinding( `attr.id` ) get twicId() {
        return this._id;
    }
    @HostBinding( `attr.tabindex` ) get twicTabIndex() {
        return this._tabindex;
    }
    @ViewChild( `container`, {
        "static": true,
    } ) containerRef!: ElementRef;
    @ViewChild( `image`, {
        "static": true,
    } ) imageRef!: ElementRef;
    _alt: string = undefined;
    _anchors: Record< number, AnchorObject > = undefined;
    _draggable: boolean | undefined = undefined;
    _eager: boolean;
    _fetchpriority: FetchPriority = undefined;
    _focuses: Record< number, string > = undefined;
    _id: string | undefined = undefined;
    _modes: Record< number, Mode > = undefined;
    _positions: Record< number, string > = undefined;
    _preTransforms: Record< number, string > = undefined;
    _ratios: Record< number, number > = undefined;
    _refit: string = undefined;
    _sizes: Record< number, string > = undefined;
    _sources: HTMLElement[] = [];
    _src: string;
    _tabindex: string | undefined = undefined;
    _title: string = undefined;
    mediaAttributes: Record<string, string>;
    pictureData: Picture;
    // eslint-disable-next-line no-useless-constructor
    constructor( private renderer: Renderer2, private hostElement: ElementRef ) {}
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
        this._draggable = parseDraggable( this.draggable );
        this._focuses = parseFocuses( this.focus );
        this._id = parseId( this.id );
        this._modes = parseModes( this.mode );
        this._eager = parseEager( this.eager );
        this._positions = parsePositions( this.position );
        this._preTransforms = parsePreTransforms( this.preTransform );
        this._ratios = parseRatios( this.ratio );
        this._refit = parseRefit( this.refit );
        this._sizes = parseSizes( this.sizes );
        this._src = parseSrc( this.src );
        this._tabindex = parseTabIndex( this.tabindex );
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
        this.mediaAttributes = {
            ...this.pictureData?.img,
            ...computeMediaAttributes( {
                "alt": this._alt,
                "mediaTag": `img`,
            } ),
        };

        this.updateMedia();

        // updates host element (ie twicpicture)
        updateHostElement(
            computeHostStyle( {
                "style": parseStyle( this.style ),
            } ),
            this.hostElement,
            this.renderer
        );
    }
    private updateMedia(): void {
        // updates img tag
        attributes( this.mediaAttributes, this.imageRef.nativeElement, this.renderer );
        // updates each source tag
        for ( const [ index, actualSourceElement ] of this._sources.entries() ) {
            attributes( this.pictureData?.sources[ index ], actualSourceElement, this.renderer );
        }
    }
}
