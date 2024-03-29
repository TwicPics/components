/* eslint-disable lines-between-class-members */
/* eslint-disable class-methods-use-this */
import { computePlaceholderBackground } from "./compute";
import { config } from "./config";
import type { PlaceholderData, State } from "./types";
import { isBrowser, debounce } from "./utils";

const debounceDelay = 100;
const elementToObserver = new WeakMap();

const mutationObserver: false | MutationObserver =
    isBrowser && ( typeof MutationObserver !== `undefined` ) &&
    new MutationObserver( ( records: Array< MutationRecord > ): void => {
        for ( const { target } of records ) {
            const observer = elementToObserver.get( target ) as unknown as Observer;
            if ( observer ) {
                observer.handleState();
            }
        }
    } );

const resizeObserver: false | ResizeObserver =
    isBrowser && ( typeof ResizeObserver !== `undefined` ) &&
    new ResizeObserver( ( records: Array< ResizeObserverEntry > ): void => {
        for ( const { target } of records ) {
            const observer = elementToObserver.get( target ) as unknown as Observer;
            if ( observer ) {
                observer.refreshBackground();
            }
        }
    } );

const rTwicClasses = new RegExp( `(?:\\s*)(?:${ config.class }(?:-background)*-)(done|error|loading)` );

export class Observer {

    private media: HTMLElement;
    private placeholderData: PlaceholderData;
    private savedWrapperBackground: string;
    private stateHandler: ( state: State ) => void;

    constructor( stateHandler: ( state: State ) => void = undefined ) {
        this.stateHandler = stateHandler;
    }

    public handleState = (): void => {
        if ( this.stateHandler ) {
            let state = `new`;
            const { className } = this.media;
            const tmp = rTwicClasses.exec( className );
            if ( tmp ) {
                ( [ , state ] = tmp );
            }
            this.stateHandler( state as State );
        }
    };

    public refreshBackground = debounce( () => {
        if ( this.media && this.placeholderData ) {
            const placeHolderElement = this.media.nextElementSibling as unknown as HTMLDivElement;
            const wrapperBackground = computePlaceholderBackground(
                placeHolderElement,
                this.placeholderData
            );
            if ( wrapperBackground && ( wrapperBackground !== this.savedWrapperBackground ) ) {
                this.savedWrapperBackground = wrapperBackground;
                // eslint-disable-next-line no-param-reassign
                placeHolderElement.style.backgroundImage = `url(${ JSON.stringify( wrapperBackground ) })`;
            }
        }
    }, {
        "ms": debounceDelay,
    } );
    public setMedia = ( media: HTMLElement ): void => {
        if ( media ) {
            config.handleShadowDom( media );
            this.media = media;
            elementToObserver.set( this.media, this );
            if ( mutationObserver ) {
                mutationObserver.observe( this.media, {
                    "attributes": true,
                    "attributeFilter": [ `class` ],
                } );
                this.handleState();
            }
            if ( resizeObserver ) {
                resizeObserver.observe( this.media );
            }
        }
    };
    public setPlaceholderData = ( data: PlaceholderData ): void => {
        this.placeholderData = data;
        if ( this.media ) {
            this.refreshBackground();
        }
    };
    public destroy = (): void => {
        if ( this.media ) {
            if ( this.media && resizeObserver ) {
                resizeObserver.unobserve( this.media );
            }
        }
    };
}
