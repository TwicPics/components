import { cssWithoutPx } from "./dom";
/* eslint-disable no-magic-numbers */
const ease = ( t: number ): number => {
    let n = 2 * t;
    if ( n < 1 ) {
        return 50 * ( n ** 3 );
    }
    n -= 2;
    return 50 * ( ( n ** 3 ) + 2 );
};
/* eslint-enable no-magic-numbers */
export class Magnifier {
    private container: HTMLDivElement;
    private zoom: number;
    private magnifiedContainer: HTMLDivElement;
    private readonly events:Record<string, any> = {
        "mouseenter": () => this.start(),
        "mousemove": ( e: MouseEvent ) => this.move( e ),
        "touchstart": () => this.start(),
        "touchmove": ( e: MouseEvent ) => this.move( e ),
    };
    constructor( magnifiedContainer: HTMLDivElement ) {
        this.magnifiedContainer = magnifiedContainer;
        this.container = magnifiedContainer.parentNode as unknown as HTMLDivElement;
        Object.entries( this.events ).forEach( ( [ key, value ] ) => {
            this.container.addEventListener( key, value );
        } );
    }
    public destroy(): void {
        if ( this.container ) {
            Object.entries( this.events ).forEach( ( [ key, value ] ) => {
                this.container.removeEventListener( key, value );
            } );
        }
    }
    private start(): void {
        const { width } = getComputedStyle( this.container );
        this.zoom = cssWithoutPx( getComputedStyle( this.magnifiedContainer ).width ) / cssWithoutPx( width );
    }
    private move( e: MouseEvent | TouchEvent ): void {
        // eslint-disable-next-line no-shadow
        const { left, top, right, bottom } = this.container.getBoundingClientRect();
        const width = right - left;
        const height = bottom - top;
        if ( width && height ) {
            const { clientX, clientY } = e instanceof MouseEvent ?
                e as unknown as MouseEvent :
                ( e as unknown as TouchEvent ).touches[ 0 ];
            this.magnifiedContainer.style.left = `${ ( 1 - this.zoom ) * ease( ( clientX - left ) / width ) }%`;
            this.magnifiedContainer.style.top = `${ ( 1 - this.zoom ) * ease( ( clientY - top ) / height ) }%`;
        }
    }
}
